import { AuthStatusResponse, LoginError, LoginRequest } from '../universal/api-interfaces';
import { authenticator } from 'otplib';
import { dbPromise, schema, drizzle } from '@ozy/db-schema';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';
import { v4 as uuid } from 'uuid';
import * as jsonwebtoken from 'jsonwebtoken';

const ENCRYPTION_ALGO = 'aes-256-cbc';
const EXPIRATION_DURATION_DAYS = 15;
const AUTH_KEY = process.env.OZY_AUTH_KEY!;
const PEPPER = process.env.OZY_PEPPER!;

type JWT = {
    sessionId: string;
    expiresAt: string;
}

type EncryptedObj = {
    encrypted: string;
    iv: string;
}

export async function encrypt(key: string, value: string): Promise<string> {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGO, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(value);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const result: EncryptedObj = {
        encrypted: encrypted.toString('hex'),
        iv: iv.toString('hex')
    }
    return JSON.stringify(result);
}

export async function decrypt(key: string, value: string): Promise<string> {
    const {iv, encrypted} = JSON.parse(value) as EncryptedObj;
    const ivBuffer = Buffer.from(iv, 'hex');
    const encryptedBuffer = Buffer.from(encrypted, 'hex');
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGO, Buffer.from(key, 'hex'), ivBuffer);
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

async function argon2It(value: string)  {
    const sha256 = await hash(value);
    const shaBuffer = Buffer.from(sha256, 'hex');
    return argon2.hash(value, {
        type: argon2.argon2d,
        memoryCost: 2 ** 16,
        hashLength: 50,
        salt: shaBuffer.subarray(shaBuffer.length - 16),
        secret: Buffer.from(PEPPER, 'hex')
    });
}

export async function hash(value: string, ...values: string[]): Promise<string> {
    let curHash = crypto.createHmac('sha256', value);
    for (const curVal of values) {
        curHash = curHash.update(curVal);
    }
    return curHash.digest('hex');
}

export function getUserKey(username: string) {
    return hash(username, AUTH_KEY);
}

export async function usernameExists(username: string): Promise<boolean> {
    const userEncryptionKey = await getUserKey(username);
    const hashedUsername = await argon2It(userEncryptionKey);
    const db = await dbPromise;
    const results = await db.select()
        .from(schema.users)
        .where(drizzle.eq(schema.users.username, hashedUsername))
        .execute();
    return results.length > 0;
}

// https://www.npmjs.com/package/speakeasy
export async function createUser(username: string): Promise<string> {
    // 1. generate totp key
    const secret = authenticator.generateSecret();
    // 2. hash the username
    const usernameEncyptionKey = await getUserKey(username);
    const hashedUsername = await argon2It(usernameEncyptionKey);
    // 3. encrypt the totp key with username key
    const encryptedSecret = await encrypt(usernameEncyptionKey, secret);
    // 4. store entry in db
    const db = await dbPromise;
    const result = await db.insert(schema.users)
        .values({
            username: hashedUsername,
            totp: encryptedSecret
        })
        .execute();
    if (result.rowCount !== 1) {
        throw new Error(`Failed to create new user. Got row count of ${result.rowCount}`);
    }
    return secret;
}

export async function createAuthCookie({username, otp}: LoginRequest): 
    Promise<{success: true; cookie: string; expiry: string;} | {success: false; error: LoginError;}> {
    
    // 1. validate username hash exists in db
    const userEncryptionKey = await getUserKey(username)
    const hashedUsername = await argon2It(userEncryptionKey);
    const db = await dbPromise;
    const users = await db.select()
        .from(schema.users)
        .where(drizzle.eq(schema.users.username, hashedUsername))
        .execute();
    if (users.length > 1) {
        throw new Error(`Got unexpected user row count of ${users.length}`);
    }
    if (users.length === 0) {
        return {success: false, error: LoginError.NoSuchUsername};
    }
    
    // 2. decrypt otp key via username
    const user = users[0];
    if (!user.totp) {
        console.log(`TOTP is missing for user`);
        return {success: false, error: LoginError.FailedToValidateOTP};
    }
    const plaintextTOTPKey = await decrypt(userEncryptionKey, user.totp);
    
    // 3. validate submitted otp
    const result = authenticator.verify({token: otp, secret: plaintextTOTPKey});
    if (!result) {
        return {success: false, error: LoginError.BadOTP};
    }

    // 4. Create JWT and session
    const dayInMillis = 1000 * 60 * 60 * 24;
    const expiration = Date.now() + (dayInMillis * EXPIRATION_DURATION_DAYS);
    const expiresAt = (new Date(expiration)).toUTCString();
    const sessionId = uuid();
    const sessionResult = await db.insert(schema.sessions)
        .values({
            id: sessionId,
            userId: user.id,
            expiresAt
        });
    if (sessionResult.rowCount !== 1) {
        console.log('problem creating session got row count of', sessionResult.rowCount);
        return {success: false, error: LoginError.InternalServerError};
    }
    const jwt: JWT = {
        sessionId,
        expiresAt
    };

    // 5. Sign JWT
    const signedJWT = jsonwebtoken.sign(jwt, AUTH_KEY);

    // 6. Encrypt then return as cookie
    const cookie = await encrypt(AUTH_KEY, signedJWT);

    return {success: true, cookie, expiry: expiresAt};
}

export async function isAuthenticated(authCookie?: string): Promise<AuthStatusResponse> {
    if (!authCookie) return {isAuthed: false, authCookie};
    
    // 1. decrypt cookie
    let signedJWT
    try {
        signedJWT = await decrypt(AUTH_KEY, authCookie);
    } catch (e) {
        const error = e as Error;
        console.log('failed to decrypt auth cookie', e);
        return {isAuthed: false, authCookie};
    }
    
    // 2. validate JWT is signed
    let jwt: JWT;
    try {
        jwt = jsonwebtoken.verify(signedJWT, AUTH_KEY) as JWT;
    } catch(e) {
        const error = e as Error;
        console.log('failed to verify signed jwt', e);
        return {isAuthed: false, authCookie};
    }
    
    // 3. validate JWT is not expired
    const {expiresAt, sessionId} = jwt;
    const jwtExpiry = new Date(expiresAt);
    const now = Date.now();
    const nowPretty = (new Date(now)).toUTCString();
    if (now > jwtExpiry.getTime()) {
        console.log(`jwt expired at ${expiresAt} now is ${nowPretty}`);
        return {isAuthed: false, authCookie};
    }

    // 4. validate session is not expired
    const db = await dbPromise;
    const sessions = await db.select()
        .from(schema.sessions)
        .where(drizzle.eq(schema.sessions.id, sessionId))
        .execute();
    if (sessions.length !== 1) {
        console.log(`no session with id ${sessionId}. auth check failed`);
        return {isAuthed: false, authCookie};
    }
    const session = sessions[0];
    if (!session.expiresAt) {
        console.log(`blank session expiry`);
        return {isAuthed: false, authCookie};
    }
    const sessionExpiry = new Date(session.expiresAt);
    if (now > sessionExpiry.getTime()) {
        console.log(`session expired at ${session.expiresAt} now is ${nowPretty}`);
        return {isAuthed: false, authCookie};
    }
    
    return {
        isAuthed: true,
        authCookie,
        expiresAt: session.expiresAt,
        sessionId
    };
}

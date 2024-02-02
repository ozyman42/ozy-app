export enum LoginError {
    NotPost = 'NotPost',
    NoSuchUsername = 'NoSuchUsername',
    BadOTP = 'BadOTP',
    FailedToValidateOTP = 'FailedToValidateOTP',
    InternalServerError = 'InternalServerError'
}

export type LoginResponse = 
    { success: true; } |
    { success: false; error: LoginError; };

export type LoginRequest = {
    username: string;
    otp: string;
}

export const SIGN_UP_RECAPTCHA_ACTION = 'SIGNUP';

export enum SignUpError {
    UsernameAlreadyExists = 'UsernameAlreadyExists',
    InvalidCaptcha = 'InvalidCaptcha',
    InternalServerError = 'InternalServerError'
}

export type SignUpRequest = {
    username: string;
    captcha: string;
}

export type SignUpResponse = 
    { success: true; otpKey: string; } |
    { success: false; error: SignUpError; }

export enum AuthStatusFailureReason {
    MissingCookie = 'MissingCookie',
    InvalidCookie = 'InvalidCookie',
    InvalidToken  = 'InvalidToken',
    ExpiredToken  = 'ExpiredToken',
    NoSuchSession = 'NoSuchSession',
    ExpiredSession = 'ExpiredSession'
}

export type AuthStatusResponse = 
    { isAuthed: false; reason: AuthStatusFailureReason; } |
    { isAuthed: true; sessionId: string; userId: number; expiresAt: string };

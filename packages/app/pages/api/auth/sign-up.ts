import { NextApiRequest, NextApiResponse } from 'next';
import {SignUpError, SignUpRequest, SignUpResponse} from '@/common/universal/api-interfaces';
import { validateCaptcha } from '@/common/server-side/captcha';
import { createUser, usernameExists } from '@/common/server-side/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse<SignUpResponse>): Promise<void> {
    const {username, captcha} = JSON.parse(req.body) as SignUpRequest;
    function end(response: SignUpResponse) {
        res.status(200).json(response);
    }
    try {
        // 1. validate captcha
        if (!await validateCaptcha(captcha)) {
            end({success: false, error: SignUpError.InvalidCaptcha});
            return;
        }
        // 2. validate username
        if (await usernameExists(username)) {
            end({success: false, error: SignUpError.UsernameAlreadyExists});
            return;
        }
        // 3. store user and otp key in db
        const otp = await createUser(username);
        // 4. return otp to frontend
        end({success: true, otpKey: otp});
    } catch(e) {
        console.log("Error executing sign-up flow", e);
        end({success: false, error: SignUpError.InternalServerError});
    }
}

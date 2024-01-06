import { EnvToggle } from '@/common/front-end/components/EnvToggle';
import { Recaptcha, reset } from '@/common/front-end/components/Recaptcha';
import { SubmitButton } from '@/common/front-end/components/SubmitButton';
import { ErrorText } from '@/common/front-end/components/ErrorText';
import { TextInput } from '@/common/front-end/components/TextInput';
import { LoginError, LoginRequest, LoginResponse, SIGN_UP_RECAPTCHA_ACTION, SignUpError, SignUpRequest, SignUpResponse } from '@/common/universal/api-interfaces';
import * as React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Login() {
    const [loginUsername, setLoginUsername] = React.useState("");
    const [loginTOTP, setLoginTOTP] = React.useState("");
    const [loginUsernameErorr, setLoginUsernameError] = React.useState("");
    const [loginTOTPError, setLoginTOTPError] = React.useState("");
    const [loginGenericError, setLoginGenericError] = React.useState("");

    const [signUpUsername, setSignUpUsername] = React.useState("");
    const [signUpUsernameError, setSignUpUsernameError] = React.useState("");
    const [signUpRecaptchaError, setSignUpRecaptchaError] = React.useState("");
    const [signUpGenericError, setSignUpGenericError] = React.useState("");
    const [recaptchaResponse, setRecaptchaResponse] = React.useState("");
    const [returnedTOTP, setReturnedTOTP] = React.useState<{key: string; url: string;} | undefined>(undefined);

    const isLoginActive = !!(loginUsername && loginTOTP);
    async function login() {
        setLoginTOTPError("");
        setLoginUsernameError("");
        setLoginGenericError("");
        const req: LoginRequest = {
            username: loginUsername,
            otp: loginTOTP
        };
        const res = await fetch('/api/auth/login', {method: 'POST', body: JSON.stringify(req)});
        if (res.status !== 200) {
            setLoginGenericError(`unexpected status of ${res.status}`);
            return;
        }
        const resJSON: LoginResponse = await res.json();
        if (!resJSON.success) {
            switch(resJSON.error) {
                case LoginError.BadOTP:
                    setLoginTOTPError("bad otp");
                    break;
                case LoginError.FailedToValidateOTP:
                    setLoginTOTPError("encountered error while validating");
                    break;
                case LoginError.NoSuchUsername:
                    setLoginUsernameError(`no such username '${req.username}'`);
                    break;
                case LoginError.InternalServerError:
                case LoginError.NotPost:
                    setLoginGenericError("issue logging in, check server logs");
                    break;
            }
            return;
        }
        window.location.href = '/';
    }
    const isSignupActive = !!(signUpUsername && recaptchaResponse);
    async function signup() {
        setSignUpGenericError("");
        setSignUpRecaptchaError("");
        setSignUpUsernameError("");
        const req: SignUpRequest = {
            captcha: recaptchaResponse,
            username: signUpUsername
        };
        reset(SIGN_UP_RECAPTCHA_ACTION);
        const res = await fetch('/api/auth/sign-up', {method: 'POST', body: JSON.stringify(req)});
        if (res.status !== 200) {
            setSignUpGenericError(`unexpected status of ${res.status}`);
            return;
        }
        const resJSON: SignUpResponse = await res.json();
        if (!resJSON.success) {
            switch(resJSON.error) {
                case SignUpError.InvalidCaptcha:
                    setSignUpRecaptchaError("reCAPTCHA failed, check server logs");
                    break;
                case SignUpError.InternalServerError:
                    setSignUpGenericError("something went wrong, check server logs");
                    break;
                case SignUpError.UsernameAlreadyExists:
                    setSignUpUsernameError(`username '${req.username}' already exists`);
                    break;
            }
            return;
        }
        const {otpKey} = resJSON;
        setReturnedTOTP({
            key: otpKey, 
            url: `otpauth://totp/Ozy:%20${req.username}?secret=${otpKey}`
        });
        setSignUpUsername("");
        setRecaptchaResponse("");
    }
    function otpCopied() {
        setReturnedTOTP(undefined);
    }
    return <div>
        <EnvToggle />
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xs">
                {!returnedTOTP && <>
                    <TextInput 
                        inputName='username' 
                        onChange={setLoginUsername} 
                        value={loginUsername} 
                        error={loginUsernameErorr}
                    />
                    <TextInput 
                        inputName='totp'
                        onChange={setLoginTOTP}
                        value={loginTOTP} 
                        error={loginTOTPError}
                    />
                    <SubmitButton text='Login' onClick={login} isActive={isLoginActive} />
                    <ErrorText text={loginGenericError} />
                    <div className="divider">or</div>
                    <TextInput inputName='username' onChange={setSignUpUsername} value={signUpUsername} error={signUpUsernameError} />
                    <Recaptcha 
                        siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_ID!}
                        uniqueAction={SIGN_UP_RECAPTCHA_ACTION}
                        onToken={setRecaptchaResponse} 
                        dark={false}
                        error={signUpRecaptchaError}
                    />
                    <div className='mt-3' />
                    <SubmitButton text='Sign Up' onClick={signup} isActive={isSignupActive} />
                    <ErrorText text={signUpGenericError} />
                </>}
                {returnedTOTP && <div className='prose'>
                    <h1 className='text-center'>TOTP</h1>
                    <QRCodeSVG 
                        width={250}
                        height={250}
                        value={returnedTOTP.url}
                        className='m-auto'
                    />
                    <div className="divider">or</div>
                    <div className='alert relative mt-5'>
                        <code className='p-2 pl-3 pr-3 size-20 text-lg tracking-wide absolute left-5 bg-transparent'>
                            {returnedTOTP.key}
                        </code>
                        <button 
                            className='absolute right-5 btn btn-sm'
                            onClick={() => { navigator.clipboard.writeText(returnedTOTP.key) }}>
                            📋
                        </button>
                    </div>
                    <div className="divider"></div>
                    <p>
                        Save this to your authenticator app. <br />
                        It will only be shown once.
                    </p>
                    <SubmitButton text='I Saved It' onClick={otpCopied} isActive={true} />
                </div>}
            </div>
        </div>
    </div>
}

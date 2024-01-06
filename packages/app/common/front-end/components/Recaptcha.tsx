import * as React from 'react';
import { ErrorText } from './ErrorText';

export type RecaptchaProps = {
    uniqueAction: string;
    siteKey: string;
    dark: boolean;
    error?: string;
    onToken: (token: string) => void
}

function getWindow() {
    return (window as any);
}

const recaptchaOnloadFnName = 'recaptchaOnload';

function getIdKey(uniqueAction: string) {
    return `recaptcha-${uniqueAction}-id`;
}

export function reset(uniqueAction: string) {
    const w = getWindow();
    if (w) {
        const idKey = getIdKey(uniqueAction);
        if (w[idKey] !== undefined) {
            w.grecaptcha.enterprise.reset(w[idKey]);
        }
    }
}

export function Recaptcha({error, uniqueAction, dark, onToken, siteKey}: RecaptchaProps) {
    const [token, setToken] = React.useState("");
    React.useEffect(() => {
        const w = getWindow();
        const interval: {id?: any} = {id: undefined};
        if (w) {
            if (!w[recaptchaOnloadFnName]) {
                w.recaptchaLoadedPromise = new Promise<void>(resolve => {
                    w[recaptchaOnloadFnName] = function() {
                        resolve();
                    }
                    const script = document.createElement('script');
                    script.async = true;
                    script.defer = true;
                    script.src = `https://www.google.com/recaptcha/enterprise.js?onload=${recaptchaOnloadFnName}&renderexplicit`;
                    w.document.head.appendChild(script);
                });
            }
            w.recaptchaLoadedPromise.then(() => {
                const idKey = getIdKey(uniqueAction);
                try {
                    const id = w.grecaptcha.enterprise.render(uniqueAction, {
                        'sitekey': siteKey,
                        'action': uniqueAction,
                        theme: dark ? 'dark' : 'light'
                    });
                    w[idKey] = id;
                } catch(e) {
                    const error = e as Error;
                    if (error.message !== 'reCAPTCHA has already been rendered in this element') {
                        console.log(`error while trying to render recpatcha for ${uniqueAction}`);
                        console.log(error.message);
                    }
                }
                interval.id = setInterval(() => {
                    let response;
                    try {
                        response = w.grecaptcha.enterprise.getResponse(w[idKey]);
                    } catch (e) {
                        const error = e as Error;
                        if (error.message.startsWith('reCAPTCHA client element has been removed')) {
                            console.log('detected removed recaptcha');
                            clearInterval(interval.id);
                            delete interval.id;
                        }
                        return;
                    }
                    if (response !== token) {
                        onToken(response);
                        setToken(response);
                    }
                }, 1000);
            });
        }
        return () => { if (interval.id) clearInterval(interval.id); }
    }, [token]);
    return <div className='w-full flex justify-center content-center'>
        <div className='w-auto'>
            <div id={uniqueAction}></div>
            <ErrorText text={error} />
        </div>
    </div>
}
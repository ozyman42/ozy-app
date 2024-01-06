import * as React from 'react';
import { Loading } from './Loading';
import { AuthStatusResponse } from '@/common/universal/api-interfaces';
import { NoAuthRequiredRoutes } from '@/common/universal/auth-paths';

type StatusProps = {
    status: string | undefined;
    name: string;
    badStatus?: string;
}

function Status({name, status, badStatus}: StatusProps) {
    const loading = status === undefined;
    const badgeClass = loading ? 'badge-info' : badStatus === status ? 'badge-warning' : 'badge-success';
    return <div className={`badge ${badgeClass} gap-1`}>
        {name}:{loading ? <Loading /> : <b>{status}</b>}
    </div>
}

function ErrorDisplay({error}: {error: string}) {
    return <div className="badge">⚠ {error}</div>
}

enum DevServerStatus {
    online = 'online',
    offline = 'offline'
}

enum Env {
    prod = 'prod',
    dev = 'dev'
}

function oppositeEnv(env: Env) {
    const envs = Object.values(Env);
    const idx = envs.indexOf(env);
    return envs[(idx + 1) % envs.length];
}

function reload() {
    window.location.reload();
}

function Expiry({expiry}: {expiry?: string;}) {
    const [expiryText, setExpiryText] = React.useState("");
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (!expiry)  {
                setExpiryText("");
                return;
            }
            const expiryDate = new Date(expiry);
            const diff = expiryDate.getTime() - Date.now();
            let seconds = Math.floor(diff / 1000);
            let minutes = Math.floor(seconds / 60);
            seconds %= 60;
            let hours = Math.floor(minutes / 60);
            minutes %= 60;
            const days = Math.floor(hours / 24);
            hours %= 24;
            let text = '';
            if (days) text += ` ${days}d`;
            if (hours || days) text += ` ${hours}h`;
            if (minutes || hours || days) text += ` ${minutes}m`;
            text += ` ${seconds}s`;
            text = text.substring(1);
            setExpiryText(text);
        }, 500);
        return () => { clearInterval(intervalId); };
    }, [expiry]);
    return <>
        session expires in {expiryText}
    </>
}

export function EnvToggle() {
    const [curEnv, setCurEnv] = React.useState<Env | undefined>(undefined);
    const [curDevStatus, setCurDevStatus] = React.useState<DevServerStatus | undefined>(undefined);
    const [devStatusError, setDevStatusError] = React.useState<string | undefined>(undefined);
    const [envError, setEnvError] = React.useState<string | undefined>(undefined);
    const [switching, setSwitching] = React.useState(false);
    const [signedIn, setSignedIn] = React.useState(false);
    const [sessionExpiry, setSessionExpiry] = React.useState("");
    React.useEffect(() => {
        async function getEnv() {
            try {
                const response = await (await fetch('/api/version')).json();
                const {version} = response;
                if (!Object.values(Env).includes(version)) {
                    throw new Error(JSON.stringify(response));
                }
                if (curEnv !== undefined && curEnv !== version) {
                    setSwitching(false);
                    reload();   
                }
                setCurEnv(version);
                setEnvError(undefined);
            } catch(e) {
                setEnvError((e as Error).message);
            }
        }
        async function getDevStatus() {
            try {
                const {code} = await (await fetch('/api/health/dev')).json();
                const newDevStatus = code === 200 ? DevServerStatus.online : DevServerStatus.offline;
                setCurDevStatus(newDevStatus);
                if (newDevStatus === DevServerStatus.offline && curEnv === Env.dev) {
                    toggleEnv();
                }
                setDevStatusError(undefined);
            } catch(e) {
                setCurDevStatus(DevServerStatus.offline);
                setDevStatusError((e as Error).message);
            }
        }
        async function getAuthStatus() {
            const response: AuthStatusResponse = await (await fetch('/api/auth/status')).json();
            setSignedIn(response.isAuthed);
            const curPathRequiresAuth = !NoAuthRequiredRoutes.has(window.location.pathname);
            if (!response.isAuthed && curPathRequiresAuth) {
                window.location.reload();
            }
            if (response.isAuthed) {
                setSessionExpiry(response.expiresAt);
            } else {
                setSessionExpiry("");
            }
        }
        function getAll() {
            getEnv();
            getDevStatus();
            getAuthStatus();
        }
        const intervalId = setInterval(() => {
            getAll();
        }, 5000);
        getAll();
        return () => { clearInterval(intervalId); }
    }, [curEnv]);
    async function toggleEnv() {
        if (!curEnv) return;
        if (switching) return;
        await fetch(`/set-cookie-${oppositeEnv(curEnv)}`);
        setSwitching(true);
    }
    async function signOut() {
        await fetch('/api/auth/sign-out');
        window.location.reload();
    }
    return <div className='relative'>
        <Status name='dev' status={curDevStatus} badStatus='offline'/>
        {/*devStatusError && <Error error={devStatusError} />*/}
        <Status name='env' status={curEnv} />
        {/*envError && <Error error={envError} />*/}
        {(curEnv === Env.dev || curDevStatus === DevServerStatus.online) &&
            <button className="btn btn-xs m-1 btn-outline gap-1" onClick={() => {toggleEnv();}}>
                {curEnv && <>
                    Switch{switching ? 'ing' : ''} to <b>{oppositeEnv(curEnv)}</b>{switching && <Loading />}
                </>}
                {!curEnv && <Loading />}
            </button>
        }
        {/*<button className="btn btn-xs m-1 btn-outline" onClick={() => {reload();}}>
            Reload
        </button>*/}
        {signedIn && <div className='absolute right-0 top-0'>
            <div className='badge '>
                <Expiry expiry={sessionExpiry} />
            </div>
            <div className=' btn btn-xs m-1' onClick={() => {signOut()}}>
                Sign Out
            </div>
        </div>}
    </div>
}
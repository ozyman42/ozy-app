import * as React from 'react';
import { Loading } from './Loading';

type StatusProps = {
    status: string | undefined;
    name: string;
    badStatus?: string;
}

function Status({name, status, badStatus}: StatusProps) {
    const loading = status === undefined;
    const badgeClass = loading ? 'badge-info' : badStatus === status ? 'badge-warning' : 'badge-success';
    return <div className={`badge ${badgeClass} gap-2`}>
        {name}:{loading ? <Loading /> : <b>{status}</b>}
    </div>
}

function Error({error}: {error: string}) {
    return <div className="badge">⚠ {error}</div>
}

const ENVS = ['prod', 'dev'];

function oppositeEnv(env: string) {
    const idx = ENVS.indexOf(env);
    return ENVS[(idx + 1) % ENVS.length];
}

function reload() {
    window.location.reload();
}

export function EnvToggle() {
    const [curEnv, setCurEnv] = React.useState<string | undefined>(undefined);
    const [curDevStatus, setCurDevStatus] = React.useState<string | undefined>(undefined);
    const [devStatusError, setDevStatusError] = React.useState<string | undefined>(undefined);
    const [envError, setEnvError] = React.useState<string | undefined>(undefined);
    const [switching, setSwitching] = React.useState(false);
    React.useEffect(() => {
        async function getEnv() {
            try {
                const {version} = await (await fetch('/api/version')).json();
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
                setCurDevStatus(code === 200 ? 'online' : 'offline');
                setDevStatusError(undefined);
            } catch(e) {
                setCurDevStatus('offline');
                setDevStatusError((e as Error).message);
            }
        }
        const intervalId = setInterval(() => {
            getEnv();
            getDevStatus();
        }, 5000);
        return () => { clearInterval(intervalId); }
    }, [curEnv]);
    const envToToggleTo = curEnv ? oppositeEnv(curEnv) : 'prod';
    async function toggleEnv(to: string) {
        if (switching) return;
        await fetch(`/set-cookie-${to}`);
        setSwitching(true);
    }
    return <div>
        <Status name='dev' status={curDevStatus} badStatus='offline'/>
        {/*devStatusError && <Error error={devStatusError} />*/}
        <Status name='env' status={curEnv} />
        {/*envError && <Error error={envError} />*/}
        <button className="btn btn-xs m-1 btn-outline" onClick={() => {toggleEnv(envToToggleTo);}}>
            Switch{switching ? 'ing' : ''} to <b>{envToToggleTo}</b>{switching && <Loading />}
        </button>
        {/*<button className="btn btn-xs m-1 btn-outline" onClick={() => {reload();}}>
            Reload
        </button>*/}
    </div>
}
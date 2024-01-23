import nodeFetch from 'node-fetch';
import { DEV_PASSTHROUGH_HOSTNAME } from '@ozy/constants';;

export type DevServerStatus = {
    code: number;
    text: string;
}

export async function getDevServerStatus(): Promise<DevServerStatus> {
    try {
        const versionResponse = await nodeFetch(`http://${DEV_PASSTHROUGH_HOSTNAME}/api/version`, {signal: AbortSignal.timeout(5000)});
        const text = await versionResponse.text();
        const code = versionResponse.status;
        return {text, code};
    } catch (e) {
        return {text: (e as any).toString(), code: -1};
    }
}
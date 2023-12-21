import nodeFetch from 'node-fetch';

export type DevServerStatus = {
    code: number;
    text: string;
}

export async function getDevServerStatus(): Promise<DevServerStatus> {
    try {
        const versionResponse = await nodeFetch("http://codespace.ozy.xyz:3000/api/version");
        const text = await versionResponse.text();
        const code = versionResponse.status;
        return {text, code};
    } catch (e) {
        return {text: (e as any).toString(), code: -1};
    }
}
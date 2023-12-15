export async function getDevServerStatus(): Promise<{code: number; text: string;}> {
    try {
        const versionResponse = await fetch("http://codespace.ozy.xyz:3000/api/version", {cache: "no-store"});
        const text = await versionResponse.text();
        const code = versionResponse.status;
        return {text, code};
    } catch (e) {
        return {text: (e as any).toString(), code: -1};
    }
}
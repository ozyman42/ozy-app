import * as fs from 'fs';
import * as path from 'path';

function write(pathStr: string, contents: string) {
    fs.mkdirSync(path.dirname(pathStr), {recursive: true});
    fs.writeFileSync(pathStr, contents);
}

export const GOOGLE_CREDS_PATH = path.resolve(__dirname, 'secrets/google.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_CREDS_PATH;
write(GOOGLE_CREDS_PATH, process.env.OZY_GOOGLE_CLOUD_SERVICE_ACCOUNT!);
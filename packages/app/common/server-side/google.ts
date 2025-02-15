import * as fs from 'fs/promises';
import * as path from 'path';
import { Secrets, getSecret } from '@ozy/constants/src/secrets';

async function write(pathStr: string, contents: string) {
    await fs.mkdir(path.dirname(pathStr), {recursive: true});
    await fs.writeFile(pathStr, contents);
}

async function setup() {
  const GOOGLE_CREDS_PATH = path.resolve(__dirname, 'secrets/google.json');
  process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_CREDS_PATH;
  const googleCloudServiceAccount = await getSecret(Secrets.GoogleCloudServiceAccount);
  await write(GOOGLE_CREDS_PATH, googleCloudServiceAccount);
}

export const googleIsSetup = setup();

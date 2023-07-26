const env = process.argv[2];
const allowedEnvs = ['prod', 'dev'];
if (allowedEnvs.indexOf(env) === -1) {
  throw new Error(`Invalid env ${env}`);
}
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const androidDir = path.resolve(__dirname, 'android');
fs.rmSync(androidDir, {recursive: true, force: true});
const capConfigPath = path.resolve(__dirname, 'capacitor.config.json');
const capConfig = JSON.parse(fs.readFileSync(capConfigPath).toString());
const appName = 'Ozy';
const appIdParts = [appName.toLocaleLowerCase(), 'xyz'];
if (env === 'dev') {
  appIdParts.unshift('beta');
}
const appUrl = `http${env === 'prod' ? 's' : ''}://${appIdParts.join(".")}`;
const appId = appIdParts.reverse().join(".");
capConfig.appName = `${appName}${env === 'dev' ? ' (Beta)' : ''}`;
capConfig.appId = appId;
capConfig.server.url = appUrl;
const capConfigOutput = JSON.stringify(capConfig, null, 2);
fs.writeFileSync(capConfigPath, capConfigOutput);
execSync('npx cap add android', {stdio: 'inherit'});
// Right now the resources folder only has an icon. In the future add spash screen
// https://developer.android.com/develop/ui/views/launch/splash-screen
execSync('npx capacitor-assets generate', {stdio: 'inherit'});
const iconPath = path.resolve(__dirname, 'resources/icon-only.png');
const faviconPath = path.resolve(__dirname, 'app/favicon.ico');
const pngToIco = require('png-to-ico');
pngToIco(iconPath)
  .then(buf => {
    fs.writeFileSync(faviconPath, buf);
  })
  .catch(console.error);
// TODO: add the following to AndroidManifest.xml per 
//       https://capacitorjs.com/docs/guides/deep-links
/*
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="beerswift.app" />
    </intent-filter>
*/
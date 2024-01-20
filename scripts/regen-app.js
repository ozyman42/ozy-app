const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');
const { XMLBuilder, XMLParser } = require('fast-xml-parser');

// Env
const env = process.argv[2];

// Consts
const appDir = path.resolve(__dirname, '../packages/app');
console.log('appdir is', appDir);
const androidDir = path.resolve(appDir, 'android');
const allowedEnvs = ['prod', 'dev'];
if (allowedEnvs.indexOf(env) === -1) {
  throw new Error(`Invalid env ${env}`);
}
const appName = 'Ozy';
const appIdParts = [appName.toLocaleLowerCase(), 'xyz'];
if (env === 'dev') {
  appIdParts.unshift('beta');
}
const appDomain = appIdParts.join(".");
const appUrl = `https://${appDomain}`;
const appId = appIdParts.reverse().join(".");

// Rewrite app
const rewriteApp = true;
if (rewriteApp) {
  fs.rmSync(androidDir, {recursive: true, force: true});
  const capConfigPath = path.resolve(appDir, 'capacitor.config.json');
  const capConfig = JSON.parse(fs.readFileSync(capConfigPath).toString());
  capConfig.appName = `${appName}${env === 'dev' ? ' (Beta)' : ''}`;
  capConfig.appId = appId;
  capConfig.server.url = appUrl;
  const capConfigOutput = JSON.stringify(capConfig, null, 2);
  fs.writeFileSync(capConfigPath, capConfigOutput);
  execSync('npx cap add android', {stdio: 'inherit', cwd: appDir});
  fs.mkdirSync(path.resolve(androidDir, 'app/src/main/assets'), {recursive: true});
  execSync('npx cap sync', {stdio: 'inherit', cwd: appDir});

  // Icon
  // Right now the resources folder only has an icon. In the future add spash screen
  // https://developer.android.com/develop/ui/views/launch/splash-screen
  execSync('npx capacitor-assets generate', {stdio: 'inherit', cwd: appDir});
  const iconPath = path.resolve(appDir, 'resources/icon-only.png');
  const faviconPath = path.resolve(appDir, 'public/favicon.ico');
  pngToIco(iconPath)
    .then(buf => {
      fs.writeFileSync(faviconPath, buf);
    })
    .catch(console.error);
}

// Deep links https://capacitorjs.com/docs/guides/deep-links
// We prefer universal links https://shareg.pt/PfWRDLP
/*
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
*/

const androidManifestPath = path.resolve(androidDir, 'app/src/main/AndroidManifest.xml');
const xmlParser = new XMLParser({ignoreAttributes: false});
const androidManifest = xmlParser.parse(fs.readFileSync(androidManifestPath).toString());
const activity = androidManifest.manifest.application.activity;
const originalIntentFilter = activity['intent-filter'];
activity['intent-filter'] = [
  originalIntentFilter,
  { '@_android:autoVerify': "true",
    action: { '@_android:name': "android.intent.action.VIEW" },
    category: [
      { '@_android:name': "android.intent.category.DEFAULT" },
      { '@_android:name': "android.intent.category.BROWSABLE" },
    ],
    data: { '@_android:scheme': "https", '@_android:host': appDomain }
  }
];
const xmlBuilder = new XMLBuilder({ignoreAttributes: false, format: true, suppressBooleanAttributes: false, indentBy: '  '});
const andoirdManifestOutput = xmlBuilder.build(androidManifest);
//console.log(andoirdManifestOutput);
fs.writeFileSync(androidManifestPath, andoirdManifestOutput);
const wellKnownDir = path.resolve(appDir, 'public/.well-known');
fs.mkdirSync(wellKnownDir, {recursive: true});
const assetLinksJsonPath = path.resolve(wellKnownDir, 'assetlinks.json');
fs.writeFileSync(assetLinksJsonPath, JSON.stringify([
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target" : { 
      "namespace": "android_app",
      "package_name": appId,
      "sha256_cert_fingerprints": [
        "19:64:C3:87:72:74:E3:BD:44:BD:69:4E:04:57:AC:5D:6D:53:D4:CD:FF:F9:56:6F:5B:DA:9D:9D:37:A9:CC:ED"
      ]
    }
  }
], null, 2));

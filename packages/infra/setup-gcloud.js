const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const outFile = path.resolve(__dirname, 'gcloud.json');
fs.writeFileSync(outFile, process.env.OZY_GOOGLE_CLOUD_SERVICE_ACCOUNT);
execSync(`export GOOGLE_APPLICATION_CREDENTIALS=${outFile}`);
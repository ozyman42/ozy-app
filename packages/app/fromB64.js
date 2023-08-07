const fs = require('fs');
const path = require('path');
const inB64 = process.env.OZY_GOOGLE_PLAYSTORE_KEYSTORE;
const decoded = Buffer.from(inB64, 'base64');
const outputPath = path.resolve(__dirname, 'ozy-app-key.keystore');
fs.writeFileSync(outputPath, decoded);
// from copy 
// 19:64:C3:87:72:74:E3:BD:44:BD:69:4E:04:57:AC:5D:6D:53:D4:CD:FF:F9:56:6F:5B:DA:9D:9D:37:A9:CC:ED
// from original
// 19:64:C3:87:72:74:E3:BD:44:BD:69:4E:04:57:AC:5D:6D:53:D4:CD:FF:F9:56:6F:5B:DA:9D:9D:37:A9:CC:ED
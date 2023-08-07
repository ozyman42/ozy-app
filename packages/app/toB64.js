const fs = require('fs');
const path = require('path');
const keyFilePath = path.resolve(__dirname, 'ozy-app-key.keystore');
const keyFile = fs.readFileSync(keyFilePath);
console.log(keyFile.toString('base64'));
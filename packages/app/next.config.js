const fs = require('fs');
const path = require('path');
/** @type {import('next').NextConfig} */

const envVarMap = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.OZY_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.OZY_CLERK_SECRET_KEY,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/',
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/'
};

const output = Object.entries(envVarMap).map(([name, val]) => `${name}=${val}\n`).join("");
fs.writeFileSync(path.resolve(__dirname, '.env.local'), output);

const nextConfig = {};
/**
 *
 *reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  output: 'export'
  */

module.exports = nextConfig

const withTM = require('next-transpile-modules');
const packageJSON = require('./package.json');

const libs = new Set(['devDependencies', 'dependencies']
  .map(k => Object.entries(packageJSON[k]))
  .flat()
  .filter(([k, v]) => v === 'workspace:*')
  .map(([k]) => k));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    logging: "verbose",
  },
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      // Ensure prisma client is not included in the client bundle
      config.module.rules.push({
        test: /postgres/,
        use: "null-loader",
      })
    }
    return config
  }
}

module.exports = withTM(Array.from(libs))(nextConfig);

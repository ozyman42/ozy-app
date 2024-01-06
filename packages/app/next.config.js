/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source'
    })
    return config
  },

  eslint: {
    // Using Biome instead of ESLint,
    // see https://github.com/vercel/next.js/discussions/59347
    ignoreDuringBuilds: true
  }
}

export default nextConfig

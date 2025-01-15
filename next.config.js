/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      loaders: {
        '.js': ['jsx-loader'],
        '.ts': ['tsx-loader']
      }
    }
  }
}

export default nextConfig

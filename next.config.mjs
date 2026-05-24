/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/resources',
        destination: '/about/resources',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

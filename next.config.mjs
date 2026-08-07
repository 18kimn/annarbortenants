const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: sanityProjectId
          ? `/images/${sanityProjectId}/**`
          : '/images/**',
      },
    ],
  },
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
      {
        source: '/r2r',
        destination: '/campaigns/r2r',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

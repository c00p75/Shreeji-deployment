/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.idealdisplays.co.za',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  eslint: {
    // Disable ESLint during builds to avoid serialization errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript checking enabled
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

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
};

export default nextConfig;

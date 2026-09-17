import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    const apiUrl = process.env.API_URL ?? 'http://localhost:5000';
    return [
      {
        source: '/api/health',
        destination: `${apiUrl}/api/health`,
      },
      {
        source: '/api/hello',
        destination: `${apiUrl}/api/hello`,
      },
      {
        source: '/api/orders',
        destination: `${apiUrl}/api/orders`,
      },
      {
        source: '/api/orders/:path*',
        destination: `${apiUrl}/api/orders/:path*`,
      },
    ];
  },
};

export default nextConfig;

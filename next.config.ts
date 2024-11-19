import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dynamic-media-cdn.tripadvisor.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'lacolonia.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'vallearriba.elplazas.com',
      },
      {
        protocol: 'https',
        hostname: 'h1ktmf8p-5002.use2.devtunnels.ms',
      },
    ],
  },
};

export default nextConfig;

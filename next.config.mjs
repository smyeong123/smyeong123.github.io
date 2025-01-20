/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Customize webpack config here
    config.resolve.alias['@'] = path.join(process.cwd(), 'src');
    return config;
  },
  // Additional Next.js configurations
};

export default nextConfig;

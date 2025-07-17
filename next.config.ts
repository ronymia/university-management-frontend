import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // reactStrictMode: true,
    images: {
        domains: ['localhost', 'university-management-api-gateway-drab.vercel.app'],
    },
};

export default nextConfig;

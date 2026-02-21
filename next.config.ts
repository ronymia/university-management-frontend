import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // reactStrictMode: true,
    images: {
        domains: [
            'localhost',
            'university-management-api-gateway-production.up.railway.app',
            'bygduxjrnektoomnqrzd.supabase.co',
        ],
    },
};

export default nextConfig;

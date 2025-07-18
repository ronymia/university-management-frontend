import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // reactStrictMode: true,
    images: {
        domains: [
            'localhost',
            'university-management-api-gateway-drab.vercel.app',
            'bygduxjrnektoomnqrzd.supabase.co',
        ],
    },
};

export default nextConfig;

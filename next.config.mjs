/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
        ],
    },
};

export default nextConfig;

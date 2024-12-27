/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: ['89.104.71.159']
    },
    env: {
        API_URL: 'https://aromosa.ru/api'
    },
};

export default nextConfig;

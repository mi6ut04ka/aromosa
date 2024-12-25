/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['192.168.0.15'],
    },
    env: {
        API_URL: 'https://aromosa/public/api'
    }
};

export default nextConfig;

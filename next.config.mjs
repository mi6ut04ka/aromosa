/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['192.168.0.15'],
    },
    env: {
        API_URL: 'http://192.168.0.15:8000/api'
    }
};

export default nextConfig;

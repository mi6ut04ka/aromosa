/** @type {import('next').NextConfig} */
const nextConfig = {
   "images": {
    remotePatterns: [
      {
        "protocol": "http",
        "hostname": "89.104.71.159"
      },
      {
        "protocol": "https",
        "hostname": "89.104.71.159"
      }
    ]
    },
    env: {
        API_URL: 'https://aromosa.ru/api'
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Authorization, Origin',
    }
};

export default nextConfig;

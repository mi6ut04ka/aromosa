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
    
};

export default nextConfig;

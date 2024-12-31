/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME || "localhost",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME || "localhost",
      },
    ],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost/api",
  },
};

export default nextConfig;

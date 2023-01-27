/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    NEXT_PUBLIC_WECASA_API_URL: process.env.NEXT_PUBLIC_WECASA_API_URL,
  },
  // Will be available on both server and client
  publicRuntimeConfig: {
    NEXT_PUBLIC_WECASA_API_URL: process.env.NEXT_PUBLIC_WECASA_API_URL,
  },
};

module.exports = nextConfig;

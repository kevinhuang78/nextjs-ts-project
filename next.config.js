/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

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
  i18n,
};

module.exports = nextConfig;

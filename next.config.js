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
  i18n: {
    locales: ["en-US", "fr-FR"],
    defaultLocale: "fr-FR",
    domains: [
      {
        domain: "localhost.com",
        defaultLocale: "en-US",
      },
      {
        domain: "localhost.fr",
        defaultLocale: "fr-FR",
      },
    ],
  },
};

module.exports = nextConfig;

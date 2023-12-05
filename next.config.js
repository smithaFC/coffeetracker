const withPWA = require('next-pwa')({
    dest: "public",
    register: true,
    skipWaiting: true,
  });
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
    experimental: {
      newNextLinkBehavior: true,
    },
    output: 'export',
  });
module.exports = nextConfig

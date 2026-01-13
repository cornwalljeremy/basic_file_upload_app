/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '250mb', // Set this to the maximum file size you want to allow
    },
  },
};

module.exports = nextConfig;

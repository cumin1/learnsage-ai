/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    DOUBAO_API_KEY: process.env.DOUBAO_API_KEY,
  },
};

module.exports = nextConfig; 
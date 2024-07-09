/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  images: {
    domains: [
      "loremflickr.com",
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    UNIVERSIRY: process.env.UNIVERSIRY,
  },
};

module.exports = nextConfig;

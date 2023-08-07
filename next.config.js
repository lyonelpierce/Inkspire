/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["googleusercontent.com", "cdn.leonardo.ai"],
    loader: "custom",
    loaderFile: "./loader.js",
  },
};

module.exports = nextConfig;

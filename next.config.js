/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: require("path").join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: false,
  },
};

module.exports = nextConfig;

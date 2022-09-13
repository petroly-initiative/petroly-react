const withPWA = require("next-pwa");

const nextConfig = withPWA({
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  output: "standalone",
});

module.exports = nextConfig;

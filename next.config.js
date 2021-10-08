
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"

  },
  images: {
    domains: ["res.cloudinary.com"],
  },
});
  
module.exports = nextConfig;
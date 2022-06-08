
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable:
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "production",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
});
  
module.exports = nextConfig;
// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
//   env: {
//     MONGODB_URI: process.env.MONGODB_URI,
//     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//   },
// };


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // Helps with Netlify & Vercel deployments
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  experimental: {
    serverActions: {}, // Fixed: Changed from boolean to an object
  },
};

module.exports = nextConfig;

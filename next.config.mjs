/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // The marketing site ships without an ESLint config; don't block builds on it.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

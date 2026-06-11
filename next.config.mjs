/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // On Windows, antivirus / OneDrive can lock files inside
      // .next/cache/webpack and corrupt the persistent pack.gz cache, which
      // makes the dev server flap (routes intermittently 404/500 with
      // "ENOENT ... rename ...pack.gz"). Using an in-memory cache in dev means
      // there are no cache files to lock or corrupt, so the server stays stable.
      config.cache = { type: "memory" };
    }
    return config;
  }
};

export default nextConfig;

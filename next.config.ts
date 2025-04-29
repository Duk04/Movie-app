import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMBD_TOKEN: process.env.TMBD_TOKEN,
    TMDB_KEY: process.env.TMDB_KEY,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
  },
};
export default nextConfig;

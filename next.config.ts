import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Verification builds (npm run build:check) write to a separate folder so
  // they never trample the running dev server's .next directory.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;

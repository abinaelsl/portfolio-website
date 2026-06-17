import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray parent lockfile doesn't get picked up.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

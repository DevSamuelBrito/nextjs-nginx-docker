import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build as a static export so `next build` will output an `out/` folder
  // (replaces the old `next export` command).
  output: "export",
};

export default nextConfig;

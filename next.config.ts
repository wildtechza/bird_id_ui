import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // 👈 replaces `next export`
};

export default nextConfig;

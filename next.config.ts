import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;

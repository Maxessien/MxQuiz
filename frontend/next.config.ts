import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "127.0.0.1:3000", "mxquiz.onrender.com", "bookish-parakeet-jjx5g5j67gwcjpvw-3000.app.github.dev"],
    },
  },
};

export default nextConfig;

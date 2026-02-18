import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites() {
  return [
    {
      source: "/newapi/:path*",
      destination: process.env.FASTIFY_API_URL || "http://127.0.0.1:5000/:path*",
    },
  ];
}

};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ["avatars.githubusercontent.com"],
  },
  /* config options here */
  rewrites() {
  return [
    {
      source: "/newapi/:path*",
      destination:"http://127.0.0.1:5000/:path*",
    },
  ];
}

};

export default nextConfig;

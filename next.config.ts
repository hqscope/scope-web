import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      // The standalone blog (blog.canvascope.org) was merged into the newsroom.
      { source: "/blog", destination: "/newsroom", permanent: true },
      { source: "/blog/:path*", destination: "/newsroom", permanent: true },
    ];
  },
};

export default nextConfig;

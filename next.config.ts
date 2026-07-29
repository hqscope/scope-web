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
      // Canvascope was renamed to Scope. Keep the old extension URL alive —
      // it is linked from the Chrome Web Store listing and older newsroom posts.
      {
        source: "/product/canvascope",
        destination: "/product/scope",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

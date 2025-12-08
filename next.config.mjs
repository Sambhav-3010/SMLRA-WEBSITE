/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placeholder.svg"],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/team",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;

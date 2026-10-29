/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

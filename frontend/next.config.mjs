/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Используем оптимизированные изображения Vercel
    unoptimized: false,
  },
};

export default nextConfig; 
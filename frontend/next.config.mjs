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
  experimental: {
    // Отключаем автоматическую предзагрузку для предотвращения проблем с Метрикой
    optimizePackageImports: [],
  },
};

export default nextConfig; 
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mc.yandex.ru',
        pathname: '/watch/**',
      },
    ],
  },
  experimental: {
    // Отключаем автоматическую предзагрузку для предотвращения проблем с Метрикой
    optimizePackageImports: [],
  },
  // Отключаем preload для изображений аналитики
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'off',
          },
        ],
      },
    ];
  },
};

export default nextConfig; 
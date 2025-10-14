import { withSentryConfig } from '@sentry/nextjs';

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

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: "aironlab",
  project: "aironlab-front",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions); 
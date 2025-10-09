import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import YandexMetrika from '@/components/analytics/YandexMetrika'

const calleo = localFont({
  src: [
    {
      path: '../../public/fonts/calleo/Calleo-Trial-Light-BF64af57e71df38.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/calleo/Calleo-Trial-LightItalic-BF64af57e718965.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/calleo/Calleo-Trial-Regular-BF64af57e70e654.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/calleo/Calleo-Trial-Italic-BF64af57e7407c6.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/calleo/Calleo-Trial-SemiBold-BF64af57e72a4d2.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/calleo/Calleo-Trial-SemiBoldItalic-BF64af57e71e28c.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/calleo/Calleo-Trial-Bold-BF64af57e71c4d3.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/calleo/Calleo-Trial-BoldItalic-BF64af57e71e05c.woff',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-calleo'
})

export const metadata: Metadata = {
  title: 'AIronLab - Автоматизация бизнеса с ИИ',
  description: 'Разрабатываем и внедряем решения искусственного интеллекта для автоматизации бизнес-процессов. Повышаем эффективность вашей компании с помощью передовых ИИ-технологий.',
  keywords: 'искусственный интеллект, ИИ, автоматизация, бизнес-процессы, машинное обучение, разработка',
  authors: [{ name: 'AIronLab Team' }],
  creator: 'AIronLab',
  publisher: 'AIronLab',
  robots: 'index, follow',
  metadataBase: new URL('https://aironlab.ru'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://aironlab.ru',
    title: 'AIronLab - Автоматизация бизнеса с ИИ',
    description: 'Разрабатываем и внедряем решения искусственного интеллекта для автоматизации бизнес-процессов.',
    siteName: 'AIronLab',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AIronLab - ИИ решения для бизнеса',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIronLab - Автоматизация бизнеса с ИИ',
    description: 'Разрабатываем и внедряем решения искусственного интеллекта для автоматизации бизнес-процессов.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={calleo.variable}>
      <head>
        {/* Базовая оптимизация производительности */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="yandex-verification" content="ea7d4734cdd12e9f" />
        <meta name="google-site-verification" content="Q-2WXEsKyB23mwdZWG-RQ1kd_qhrCJZDMKII0ky0P8A" />
      </head>
      <body className={`${calleo.className} antialiased bg-background text-foreground overflow-x-hidden`}>
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
} 
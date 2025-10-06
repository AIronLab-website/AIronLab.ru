'use client'

import Script from 'next/script'

export default function YandexMetrika() {
  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="beforeInteractive"
        src="https://mc.yandex.ru/metrika/tag.js"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.ym) {
            window.ym(104427638, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              accurateTrackBounce: true,
              trackLinks: true
            });
          }
        }}
      />
      <noscript>
        <div>
          <img 
            src="https://mc.yandex.ru/watch/104427638" 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
    </>
  )
}

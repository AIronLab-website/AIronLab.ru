'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function MetrikaPageView() {
  const pathname = usePathname()

  useEffect(() => {
    // Отправляем hit при изменении URL (SPA навигация)
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(104427638, 'hit', window.location.href)
    }
  }, [pathname])

  return null
}

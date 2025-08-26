import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Блог - AIronLab',
  description: 'Статьи и материалы от команды AIronLab'
}

export default function BlogPage() {
  // Временная заглушка - редирект на главную
  redirect('/')
}

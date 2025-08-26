import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Статья - AIronLab',
  description: 'Статья блога AIronLab'
}

export default function BlogSlugPage() {
  // Временная заглушка - редирект на главную
  redirect('/')
}

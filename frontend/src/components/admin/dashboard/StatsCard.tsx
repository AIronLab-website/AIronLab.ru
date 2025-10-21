/**
 * StatsCard Component
 * 
 * Карточка статистики для Dashboard
 * Черно-белый минималистичный дизайн
 */

import Link from 'next/link'

interface StatsCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon: React.ReactNode
  href?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  href,
  trend,
}: StatsCardProps) {
  const Card = href ? Link : 'div'
  const cardProps = href ? { href } : {}

  return (
    <Card
      {...cardProps}
      className={`bg-white rounded-xl border border-slate-200 p-6 transition-all ${
        href ? 'hover:shadow-md hover:scale-105 cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <div
            className={`text-sm font-medium ${
              trend.isPositive ? 'text-black' : 'text-slate-500'
            }`}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>

      <div>
        <p className="text-3xl font-bold text-black mb-1">{value}</p>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
    </Card>
  )
}


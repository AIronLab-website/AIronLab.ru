/**
 * LogoutButton Component
 * 
 * Кнопка выхода из админ-панели
 * Использует Server Action для безопасного logout
 */

import { signOut } from '@/lib/supabase/actions'
import { Button } from '@/components/ui/Button'

interface LogoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  children?: React.ReactNode
}

export function LogoutButton({
  variant = 'ghost',
  size = 'default',
  className = '',
  children,
}: LogoutButtonProps) {
  return (
    <form action={signOut}>
      <Button
        type="submit"
        variant={variant}
        size={size}
        className={className}
      >
        {children || (
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Выйти
          </span>
        )}
      </Button>
    </form>
  )
}


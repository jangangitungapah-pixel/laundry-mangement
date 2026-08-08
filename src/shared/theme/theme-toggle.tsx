import { Moon, Sun } from 'lucide-react'

import { cn } from '@/shared/lib/cn'
import { useTheme } from '@/shared/theme/theme-context'
import { Button } from '@/shared/ui/primitives'

export interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className, showLabel = true }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const nextThemeLabel =
    theme === 'light' ? 'Gunakan tema gelap' : 'Gunakan tema terang'

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      className={cn(className)}
      aria-label={nextThemeLabel}
      title={nextThemeLabel}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Moon className="size-4" aria-hidden="true" />
      ) : (
        <Sun className="size-4" aria-hidden="true" />
      )}
      {showLabel ? (
        <span>{theme === 'light' ? 'Tema gelap' : 'Tema terang'}</span>
      ) : null}
    </Button>
  )
}

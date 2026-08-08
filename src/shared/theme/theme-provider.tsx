import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { cn } from '@/shared/lib/cn'
import {
  ThemeContext,
  resolveInitialTheme,
  type Theme,
  type ThemeContextValue,
} from '@/shared/theme/theme-context'

export interface ThemeContainerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> {
  theme: Theme
}

export interface ThemeProviderProps {
  children: ReactNode
  theme?: Theme
  defaultTheme?: Theme
  storageKey?: string
  persist?: boolean
  className?: string
  onThemeChange?: (theme: Theme) => void
}

export function ThemeContainer({
  children,
  className,
  theme,
  ...props
}: ThemeContainerProps) {
  return (
    <div
      {...props}
      data-theme={theme}
      data-theme-container=""
      className={cn('theme-container', className)}
    >
      {children}
    </div>
  )
}

export function ThemeProvider({
  children,
  theme: controlledTheme,
  defaultTheme,
  storageKey = 'laundrykita-theme',
  persist = true,
  className,
  onThemeChange,
}: ThemeProviderProps) {
  const [internalTheme, setInternalTheme] = useState<Theme>(() => {
    return controlledTheme ?? resolveInitialTheme(storageKey, defaultTheme)
  })

  const activeTheme = controlledTheme ?? internalTheme

  useLayoutEffect(() => {
    const documentRoot = document.documentElement
    const previousTheme = documentRoot.getAttribute('data-theme')
    const previousColorScheme = documentRoot.style.colorScheme

    documentRoot.setAttribute('data-theme', activeTheme)
    documentRoot.style.colorScheme = activeTheme

    return () => {
      if (previousTheme) {
        documentRoot.setAttribute('data-theme', previousTheme)
      } else {
        documentRoot.removeAttribute('data-theme')
      }

      documentRoot.style.colorScheme = previousColorScheme
    }
  }, [activeTheme])

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      if (controlledTheme === undefined) {
        setInternalTheme(nextTheme)
      }

      if (persist && typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(storageKey, nextTheme)
        } catch {
          // Theme tetap berjalan di memory jika storage ditolak.
        }
      }

      onThemeChange?.(nextTheme)
    },
    [controlledTheme, onThemeChange, persist, storageKey],
  )

  const toggleTheme = useCallback(() => {
    setTheme(activeTheme === 'light' ? 'dark' : 'light')
  }, [activeTheme, setTheme])

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme: activeTheme,
      setTheme,
      toggleTheme,
    }),
    [activeTheme, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeContainer theme={activeTheme} className={className}>
        {children}
      </ThemeContainer>
    </ThemeContext.Provider>
  )
}

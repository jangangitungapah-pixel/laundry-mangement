import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { cn } from '@/shared/lib/cn'

export type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

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

const defaultStorageKey = 'laundrykita-theme'
const ThemeContext = createContext<ThemeContextValue | null>(null)

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

function readStoredTheme(storageKey: string): Theme | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedTheme = window.localStorage.getItem(storageKey)
    return isTheme(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

function readSystemTheme(): Theme {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

export function resolveInitialTheme(
  storageKey = defaultStorageKey,
  fallbackTheme?: Theme,
): Theme {
  return readStoredTheme(storageKey) ?? fallbackTheme ?? readSystemTheme()
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
  storageKey = defaultStorageKey,
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
          // Storage dapat ditolak browser; theme aktif tetap berjalan di memory.
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

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme harus digunakan di dalam ThemeProvider')
  }

  return context
}

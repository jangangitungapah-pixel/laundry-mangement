const fs = require('node:fs')
const path = require('node:path')

const root = process.cwd()
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const changedFiles = []

const requiredFiles = [
  'package.json',
  'src/main.tsx',
  'src/styles/tokens.css',
  'src/styles/globals.css',
  'src/app/DesignSystemPreview.tsx',
  'src/shared/ui/app-shell.tsx',
  'src/shared/ui/primitives.tsx',
  'AGENTS.md',
  'README.md',
  'docs/DESIGN_SYSTEM.md',
  'docs/DESIGN_SYSTEM_AUDIT.md',
  'docs/DELIVERY_PLAN.md',
  'docs/OPEN_DECISIONS.md',
]

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(root, relativePath)

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File wajib tidak ditemukan: ${relativePath}`)
  }
}

function normalize(content) {
  return `${content.replace(/\r\n/g, '\n').trimEnd()}\n`
}

function writeFile(relativePath, content) {
  const absolutePath = path.join(root, relativePath)
  const nextContent = normalize(content)
  const previousContent = fs.existsSync(absolutePath)
    ? normalize(fs.readFileSync(absolutePath, 'utf8'))
    : null

  if (previousContent === nextContent) {
    return
  }

  fs.mkdirSync(path.dirname(absolutePath), { recursive: true })

  if (previousContent !== null) {
    fs.copyFileSync(absolutePath, `${absolutePath}.bak-${stamp}`)
  }

  fs.writeFileSync(absolutePath, nextContent, 'utf8')
  changedFiles.push(relativePath)
}

function mutateFile(relativePath, mutate) {
  const absolutePath = path.join(root, relativePath)
  const current = fs.readFileSync(absolutePath, 'utf8')
  const next = mutate(current)

  writeFile(relativePath, next)
}

function replaceAll(content, replacements) {
  let next = content

  for (const [from, to] of replacements) {
    next = next.split(from).join(to)
  }

  return next
}

function lines(values) {
  return values.join('\n')
}

writeFile(
  'src/styles/tokens.css',
  String.raw`
:root,
[data-theme='light'] {
  color-scheme: light;

  --color-background: #f4f8f7;
  --color-surface: #ffffff;
  --color-surface-subtle: #edf4f2;
  --color-surface-raised: #ffffff;
  --color-text: #132522;
  --color-text-muted: #5c6e69;
  --color-border: #cbd9d5;
  --color-border-strong: #90a59f;

  --color-primary: #0f766e;
  --color-primary-hover: #0b625c;
  --color-primary-active: #09534e;
  --color-primary-foreground: #ffffff;

  --color-accent: #ccfbf1;
  --color-accent-strong: #5eead4;

  --color-success: #18794e;
  --color-success-surface: #e7f8ef;
  --color-success-foreground: #ffffff;

  --color-warning: #9a5807;
  --color-warning-surface: #fff5d9;
  --color-warning-foreground: #ffffff;

  --color-danger: #b4232e;
  --color-danger-surface: #fff0f1;
  --color-danger-foreground: #ffffff;

  --color-info: #1e5f91;
  --color-info-surface: #eaf4ff;
  --color-info-foreground: #ffffff;

  --color-overlay: rgb(10 31 27 / 58%);

  --color-navigation: #132522;
  --color-navigation-text: #f8fffd;
  --color-navigation-muted: rgb(248 255 253 / 68%);
  --color-navigation-border: rgb(248 255 253 / 15%);
  --color-navigation-hover: rgb(248 255 253 / 10%);
  --color-navigation-active: #ffffff;
  --color-navigation-active-text: #132522;

  --color-control-thumb: #ffffff;
  --color-decorative-glow: rgb(204 251 241 / 55%);
  --color-surface-translucent: rgb(255 255 255 / 72%);
  --color-subtle-divider: rgb(19 37 34 / 10%);

  --color-print-surface: #ffffff;
  --color-print-text: #000000;
  --color-print-muted: #333333;
  --color-print-border: #000000;

  --shadow-sm: 0 1px 2px rgb(19 37 34 / 8%);
  --shadow-md: 0 10px 30px rgb(19 37 34 / 10%);
  --shadow-lg: 0 24px 60px rgb(19 37 34 / 18%);

  --focus-ring-color: #0d9488;
  --focus-ring: 0 0 0 3px rgb(13 148 136 / 28%);
}

[data-theme='dark'] {
  color-scheme: dark;

  --color-background: #071310;
  --color-surface: #0d1f1b;
  --color-surface-subtle: #132a24;
  --color-surface-raised: #16332c;
  --color-text: #e8f5f1;
  --color-text-muted: #a6bbb5;
  --color-border: #2d4942;
  --color-border-strong: #527068;

  --color-primary: #5eead4;
  --color-primary-hover: #7df2df;
  --color-primary-active: #99f6e4;
  --color-primary-foreground: #062d29;

  --color-accent: #123d36;
  --color-accent-strong: #2dd4bf;

  --color-success: #6ee7a7;
  --color-success-surface: #103225;
  --color-success-foreground: #062016;

  --color-warning: #fbbf5b;
  --color-warning-surface: #3b2a0e;
  --color-warning-foreground: #291803;

  --color-danger: #fb7185;
  --color-danger-surface: #3d1820;
  --color-danger-foreground: #2a0710;

  --color-info: #7dd3fc;
  --color-info-surface: #102e3d;
  --color-info-foreground: #051c27;

  --color-overlay: rgb(0 0 0 / 72%);

  --color-navigation: #06110f;
  --color-navigation-text: #e8f5f1;
  --color-navigation-muted: rgb(232 245 241 / 68%);
  --color-navigation-border: rgb(232 245 241 / 15%);
  --color-navigation-hover: rgb(232 245 241 / 10%);
  --color-navigation-active: #173b34;
  --color-navigation-active-text: #e8f5f1;

  --color-control-thumb: #ecfdf5;
  --color-decorative-glow: rgb(45 212 191 / 16%);
  --color-surface-translucent: rgb(13 31 27 / 82%);
  --color-subtle-divider: rgb(232 245 241 / 10%);

  --color-print-surface: #ffffff;
  --color-print-text: #000000;
  --color-print-muted: #333333;
  --color-print-border: #000000;

  --shadow-sm: 0 1px 2px rgb(0 0 0 / 28%);
  --shadow-md: 0 12px 34px rgb(0 0 0 / 36%);
  --shadow-lg: 0 28px 68px rgb(0 0 0 / 48%);

  --focus-ring-color: #5eead4;
  --focus-ring: 0 0 0 3px rgb(94 234 212 / 30%);
}

:root {
  --font-sans:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;
  --font-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.375rem;
  --font-size-2xl: 1.75rem;
  --font-size-3xl: clamp(2rem, 4vw, 3rem);

  --line-height-tight: 1.15;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1.25rem;
  --radius-full: 999px;

  --layout-reading: 44rem;
  --layout-content: 76rem;
  --layout-wide: 90rem;

  --breakpoint-compact: 22.5rem;
  --breakpoint-tablet: 48rem;
  --breakpoint-desktop: 80rem;

  --z-base: 0;
  --z-sticky: 20;
  --z-dropdown: 40;
  --z-overlay: 50;
  --z-toast: 60;

  --motion-fast: 120ms;
  --motion-normal: 180ms;
  --motion-slow: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --target-min: 2.75rem;
}

@theme inline {
  --color-canvas: var(--color-background);
  --color-panel: var(--color-surface);
  --color-panel-subtle: var(--color-surface-subtle);
  --color-panel-raised: var(--color-surface-raised);
  --color-ink: var(--color-text);
  --color-ink-muted: var(--color-text-muted);
  --color-line: var(--color-border);
  --color-line-strong: var(--color-border-strong);
  --color-brand: var(--color-primary);
  --color-brand-soft: var(--color-accent);
  --color-positive: var(--color-success);
  --color-caution: var(--color-warning);
  --color-critical: var(--color-danger);
  --color-informative: var(--color-info);
  --font-ui: var(--font-sans);
  --font-receipt: var(--font-mono);
}
`,
)

writeFile(
  'src/shared/theme/theme-provider.tsx',
  String.raw`
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

export interface ThemeContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
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
    return (
      controlledTheme ??
      resolveInitialTheme(storageKey, defaultTheme)
    )
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
`,
)

writeFile(
  'src/shared/theme/theme-toggle.tsx',
  String.raw`
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/shared/ui/primitives'
import { cn } from '@/shared/lib/cn'
import { useTheme } from '@/shared/theme/theme-provider'

export interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({
  className,
  showLabel = true,
}: ThemeToggleProps) {
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
`,
)

writeFile(
  'src/shared/theme/index.ts',
  String.raw`
export {
  ThemeContainer,
  ThemeProvider,
  resolveInitialTheme,
  useTheme,
  type Theme,
  type ThemeContainerProps,
  type ThemeProviderProps,
} from './theme-provider'

export { ThemeToggle, type ThemeToggleProps } from './theme-toggle'
`,
)

writeFile(
  'src/shared/theme/theme-provider.test.tsx',
  String.raw`
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import {
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from '@/shared/theme'

function ThemeProbe() {
  const { theme } = useTheme()

  return (
    <>
      <span data-testid="active-theme">{theme}</span>
      <ThemeToggle />
    </>
  )
}

afterEach(() => {
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.style.colorScheme = ''
})

describe('ThemeProvider', () => {
  it('menerapkan theme pada provider container dan document root', () => {
    render(
      <ThemeProvider defaultTheme="dark" persist={false}>
        <ThemeProbe />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('active-theme')).toHaveTextContent('dark')
    expect(
      screen.getByTestId('active-theme').closest('[data-theme-container]'),
    ).toHaveAttribute('data-theme', 'dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('mengganti kulit komponen tanpa mengganti komponen', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider defaultTheme="light" persist={false}>
        <ThemeProbe />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('active-theme')).toHaveTextContent('light')

    await user.click(
      screen.getByRole('button', { name: 'Gunakan tema gelap' }),
    )

    expect(screen.getByTestId('active-theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(
      screen.getByRole('button', { name: 'Gunakan tema terang' }),
    ).toBeEnabled()
  })
})
`,
)

writeFile(
  'src/main.tsx',
  String.raw`
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/app/App'
import { AppProviders } from '@/app/providers'
import { env } from '@/shared/config/env'
import { ThemeProvider } from '@/shared/theme'
import '@/styles/globals.css'

void env

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppProviders>
  </StrictMode>,
)
`,
)

writeFile(
  'src/app/App.test.tsx',
  String.raw`
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '@/app/App'
import { AppProviders } from '@/app/providers'
import { ThemeProvider } from '@/shared/theme'

function renderApp() {
  return render(
    <AppProviders>
      <ThemeProvider defaultTheme="light" persist={false}>
        <App />
      </ThemeProvider>
    </AppProviders>,
  )
}

describe('design system preview', () => {
  it('renders the design system preview without a product route', () => {
    renderApp()

    expect(
      screen.getByRole('heading', {
        name: 'Operasional yang tenang, tindakan yang tegas.',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getAllByText(/demo design system · non-production/i).length,
    ).toBeGreaterThan(0)
  })

  it('runs inside query and theme providers without runtime error', () => {
    renderApp()

    expect(
      screen.getByText('LaundryKita Design System', { exact: true }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Gunakan tema gelap' }),
    ).toBeEnabled()
  })
})
`,
)

mutateFile('src/styles/globals.css', (content) => {
  let next = content

  if (!next.includes('.theme-container {')) {
    next = next.replace(
      'body {\n',
      [
        '.theme-container {',
        '  min-height: 100vh;',
        '  background: var(--color-background);',
        '  color: var(--color-text);',
        '  isolation: isolate;',
        '}',
        '',
        'body {',
        '',
      ].join('\n'),
    )
  }

  next = next.replace(
    'body[data-print-receipt] {\n    background: white;\n  }',
    [
      'body[data-print-receipt] {',
      '    background: var(--color-print-surface);',
      '    color: var(--color-print-text);',
      '  }',
    ].join('\n'),
  )

  next = next.replace(
    'body[data-print-receipt] #root > * {\n    display: none !important;\n  }\n\n  body[data-print-receipt] #root > .receipt-print-portal {\n    display: block !important;\n  }',
    [
      'body[data-print-receipt] #root > .theme-container > * {',
      '    display: none !important;',
      '  }',
      '',
      '  body[data-print-receipt]',
      '    #root',
      '    > .theme-container',
      '    > .receipt-print-portal {',
      '    display: block !important;',
      '  }',
      '',
      '  body[data-print-receipt] .receipt-print-portal {',
      '    --color-surface: var(--color-print-surface);',
      '    --color-surface-subtle: var(--color-print-surface);',
      '    --color-text: var(--color-print-text);',
      '    --color-text-muted: var(--color-print-muted);',
      '    --color-border: var(--color-print-border);',
      '    --color-border-strong: var(--color-print-border);',
      '    --color-primary: var(--color-print-text);',
      '    --color-primary-foreground: var(--color-print-surface);',
      '    color-scheme: light;',
      '    background: var(--color-print-surface);',
      '    color: var(--color-print-text);',
      '  }',
    ].join('\n'),
  )

  return next
})

mutateFile('src/styles/preview.css', (content) => {
  let next = replaceAll(content, [
    ['rgb(204 251 241 / 55%)', 'var(--color-decorative-glow)'],
    ['rgb(255 255 255 / 72%)', 'var(--color-surface-translucent)'],
    ['rgb(19 37 34 / 10%)', 'var(--color-subtle-divider)'],
  ])

  next = next.replace(
    'body[data-print-receipt] #root > .receipt-print-portal {',
    [
      'body[data-print-receipt]',
      '    #root',
      '    > .theme-container',
      '    > .receipt-print-portal {',
    ].join('\n'),
  )

  return next
})

mutateFile('src/app/DesignSystemPreview.tsx', (content) => {
  let next = content

  if (!next.includes("import { ThemeToggle } from '@/shared/theme'")) {
    next = next.replace(
      "} from '@/shared/ui'\nimport '@/styles/preview.css'",
      "} from '@/shared/ui'\nimport { ThemeToggle } from '@/shared/theme'\nimport '@/styles/preview.css'",
    )
  }

  next = next.replace(
    /const colorTokens = \[[\s\S]*?\] as const/,
    String.raw`const colorTokens = [
  ['Background', 'var(--color-background)', '--color-background'],
  ['Surface', 'var(--color-surface)', '--color-surface'],
  ['Subtle', 'var(--color-surface-subtle)', '--color-surface-subtle'],
  ['Text', 'var(--color-text)', '--color-text'],
  ['Muted', 'var(--color-text-muted)', '--color-text-muted'],
  ['Border', 'var(--color-border)', '--color-border'],
  ['Primary', 'var(--color-primary)', '--color-primary'],
  ['Accent', 'var(--color-accent)', '--color-accent'],
  ['Success', 'var(--color-success)', '--color-success'],
  ['Warning', 'var(--color-warning)', '--color-warning'],
  ['Danger', 'var(--color-danger)', '--color-danger'],
  ['Info', 'var(--color-info)', '--color-info'],
] as const`,
  )

  next = replaceAll(next, [
    [
      '<StatusBadge label="Light theme" tone="primary" />',
      '<ThemeToggle />',
    ],
    [
      'bg-ink px-4 py-3 text-sm font-bold text-white',
      'bg-[var(--color-navigation)] px-4 py-3 text-sm font-bold text-[var(--color-navigation-text)]',
    ],
    [
      'rounded-md bg-brand font-black text-white',
      'rounded-md bg-brand font-black text-[var(--color-primary-foreground)]',
    ],
    [
      'rounded-xl bg-ink p-6 text-white md:p-8',
      'rounded-xl bg-[var(--color-navigation)] p-6 text-[var(--color-navigation-text)] md:p-8',
    ],
    [
      'text-xs font-bold tracking-widest text-white/60 uppercase',
      'text-xs font-bold tracking-widest text-[var(--color-navigation-muted)] uppercase',
    ],
    [
      'mb-8 max-w-xl text-base leading-relaxed text-white/70',
      'mb-8 max-w-xl text-base leading-relaxed text-[var(--color-navigation-muted)]',
    ],
    [
      'border-white/35 text-white hover:bg-white/10',
      'border-[var(--color-navigation-border)] text-[var(--color-navigation-text)] hover:bg-[var(--color-navigation-hover)]',
    ],
  ])

  return next
})

mutateFile('src/shared/ui/app-shell.tsx', (content) => {
  return replaceAll(content, [
    [
      'hidden border-r border-line bg-[var(--color-text)] p-4 text-white lg:block',
      'hidden border-r border-line bg-[var(--color-navigation)] p-4 text-[var(--color-navigation-text)] lg:block',
    ],
    [
      'border-b border-white/15',
      'border-b border-[var(--color-navigation-border)]',
    ],
    [
      'text-xs text-white/65',
      'text-xs text-[var(--color-navigation-muted)]',
    ],
    [
      'text-white/72 transition-colors hover:bg-white/10 hover:text-white',
      'text-[var(--color-navigation-muted)] transition-colors hover:bg-[var(--color-navigation-hover)] hover:text-[var(--color-navigation-text)]',
    ],
    [
      "item.active && 'bg-white text-ink hover:bg-white'",
      "item.active && 'bg-[var(--color-navigation-active)] text-[var(--color-navigation-active-text)] hover:bg-[var(--color-navigation-active)]'",
    ],
  ])
})

mutateFile('src/shared/ui/primitives.tsx', (content) => {
  return replaceAll(content, [
    [
      'border-brand bg-brand text-white shadow-sm',
      'border-brand bg-brand text-[var(--color-primary-foreground)] shadow-sm',
    ],
    [
      'border-critical bg-critical text-white shadow-sm',
      'border-critical bg-critical text-[var(--color-danger-foreground)] shadow-sm',
    ],
    [
      'block size-5 rounded-full bg-white shadow-sm',
      'block size-5 rounded-full bg-[var(--color-control-thumb)] shadow-sm',
    ],
  ])
})

mutateFile('AGENTS.md', (content) => {
  if (content.includes('## Aturan UI dan dual theme wajib')) {
    return content
  }

  const themeRules = lines([
    '## Aturan UI dan dual theme wajib',
    '',
    '- Setiap komponen adalah satu implementasi yang memakai semantic CSS token untuk dua palette: `light` dan `dark`.',
    '- Dilarang membuat pasangan komponen seperti `LightButton`/`DarkButton`, menyalin markup berdasarkan theme, atau menaruh business behavior berbeda pada theme.',
    '- Palette hanya didefinisikan dalam `src/styles/tokens.css`. File komponen, feature, dan stylesheet lain tidak boleh memuat hex, RGB, HSL, atau utility warna literal.',
    '- Komponen hanya menggunakan token berdasarkan fungsi seperti background, surface, text, border, primary, success, warning, danger, dan navigation.',
    '- Dilarang memakai utility `dark:` untuk menduplikasi palette pada komponen. Perbedaan kulit harus terjadi karena nilai semantic token berubah.',
    '- Aplikasi wajib berada di dalam `ThemeProvider` dan `ThemeContainer`. Provider menyinkronkan theme ke document root agar portal dialog, drawer, dropdown, dan toast menerima palette yang sama.',
    '- Theme preference boleh disimpan lokal, tetapi data theme bukan bagian dari domain bisnis dan tidak boleh memengaruhi permission atau behavior transaksi.',
    '- Setiap perubahan primitive atau token wajib diuji pada light dan dark untuk 360, 768, dan 1440 px, termasuk focus, overlay portal, state, serta print receipt.',
    '- Print receipt selalu memakai token print hitam-putih dan tidak mengikuti dark palette.',
    '',
  ])

  return content.replace(
    '## Definition of Done',
    `${themeRules}\n## Definition of Done`,
  )
})

mutateFile('README.md', (content) => {
  let next = replaceAll(content, [
    [
      '| Design system | `PASSED` — token, komponen, responsive/accessibility, dan print QA lulus |',
      '| Design system | `READY_FOR_THEME_QA` — dual-theme token/provider sudah diterapkan; menunggu visual QA light dan dark |',
    ],
    [
      '| Frontend Architecture/App Shell | Belum dimulai — gate sudah terbuka |',
      '| Frontend Architecture/App Shell | `BLOCKED` — menunggu revalidasi Design System light dan dark |',
    ],
    [
      'serta design system yang dapat ditinjau melalui `npm run dev`.',
      'serta design system dual-theme yang dapat ditinjau melalui `npm run dev`.',
    ],
  ])

  next = next.replace(
    /Documentation, project foundation, low-fidelity wireframe, dan design system telah `PASSED`\.[\s\S]*?fondasi app shell tervalidasi\./,
    'Documentation, project foundation, dan low-fidelity wireframe telah `PASSED`. Design System dibuka kembali untuk revalidasi dual-theme. Frontend Architecture dan App Shell baru boleh dimulai setelah light/dark visual QA, accessibility, overlay portal, responsive, dan print regression dinyatakan lulus.',
  )

  return next
})

mutateFile('docs/DELIVERY_PLAN.md', (content) => {
  return replaceAll(content, [
    [
      '- **Status gate:** `PASSED` pada 8 Agustus 2026 melalui browser/print QA dan owner-delegated approval.',
      '- **Status gate:** `READY_FOR_THEME_QA`; baseline light telah lulus, kemudian requirement dual-theme membuka revalidasi visual.',
    ],
    [
      '- **Output:** Token semantik, typography, spacing, color, elevation, icon rules, responsive layout, komponen/state inti, preview internal, dan receipt foundation 58/80 mm.',
      '- **Output:** Satu implementasi komponen dengan semantic token, palette light/dark, ThemeProvider/ThemeContainer, responsive layout, preview internal, dan receipt foundation 58/80 mm.',
    ],
    [
      '- **Definition of Done:** Kontras AA, keyboard/focus trap dan return, reduced motion, target 44 px, status non-color-only, density kasir, viewport 360/768/1440, rupiah, Bahasa Indonesia, console/overflow, serta print 58/80 mm tervalidasi; lint/typecheck/test/build/audit dependency lulus.',
      '- **Definition of Done:** Light dan dark lulus kontras AA, keyboard/focus trap dan return, reduced motion, target 44 px, status non-color-only, viewport 360/768/1440, portal overlay, console/overflow, serta print 58/80 mm; lint/typecheck/test/build/audit dependency lulus.',
    ],
    [
      '- **Status gate:** Belum dimulai; dependency design system telah terpenuhi.',
      '- **Status gate:** `BLOCKED`; menunggu revalidasi dual-theme Design System.',
    ],
  ])
})

mutateFile('docs/OPEN_DECISIONS.md', (content) => {
  if (content.includes('| PROC-04 |')) {
    return content
  }

  return content.replace(
    /^\| PROC-03 \|.*$/m,
    (existingRow) =>
      `${existingRow.replace('`APPROVED`', '`SUPERSEDED`')}\n` +
      '| PROC-04 | Seluruh UI memakai satu implementasi komponen dengan dua palette light/dark melalui semantic CSS token, ThemeProvider, dan ThemeContainer. | Menjaga konsistensi behavior sambil memberi dua kulit visual tanpa duplikasi komponen. | Design System dibuka kembali untuk theme QA; app shell menunggu kedua palette lulus responsive, accessibility, portal, dan print regression. | Theme preference configurable per pengguna; kontrak semantic-token tidak configurable. | AGENTS, README, Design System, Design System Audit, Delivery Plan | `APPROVED` |',
  )
})

mutateFile('docs/DESIGN_SYSTEM.md', (content) => {
  let next = content.replace(
    /\| Status gate\s+\| `PASSED`\s+\|/,
    '| Status gate         | `READY_FOR_THEME_QA`                                                 |',
  )

  next = next.replace(
    '- Tema MVP hanya light; dark mode tidak dibuat.',
    '- Tema MVP mendukung light dan dark melalui semantic token yang sama; komponen dan behavior tidak diduplikasi.',
  )

  const sectionStart = next.indexOf('## 2. Fondasi token')
  const typographyStart = next.indexOf('### Tipografi, ruang, dan bentuk')

  if (sectionStart === -1 || typographyStart === -1) {
    throw new Error('Bagian fondasi token DESIGN_SYSTEM.md tidak ditemukan')
  }

  const themeSection = lines([
    '## 2. Fondasi token dan theme',
    '',
    '`src/styles/tokens.css` adalah satu-satunya sumber palette. Komponen hanya membaca semantic custom properties atau pemetaan Tailwind, bukan warna mentah.',
    '',
    '### Arsitektur theme',
    '',
    '- `ThemeProvider` menyimpan theme aktif dan menyediakan `setTheme` serta `toggleTheme`.',
    '- `ThemeContainer` memasang `data-theme="light"` atau `data-theme="dark"` pada boundary aplikasi.',
    '- Provider juga menyinkronkan theme ke document root agar portal Radix menerima palette yang sama.',
    '- Satu komponen tidak boleh bercabang berdasarkan theme untuk menentukan warna; pergantian kulit hanya melalui semantic token.',
    '- Preference dapat disimpan pada `localStorage` dengan fallback ke preferensi sistem.',
    '- Print receipt memakai token print tetap agar hasil thermal tidak berubah ketika aplikasi memakai dark theme.',
    '',
    '### Warna semantik',
    '',
    '| Token | Light | Dark | Pemakaian |',
    '| --- | --- | --- | --- |',
    '| `background` | `#f4f8f7` | `#071310` | Latar aplikasi |',
    '| `surface` | `#ffffff` | `#0d1f1b` | Panel dan dialog |',
    '| `surface-subtle` | `#edf4f2` | `#132a24` | Konten sekunder |',
    '| `text` | `#132522` | `#e8f5f1` | Teks utama |',
    '| `muted` | `#5c6e69` | `#a6bbb5` | Teks penjelas |',
    '| `border` | `#cbd9d5` | `#2d4942` | Pemisah dan kontrol |',
    '| `primary` | `#0f766e` | `#5eead4` | Aksi utama dan focus |',
    '| `accent` | `#ccfbf1` | `#123d36` | Penanda pilihan |',
    '| `success` | `#18794e` | `#6ee7a7` | Hasil berhasil |',
    '| `warning` | `#9a5807` | `#fbbf5b` | Perhatian |',
    '| `danger` | `#b4232e` | `#fb7185` | Risiko/destructive |',
    '| `info` | `#1e5f91` | `#7dd3fc` | Informasi netral |',
    '',
    'Nilai palette hanya boleh muncul dalam `tokens.css`. Perubahan palette wajib mengukur ulang kontras kedua theme.',
    '',
  ])

  next =
    next.slice(0, sectionStart) +
    `${themeSection}\n` +
    next.slice(typographyStart)

  next = next.replace(
    '| Tailwind CSS v4 + Vite plugin             | Utility compiler di atas token semantik | Bukan sumber token dan tidak boleh menghasilkan theme paralel      |',
    '| Tailwind CSS v4 + Vite plugin             | Utility compiler di atas token semantik | Light/dark hanya mengganti token; utility komponen tetap sama       |',
  )

  if (!next.includes('**Kontrak dual-theme wajib:**')) {
    next = next.replace(
      '## 5. Aturan penggunaan\n\n',
      '## 5. Aturan penggunaan\n\n**Kontrak dual-theme wajib:** satu komponen, satu markup, satu behavior, dan dua palette melalui semantic token. Tidak boleh ada komponen light/dark terpisah atau warna mentah di consumer.\n\n',
    )
  }

  next = next.replace(
    'Perubahan visual juga memerlukan QA representatif pada 1440 × 900, 768 × 1024, dan 360 × 800, keyboard/focus smoke test, serta print QA 58/80 mm.',
    'Perubahan visual memerlukan QA light dan dark pada 1440 × 900, 768 × 1024, dan 360 × 800, keyboard/focus, portal overlay, serta print QA 58/80 mm.',
  )

  return next
})

mutateFile('docs/DESIGN_SYSTEM_AUDIT.md', (content) => {
  let next = content.replace(
    /\| Hasil akhir\s+\| `PASSED`\s+\|/,
    '| Hasil akhir | `READY_FOR_THEME_QA` — baseline light lulus; dark perlu revalidasi |',
  )

  if (!next.includes('## Addendum dual-theme')) {
    const addendum = lines([
      '## Addendum dual-theme',
      '',
      'Requirement UI berubah setelah audit baseline: seluruh komponen sekarang wajib mendukung light dan dark melalui semantic token serta ThemeProvider/ThemeContainer.',
      '',
      '- Audit baseline light tetap menjadi bukti historis.',
      '- Implementasi tidak membuat komponen dark terpisah.',
      '- App shell diblokir sampai kedua palette lulus visual QA.',
      '- Revalidasi wajib mencakup 360/768/1440 px, contrast, focus, dialog/drawer/dropdown portal, console/overflow, serta print 58/80 mm.',
      '',
    ])

    next = next.replace(
      '## Coverage implementasi',
      `${addendum}\n## Coverage implementasi`,
    )
  }

  next = next.replace(
    'Design System `PASSED`. Gate **Frontend Architecture dan App Shell** terbuka; implementasi feature/vertical slice tetap menunggu app-shell foundation dan wajib mengikuti sumber kanonis tanpa menyalin business logic ke primitive UI.',
    'Baseline light Design System telah lulus, tetapi gate keseluruhan sekarang `READY_FOR_THEME_QA`. Frontend Architecture dan App Shell tetap tertutup sampai light/dark revalidation selesai tanpa blocker.',
  )

  return next
})

function collectSourceFiles(directory) {
  const result = []

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      result.push(...collectSourceFiles(absolutePath))
      continue
    }

    if (/\.(?:ts|tsx|css)$/.test(entry.name)) {
      result.push(absolutePath)
    }
  }

  return result
}

const tokenFile = path.join(root, 'src/styles/tokens.css')
const forbiddenPatterns = [
  {
    name: 'hex color',
    pattern: /#[0-9a-f]{3,8}\b/i,
  },
  {
    name: 'rgb/hsl color',
    pattern: /\b(?:rgb|rgba|hsl|hsla)\(/i,
  },
  {
    name: 'literal white/black CSS value',
    pattern: /:\s*(?:white|black)\b/i,
  },
  {
    name: 'literal Tailwind palette',
    pattern:
      /\b(?:text|bg|border|ring|outline)-(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:\b|-\d+)/i,
  },
]

const violations = []

for (const absolutePath of collectSourceFiles(path.join(root, 'src'))) {
  if (absolutePath === tokenFile) {
    continue
  }

  const relativePath = path.relative(root, absolutePath)
  const source = fs.readFileSync(absolutePath, 'utf8')
  const sourceLines = source.split(/\r?\n/)

  sourceLines.forEach((sourceLine, index) => {
    for (const forbidden of forbiddenPatterns) {
      if (forbidden.pattern.test(sourceLine)) {
        violations.push(
          `${relativePath}:${index + 1} ${forbidden.name}: ${sourceLine.trim()}`,
        )
      }
    }
  })
}

if (violations.length > 0) {
  throw new Error(
    `Masih ditemukan warna yang melewati token:\n${violations.join('\n')}`,
  )
}

const designSystemDocument = fs.readFileSync(
  path.join(root, 'docs/DESIGN_SYSTEM.md'),
  'utf8',
)

if (designSystemDocument.includes('Tema MVP hanya light')) {
  throw new Error('Dokumentasi light-only masih tersisa')
}

if (
  !fs
    .readFileSync(path.join(root, 'src/main.tsx'), 'utf8')
    .includes('<ThemeProvider>')
) {
  throw new Error('ThemeProvider belum terpasang pada application root')
}

if (changedFiles.length === 0) {
  console.log('Dual-theme system sudah terpasang. Tidak ada perubahan.')
} else {
  console.log('Dual-theme system berhasil diterapkan:')
  for (const relativePath of changedFiles) {
    console.log(`- ${relativePath}`)
  }
}

console.log('')
console.log('Status berikutnya: READY_FOR_THEME_QA')
console.log('Frontend App Shell tetap BLOCKED sampai visual QA light/dark lulus.')
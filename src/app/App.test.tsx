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

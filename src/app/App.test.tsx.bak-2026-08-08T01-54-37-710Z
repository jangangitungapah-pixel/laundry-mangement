import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '@/app/App'
import { AppProviders } from '@/app/providers'

describe('design system preview', () => {
  it('renders the design system preview without a product route', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'Operasional yang tenang, tindakan yang tegas.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(/demo design system · non-production/i).length,
    ).toBeGreaterThan(0)
  })

  it('runs inside the query provider without a runtime error', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    )

    expect(
      screen.getByText('LaundryKita Design System', { exact: true }),
    ).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '@/app/App'
import { AppProviders } from '@/app/providers'

describe('project foundation', () => {
  it('renders the neutral foundation message', () => {
    render(<App />)

    expect(
      screen.getByText('LaundryKita project foundation ready'),
    ).toBeInTheDocument()
  })

  it('runs the query provider without a runtime error', () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    )

    expect(
      screen.getByText('LaundryKita project foundation ready'),
    ).toBeInTheDocument()
  })
})

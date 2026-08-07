import { render, screen } from '@testing-library/react'
import { createMemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { App } from '@/app/App'
import { AppProviders } from '@/app/providers'
import { appRoutes } from '@/app/router'

describe('project foundation', () => {
  it('renders the neutral foundation message', () => {
    render(<App />)

    expect(
      screen.getByText('LaundryKita project foundation ready'),
    ).toBeInTheDocument()
  })

  it('runs the router and providers without a runtime error', () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] })

    render(<AppProviders router={router} />)

    expect(
      screen.getByText('LaundryKita project foundation ready'),
    ).toBeInTheDocument()
  })
})

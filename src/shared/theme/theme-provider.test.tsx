import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { ThemeProvider, ThemeToggle, useTheme } from '@/shared/theme'

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

    await user.click(screen.getByRole('button', { name: 'Gunakan tema gelap' }))

    expect(screen.getByTestId('active-theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(
      screen.getByRole('button', { name: 'Gunakan tema terang' }),
    ).toBeEnabled()
  })
})

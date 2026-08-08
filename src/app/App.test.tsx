import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { App } from '@/app/App'
import { AppProviders } from '@/app/providers'
import { ThemeProvider } from '@/shared/theme'

function renderApp(pathname: string) {
  window.history.replaceState({}, '', pathname)

  return render(
    <AppProviders>
      <ThemeProvider defaultTheme="light" persist={false}>
        <App />
      </ThemeProvider>
    </AppProviders>,
  )
}

beforeEach(() => {
  window.history.replaceState({}, '', '/')
})

describe('application routing', () => {
  it('merender public shell pada route beranda', () => {
    renderApp('/')

    expect(
      screen.getByRole('heading', {
        name: 'Operasional laundry yang lebih tertata',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('navigation', {
        name: 'Navigasi publik',
      }),
    ).toBeInTheDocument()
  })

  it('merender tenant shell dan konteks tenant dari route', () => {
    renderApp('/app/demo-laundry/dashboard')

    expect(
      screen.getByRole('heading', {
        name: 'Dashboard',
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/demo-laundry · Outlet Utama/i)).toBeInTheDocument()

    expect(
      screen.getByRole('navigation', {
        name: 'Navigasi Tenant application',
      }),
    ).toBeInTheDocument()
  })

  it('menampilkan not-found untuk route di luar Screen Map', () => {
    renderApp('/route-yang-tidak-ada')

    expect(
      screen.getByText('Halaman tidak ditemukan', {
        exact: true,
      }),
    ).toBeInTheDocument()
  })
})

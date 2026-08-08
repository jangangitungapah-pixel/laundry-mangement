import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { PublicShell } from '@/app/shells'
import { ErrorState, LinkButton } from '@/shared/ui'

function errorDescription(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return (
      'Route gagal dimuat dengan status ' +
      error.status +
      '. Silakan kembali atau coba lagi.'
    )
  }

  return 'Terjadi kesalahan antarmuka yang tidak terduga. Tidak ada data transaksi yang diubah.'
}

export function RouteErrorPage() {
  const error = useRouteError()

  return (
    <PublicShell>
      <ErrorState
        title="Halaman tidak dapat dimuat"
        description={errorDescription(error)}
        action={<LinkButton href="/">Kembali ke beranda</LinkButton>}
      />
    </PublicShell>
  )
}

export function NotFoundPage() {
  return (
    <PublicShell>
      <ErrorState
        title="Halaman tidak ditemukan"
        description="Alamat tidak terdaftar dalam Screen Map LaundryKita."
        action={<LinkButton href="/">Kembali ke beranda</LinkButton>}
      />
    </PublicShell>
  )
}

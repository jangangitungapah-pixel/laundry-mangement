import { QueryClientProvider } from '@tanstack/react-query'
import { useState, type ComponentProps } from 'react'
import { RouterProvider } from 'react-router-dom'

import { createQueryClient } from '@/shared/lib/query-client'

import { appRouter } from './router'

type AppRouter = ComponentProps<typeof RouterProvider>['router']

type AppProvidersProps = {
  router?: AppRouter
}

export function AppProviders({ router = appRouter }: AppProvidersProps) {
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

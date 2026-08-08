import { lazy, Suspense, useMemo } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom'

import { ArchitectureRoute } from '@/app/routing/architecture-route'
import { appRouteRegistry } from '@/app/routing/route-registry'
import { NotFoundPage, RouteErrorPage } from '@/app/routing/route-error-page'
import { LoadingState } from '@/shared/ui'

const DesignSystemPreview = lazy(() =>
  import('@/app/DesignSystemPreview').then((module) => ({
    default: module.DesignSystemPreview,
  })),
)

function createAppRouter() {
  const routes: RouteObject[] = appRouteRegistry.map((route) => ({
    path: route.path,
    element: <ArchitectureRoute route={route} />,
    errorElement: <RouteErrorPage />,
  }))

  if (import.meta.env.DEV) {
    routes.push({
      path: '/__design-system',
      element: (
        <Suspense fallback={<LoadingState label="Memuat design system" />}>
          <DesignSystemPreview />
        </Suspense>
      ),
      errorElement: <RouteErrorPage />,
    })
  }

  routes.push({
    path: '*',
    element: <NotFoundPage />,
  })

  return createBrowserRouter(routes)
}

export function AppRouter() {
  const router = useMemo(() => createAppRouter(), [])

  return <RouterProvider router={router} />
}

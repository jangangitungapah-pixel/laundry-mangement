import { createBrowserRouter } from 'react-router-dom'

import { App } from '@/app/App'

export const appRoutes = [
  {
    path: '/',
    element: <App />,
  },
]

export const appRouter = createBrowserRouter(appRoutes)

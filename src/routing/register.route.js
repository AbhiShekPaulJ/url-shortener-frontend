import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './routeTree'
import AuthPage from '../pages/AuthPage'

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: AuthPage,
})
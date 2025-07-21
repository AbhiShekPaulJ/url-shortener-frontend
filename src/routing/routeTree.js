import { createRootRoute } from "@tanstack/react-router"
import { homePageRoute } from "./homepage"
import { authRoute } from "./auth.route"
import { dashboardRoute } from "./dashboard"
import RootLayout from "../RootLayout"
import { registerRoute } from "./register.route"

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dashboardRoute,
    registerRoute
])


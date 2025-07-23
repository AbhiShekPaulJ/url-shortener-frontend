// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { RouterProvider, createRouter } from '@tanstack/react-router'
// import { routeTree } from './routing/routeTree.js'
// import store from './store/store.js'
// import { Provider } from 'react-redux'

// export const queryClient = new QueryClient()
// const router = createRouter({
//   routeTree,
//   context:{
//     queryClient,
//     store
//   }
// })

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   </Provider>
// )


// src/main.jsx

import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routing/routeTree.js'
import store from './store/store.js'
import { Provider } from 'react-redux'

// 1. Define an auth object for the router's context
// This will hold the authentication state that the router can directly access.
const auth = {
  isAuthenticated: store.getState().auth.status === 'authenticated', // Initial state
  user: store.getState().auth.userData || null, // Initial user data
}

export const queryClient = new QueryClient()

// 2. Create the router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    // Pass the dedicated auth object, NOT the entire store
    auth,
  },
})

// 3. Subscribe to the Redux store to keep the router's context in sync
let lastAuthStatus = auth.isAuthenticated;

store.subscribe(() => {
  const currentState = store.getState();
  const newAuthStatus = currentState.auth.status === 'authenticated';

  // Check if the authentication status has actually changed
  if (lastAuthStatus !== newAuthStatus) {
    lastAuthStatus = newAuthStatus;
    
    // Update the router's context with the new auth state
    router.options.context.auth = {
      isAuthenticated: newAuthStatus,
      user: currentState.auth.userData || null,
    };

    // IMPORTANT: Invalidate the router to re-evaluate routes and loaders
    // This tells the router to re-check `beforeLoad` on the current route.
    router.invalidate();
  }
});


// 4. Render the app
createRoot(document.getElementById('root')).render(
  // The Redux Provider is still needed for your React components (useSelector)
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
)

// Declare the module to add the 'auth' property to the router context
// This is for TypeScript support and autocompletion. Create a file like `vite-env.d.ts` or `tanstack-router.d.ts`
/*
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
*/

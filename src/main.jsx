import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from '@/store'
import router from '@/router.jsx'
import AuthService from '@/services/AuthService.js';
import CsrfService from '@/services/CsrfService.js';
import { setUser } from '@/store/auth.js';
import client from '@/services/client.js';
import '@/assets/css/index.css'

const authService = new AuthService()

const csrfService = new CsrfService()

try {
  const [csrfTokenResult, userResult] = await Promise.allSettled([
    csrfService.getCsrfToken(),
    authService.getUser()
  ])

  if (csrfTokenResult.status === 'fulfilled') {
    client.defaults.headers.common['x-csrf-token'] = csrfTokenResult.value.csrfToken
  }

  if (userResult.status === 'fulfilled') {
    store.dispatch(setUser(userResult.value))
  }
} catch {
  // no-op
} finally {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>
  )
}

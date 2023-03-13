import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from './store'
import router from './router.jsx'
import AuthService from './services/AuthService.js';
import { setUser } from './store/auth.js';
import './assets/css/index.css'

const authService = new AuthService()

try {
  const user = await authService.getUser()

  store.dispatch(setUser(user))
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

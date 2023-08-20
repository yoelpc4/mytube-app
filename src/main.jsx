import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from '@/store'
import router from '@/router.jsx'
import { setUser } from '@/store/auth.js'
import client from '@/utils/client.js'
import '@/assets/css/index.css'

try {
  const {csrfToken} = await client.get('csrf-token').then(({data}) => data)

  client.defaults.headers.common['x-csrf-token'] = csrfToken

  const user = await client.get('auth/user').then(({data}) => data)

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

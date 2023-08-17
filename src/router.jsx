import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import Auth from '@/middlewares/Auth.jsx'
import Guest from '@/middlewares/Guest.jsx'
import Primary from '@/layouts/Primary.jsx'
import Secondary from '@/layouts/Secondary.jsx'
import Channel from '@/pages/Channel.jsx'
import Watch from '@/pages/Watch.jsx'
import History from '@/pages/History.jsx'
import Login from '@/pages/Login.jsx'
import Home from '@/pages/Home.jsx'
import Register from '@/pages/Register.jsx'
import Account from '@/pages/Account.jsx'
import EditProfile from '@/pages/EditProfile.jsx'
import EditPassword from '@/pages/EditPassword.jsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        element: <Guest/>,
        children: [
          {
            element: <Secondary/>,
            children: [
              {
                path: '/register',
                element: <Register/>,
              },
              {
                path: '/login',
                element: <Login/>,
              },
            ],
          },
        ],
      },
      {
        element: <Primary/>,
        children: [
          {
            element: <Auth/>,
            children: [
              {
                path: '/history',
                element: <History/>,
              },
              {
                path: '/account',
                element: <Account/>,
                children: [
                  {
                    path: '',
                    element: <EditProfile />,
                  },
                  {
                    path: 'password',
                    element: <EditPassword />,
                  },
                ],
              },
            ],
          },
          {
            path: '/',
            element: <Home/>,
          },
          {
            path: '/watch/:contentId',
            element: <Watch/>,
          },
          {
            path: '/channel/:username',
            element: <Channel/>,
          },
        ],
      },
    ],
  }
])

export default router

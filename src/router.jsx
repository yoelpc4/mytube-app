import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import Auth from '@/middlewares/Auth.jsx'
import Primary from '@/layouts/Primary.jsx'
import Secondary from '@/layouts/Secondary.jsx'
import Channel from '@/pages/Channel.jsx'
import Watch from '@/pages/Watch.jsx'
import History from '@/pages/History.jsx'
import Login from '@/pages/Login.jsx'
import Home from '@/pages/Home.jsx'
import Register from '@/pages/Register.jsx'
import UpdatePassword from '@/pages/UpdatePassword.jsx'
import ForgotPassword from '@/pages/ForgotPassword.jsx';
import ResetPassword from '@/pages/ResetPassword.jsx';
import NotFound from '@/pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    element: <App/>,
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
          {
            path: '/forgot-password',
            element: <ForgotPassword/>,
          },
          {
            path: '/reset-password',
            element: <ResetPassword/>,
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
                path: 'update-password',
                element: <UpdatePassword/>,
              },
            ],
          },
          {
            index: true,
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
          {
            path: '*',
            element: <NotFound/>,
          },
        ],
      },
    ],
  }
])

export default router

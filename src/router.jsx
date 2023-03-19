import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Guest from './middlewares/Guest.jsx';
import Primary from './layouts/Primary.jsx';
import Secondary from './layouts/Secondary.jsx';
import Content from './pages/Content.jsx';
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx';

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
            path: '/',
            element: <Home/>,
          },
          {
            path: '/contents/:contentId',
            element: <Content/>,
          },
        ],
      },
    ],
  }
])

export default router

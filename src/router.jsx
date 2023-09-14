import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App.jsx'
import LoadingIndicator from '@/components/LoadingIndicator.jsx';

const lazyLoad = factory => {
  const LazyExoticComponent = lazy(factory)

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <LazyExoticComponent/>
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: lazyLoad(() => import('@/layouts/Secondary.jsx')),
        children: [
          {
            path: '/register',
            element: lazyLoad(() => import('@/pages/Register.jsx')),
          },
          {
            path: '/login',
            element: lazyLoad(() => import('@/pages/Login.jsx')),
          },
          {
            path: '/forgot-password',
            element: lazyLoad(() => import('@/pages/ForgotPassword.jsx')),
          },
          {
            path: '/reset-password',
            element: lazyLoad(() => import('@/pages/ResetPassword.jsx')),
          },
        ],
      },
      {
        element: lazyLoad(() => import('@/layouts/Primary.jsx')),
        children: [
          {
            element: lazyLoad(() => import('@/middlewares/Auth.jsx')),
            children: [
              {
                path: '/history',
                element: lazyLoad(() => import('@/pages/History.jsx')),
              },
              {
                path: 'update-password',
                element: lazyLoad(() => import('@/pages/UpdatePassword.jsx')),
              },
            ],
          },
          {
            index: true,
            element: lazyLoad(() => import('@/pages/Home.jsx')),
          },
          {
            path: '/watch/:contentId',
            element: lazyLoad(() => import('@/pages/Watch.jsx')),
          },
          {
            path: '/channel/:username',
            element: lazyLoad(() => import('@/pages/Channel.jsx')),
          },
          {
            path: '*',
            element: lazyLoad(() => import('@/pages/NotFound.jsx')),
          },
        ],
      },
    ],
  }
])

export default router

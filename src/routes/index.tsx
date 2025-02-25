import MainLayout from '@/layouts/MainLayout'
import Register from '@/pages/Auth/Register'
import ErrorPage from '@/pages/ErrorPage'
import Home from '@/pages/Home'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
])

export default router

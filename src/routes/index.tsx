import MainLayout from '@/layouts/MainLayout'
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
    ],
  },
])

export default router

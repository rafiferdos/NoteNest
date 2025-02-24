import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
])

export default router

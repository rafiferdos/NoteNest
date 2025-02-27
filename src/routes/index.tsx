import MainLayout from '@/layouts/MainLayout'
import About from '@/pages/About'
import AllProducts from '@/pages/AllProducts'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import ErrorPage from '@/pages/ErrorPage'
import Home from '@/pages/Home'
import ProductDetails from '@/pages/ProductDetails'

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
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/products',
        element: <AllProducts />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
    ],
  },
])

export default router

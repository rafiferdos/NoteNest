import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='container mx-auto max-w-7xl md:w-10/12 w-11/12'>
      <Navbar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

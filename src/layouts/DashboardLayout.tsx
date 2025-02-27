import { logout, useCurrentUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/hooks'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useSelector } from 'react-redux'
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout() {
  const user = useSelector(useCurrentUser)
  const dispatch = useAppDispatch()

  // Redirect non-admin users
  useEffect(() => {
    if (user?.role !== 'admin') {
      dispatch(logout())
    }
  }, [user, dispatch])

  if (user?.role !== 'admin') {
    return <Navigate to='/login' replace />
  }

  return (
    <SidebarProvider defaultOpen>
      <div className='flex h-screen'>
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main content */}
        <div className='flex-1 overflow-auto'>
          <div className='container mx-auto px-4 py-6'>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

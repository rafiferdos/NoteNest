import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { ModeToggle } from '../icons/ModeToggle'
import { Link, useLocation } from 'react-router-dom'
import { LogOut, Package, ShoppingBag, Users, Home } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/auth/authSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

export default function DashboardSidebar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar className='border-r'>
        <SidebarHeader>
          <div className='flex items-center justify-between px-4 py-2'>
            <Link to='/' className='flex items-center gap-2 font-medium'>
              <h1 className='text-xl font-bold'>NoteNest</h1>
            </Link>
            <ModeToggle />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to='/dashboard'>
                <SidebarMenuButton
                  isActive={location.pathname === '/dashboard'}
                  tooltip='Dashboard'
                >
                  <Home className='h-4 w-4' />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to='/dashboard/products'>
                <SidebarMenuButton
                  isActive={location.pathname.includes('/dashboard/products')}
                  tooltip='Products'
                >
                  <Package className='h-4 w-4' />
                  <span>Products</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to='/dashboard/orders'>
                <SidebarMenuButton
                  isActive={location.pathname.includes('/dashboard/orders')}
                  tooltip='Orders'
                >
                  <ShoppingBag className='h-4 w-4' />
                  <span>Orders</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to='/dashboard/users'>
                <SidebarMenuButton
                  isActive={location.pathname.includes('/dashboard/users')}
                  tooltip='Users'
                >
                  <Users className='h-4 w-4' />
                  <span>Users</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarSeparator />
          <div className='p-4'>
            <Button
              variant='destructive'
              className='w-full'
              onClick={handleLogout}
            >
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

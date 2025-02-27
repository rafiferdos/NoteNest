import { useCurrentUser } from '@/redux/auth/authSlice'
import { useSelector } from 'react-redux'

export default function DashboardHome() {
  const user = useSelector(useCurrentUser)

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
      <div className='bg-card p-6 rounded-lg shadow-sm'>
        <h2 className='text-xl font-medium mb-4'>Welcome, {user?.name}</h2>
        <p className='text-muted-foreground'>
          From here, you can manage products, view orders, and manage user
          accounts. Use the sidebar navigation to access different sections of
          the dashboard.
        </p>
      </div>
    </div>
  )
}

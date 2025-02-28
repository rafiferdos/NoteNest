import { Button } from '@/components/ui/button'
import {
  useDeactiveAccountMutation,
  useGetAllUserDataQuery,
} from '@/redux/Features/userManagement/userManagement.api'
import { TUser } from '@/types/auth.type'
import { UserCheck, UserX } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ManageUsers() {
  const { data: response, isLoading } = useGetAllUserDataQuery(undefined)
  const [deactivateUser, { isLoading: isDeactivating }] =
    useDeactiveAccountMutation()

  const users = response?.data || []

  const handleDeactivate = async (userId: string) => {
    try {
      await deactivateUser(userId).unwrap()
      toast.success('User account deactivated')
    } catch (error: unknown) {
      console.error(error)
      toast.error('Failed to deactivate user')

      // More detailed error message
      if (typeof error === 'object' && error !== null && 'status' in error) {
        if (error.status === 401) {
          toast.error('Not authorized. Please log in again as admin.')
        }
      }

      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = error.data as { message?: string }
        toast.error(
          `Failed to deactivate user: ${errorData?.message || 'Unknown error'}`
        )
      }
    }
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Manage Users</h1>

      {isLoading ? (
        <div className='text-center py-8'>Loading users...</div>
      ) : (
        <div className='bg-card rounded-lg shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-muted/50'>
                <tr>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Name
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Email
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Role
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Status
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {users.map((user: TUser) => (
                  <tr key={user._id} className='hover:bg-muted/50'>
                    <td className='px-4 py-3 font-medium'>{user.name}</td>
                    <td className='px-4 py-3 text-muted-foreground'>
                      {user.email}
                    </td>
                    <td className='px-4 py-3'>
                      <span className='capitalize'>{user.role}</span>
                    </td>
                    <td className='px-4 py-3'>
                      {user.isActive ? (
                        <span className='flex items-center text-green-600'>
                          <UserCheck className='h-4 w-4 mr-1' /> Active
                        </span>
                      ) : (
                        <span className='flex items-center text-destructive'>
                          <UserX className='h-4 w-4 mr-1' /> Inactive
                        </span>
                      )}
                    </td>
                    <td className='px-4 py-3'>
                      <Button
                        variant='destructive'
                        size='sm'
                        disabled={!user.isActive || isDeactivating}
                        onClick={() => handleDeactivate(user._id)}
                      >
                        Deactivate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

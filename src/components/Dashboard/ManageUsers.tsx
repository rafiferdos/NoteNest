import { Button } from '@/components/ui/button'
import {
  useDeactiveAccountMutation,
  useGetAllUserDataQuery,
} from '@/redux/Features/userManagement/userManagement.api'
import { TUser } from '@/types/auth.type'
import { UserCheck, UserX } from 'lucide-react'
import toast from 'react-hot-toast'
import { TextShimmer } from '../ui/text-shimmer'
import { motion } from 'motion/react'
import { Badge } from '../ui/badge'

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
        <div className='text-center py-16'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TextShimmer duration={0.7} className='text-xl'>
              Loading users...
            </TextShimmer>
          </motion.div>
        </div>
      ) : (
        <>
          <div className='bg-card rounded-lg shadow-sm border overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-muted/40'>
                  <tr>
                    <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                      Name
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                      Email
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                      Role
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                      Status
                    </th>
                    <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border'>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className='px-6 py-8 text-center text-muted-foreground'
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user: TUser) => (
                      <motion.tr
                        key={user._id}
                        className='hover:bg-muted/30 transition-colors'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='font-medium'>{user.name}</div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-muted-foreground'>
                          {user.email}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Badge
                            variant={
                              user.role === 'admin' ? 'default' : 'outline'
                            }
                            className='capitalize'
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          {user.isActive ? (
                            <Badge
                              variant='default'
                              className='flex items-center gap-1'
                            >
                              <UserCheck className='h-3 w-3' /> Active
                            </Badge>
                          ) : (
                            <Badge
                              variant='destructive'
                              className='flex items-center gap-1'
                            >
                              <UserX className='h-3 w-3' /> Inactive
                            </Badge>
                          )}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <Button
                            variant='destructive'
                            size='sm'
                            disabled={!user.isActive || isDeactivating}
                            onClick={() => handleDeactivate(user._id)}
                            className='transition-all hover:shadow-md'
                          >
                            Deactivate
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className='p-4 border-t bg-muted/20 text-sm text-muted-foreground'>
              Total users: {users.length}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

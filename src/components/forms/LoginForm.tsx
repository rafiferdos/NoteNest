'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '@/redux/auth/authApi'
import { setCredentials } from '@/redux/auth/authSlice'
import { TUser } from '@/types/auth.type'
import { verifyToken } from '@/utils/verifyToken'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export default function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  // const onFinish = async (data: { email: string; password: string }) => {
  //   try {
  //     console.log(data);
  //     const response = await login(data)
  //     if (response?.data?.success === true) {
  //       const user = verifyToken(response?.data?.data?.accessToken) as TUser
  //       // Log user data to console
  //       console.log('User data after login:', {
  //         user,
  //         token: response?.data?.data?.accessToken,
  //         fullResponse: response.data,
  //       })
  //       toast.success(response?.data?.message)
  //       dispatch(
  //         setCredentials({
  //           user: user,
  //           token: response?.data?.data?.accessToken,
  //         })
  //       )
  //       navigate('/')
  //     } else if (response?.error?.data?.success === false) {
  //       toast.error(response?.error?.data?.message)
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     toast.error('Invalid credentials', error)
  //   }
  // }

  const onFinish = async (data: { email: string; password: string }) => {
    try {
      console.log('Login attempt with:', data)

      // Use unwrap() to get the actual response data or throw an error
      const result = await login(data).unwrap()

      console.log('Login API successful response:', result)

      // Log the entire response structure to help debugging
      console.log('Full response structure:', result)

      // Try to find the access token in different possible locations
      let accessToken: string | undefined

      // Check for common token locations in API responses
      if (result.data?.accessToken) {
        accessToken = result.data.accessToken
      } else if (result.accessToken) {
        accessToken = result.accessToken
      } else if (typeof result === 'string') {
        accessToken = result
      } else if (typeof result.data === 'string') {
        accessToken = result.data
      }

      console.log('Access token extracted:', accessToken)
      console.log('Access token type:', typeof accessToken)

      if (!accessToken || typeof accessToken !== 'string') {
        console.error('Invalid token format received from server')
        toast.error('Authentication error: Invalid token format')
        return
      }

      try {
        const user = verifyToken(accessToken) as TUser

        // Log user data to console
        console.log('User data after login:', {
          user,
          token: accessToken,
          fullResponse: result,
        })

        toast.success(result.message || 'Login successful')
        dispatch(
          setCredentials({
            user: user,
            token: accessToken,
          })
        )
        navigate('/')
      } catch (tokenError) {
        console.error('Token verification error:', tokenError)
        toast.error('Authentication error: Could not verify token')
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login error details:', error)

      // Handle specific API error responses
      if (error.status === 401) {
        toast.error('Invalid email or password')
      } else if (error.status === 404) {
        toast.error('API endpoint not found')
      } else if (error.data?.message) {
        toast.error(error.data.message)
      } else {
        toast.error('Failed to login. Please try again.')
      }
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFinish)}
        className='space-y-8 max-w-3xl mx-auto py-10'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter Your Email' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Enter your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-center'>
          <Link to='/register'>
            <Button variant='link'>Don't have an account? Sign Up</Button>
          </Link>
        </div>

        <div className='flex justify-center'>
          <Button type='submit' size='lg' disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

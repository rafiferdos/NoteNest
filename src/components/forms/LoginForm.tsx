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

const formSchema = z.object({
  name_4291970954: z.string(),
  name_6381876849: z.string(),
})

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values)
      toast.success('Form submitted successfully!')
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 max-w-3xl mx-auto py-10'
      >
        <FormField
          control={form.control}
          name='name_4291970954'
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
          name='name_6381876849'
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
          <Button type='submit' size='lg'>
            Submit
          </Button>
        </div>
        
      </form>
    </Form>
  )
}

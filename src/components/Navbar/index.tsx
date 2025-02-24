// src/components/Navbar/index.tsx
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import MenuIcon from '../icons/MenuIcon'
import MountainIcon from '../icons/MountainIcon'

export default function Navbar() {
  return (
    <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6'>
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='lg:hidden'>
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <Link to='/' className='mr-6 hidden lg:flex'>
            <MountainIcon className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          {/* Mobile Menu Links */}
          <div className='grid gap-2 py-6'>
            <Link
              to='/products'
              className='flex w-full items-center py-2 text-lg font-semibold'
            >
              Products
            </Link>
            <Link
              to='/about'
              className='flex w-full items-center py-2 text-lg font-semibold'
            >
              About Us
            </Link>
            {/* <Link
              href='/cart'
              className='flex w-full items-center py-2 text-lg font-semibold'
              prefetch={false}
            >
              Cart ({cartItemQuantity})
            </Link> */}
            {/* Add more links */}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Links */}
      <Link to='/' className='mr-6 hidden lg:flex'>
        <MountainIcon className='h-6 w-6' />
        <span className='sr-only'>Acme Inc</span>
      </Link>
      <nav className='ml-auto hidden lg:flex gap-6'>
        <Link to='/' className='...'>
          Home
        </Link>
        <Link to='/products' className='...'>
          Products
        </Link>
        <Link to='/about' className='...'>
          About
        </Link>
        <Link to='/cart' className='...'>
          Cart
        </Link>
      </nav>
    </header>
  )
}

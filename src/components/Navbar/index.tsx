import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import MountainIcon from '../icons/MountainIcon'
import MenuIcon from '../icons/MenuIcon'
import { GlowEffect } from '../ui/glow-effect'
import { ModeToggle } from '../icons/ModeToggle'

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
            <span className='sr-only'>NoteNest</span>
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
            <div className='relative'>
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Links */}
      <Link to='/' className='mr-6 hidden lg:flex'>
        <MountainIcon className='h-6 w-6' />
        <span className='sr-only'>NoteNest</span>
      </Link>
      <nav className='ml-auto hidden lg:flex gap-6 items-center'>
        <Link to='/' className='...'>
          Home
        </Link>
        <Link to='/products' className='...'>
          Products
        </Link>
        <Link to='/about' className='...'>
          About
        </Link>
        <div className='relative'>
          <GlowEffect
            colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
            mode='colorShift'
            blur='soft'
            duration={3}
            scale={0.9}
          />
          <div className='relative'>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}

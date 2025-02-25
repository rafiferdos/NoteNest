import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'
import MountainIcon from '../icons/MountainIcon'
import MenuIcon from '../icons/MenuIcon'
import { GlowEffect } from '../ui/glow-effect'
import { ModeToggle } from '../icons/ModeToggle'
import { AnimatedBackground } from '../ui/animated-background'

export default function Navbar() {
  const location = useLocation()
  const Tabs = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
  ]
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
            {Tabs.map((tab) => (
              <Link
                to={tab.href}
                key={tab.name}
                data-id={tab.name}
                type='button'
                className={`px-2 py-0.5 transition-colors duration-300 
    ${
      location.pathname === tab.href
        ? 'text-zinc-950 dark:text-zinc-50' // Active state - same as hover
        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50' // Normal state with hover
    }`}
              >
                {tab.name}
              </Link>
            ))}
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
        <AnimatedBackground
          defaultValue={Tabs[0].name}
          className='rounded-lg bg-yellow-300 dark:bg-yellow-600'
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover
        >
          {Tabs.map((tab) => (
            <Link
              to={tab.href}
              key={tab.name}
              data-id={tab.name}
              type='button'
              className='px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50'
            >
              {tab.name}
            </Link>
          ))}
        </AnimatedBackground>
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

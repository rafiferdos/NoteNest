// src/components/Navbar/icons/MenuIcon.tsx
import { SVGProps } from 'react'

export default function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}

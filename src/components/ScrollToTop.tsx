import { useEffect } from 'react'
import { motion, useAnimate } from 'motion/react'

interface ScrollToTopProps {
  trigger?: boolean
  children?: React.ReactNode
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  trigger = true,
  children,
}) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (trigger) {
      // Animate scroll to top
      animate(
        document.documentElement,
        { scrollTop: 0 },
        { duration: 0.3, ease: 'easeInOut' }
      )

      // Fallback
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [trigger, animate])

  return (
    <div ref={scope}>
      {trigger && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className='fixed top-6 right-6 z-50 bg-primary text-white p-2 rounded-full shadow-lg'
          onAnimationComplete={() => {
            setTimeout(() => {
              // Hide the indicator after scrolling
            }, 1000)
          }}
        >
          {children || '↑'}
        </motion.div>
      )}
    </div>
  )
}

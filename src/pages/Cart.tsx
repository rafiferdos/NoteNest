import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '@/redux/Features/productManagement/cart.api'
import { ScrollReveal } from '@/components/ScrollReveal'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import {
  Trash2,
  MinusCircle,
  PlusCircle,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react'
import { TextScramble } from '@/components/ui/text-scramble'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'

const Cart: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const [processing, setProcessing] = useState(false)

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
    toast.success('Item removed from cart')
  }

  const handleUpdateQuantity = (
    id: string,
    newQuantity: number,
    maxQuantity: number
  ) => {
    if (newQuantity < 1) return
    if (newQuantity > maxQuantity) {
      toast.error('Maximum available quantity reached')
      return
    }
    dispatch(updateQuantity({ _id: id, quantity: newQuantity }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.success('Cart cleared')
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    setProcessing(true)
    setTimeout(() => {
      toast.success('Order placed successfully!')
      dispatch(clearCart())
      setProcessing(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <ScrollReveal direction='fade' delay={0.2}>
        <div className='container mx-auto py-16 px-4'>
          <div className='text-center space-y-6'>
            <ShoppingBag className='h-24 w-24 mx-auto text-muted-foreground' />
            <h1 className='text-3xl font-medium'>Your cart is empty</h1>
            <p className='text-muted-foreground max-w-md mx-auto'>
              Looks like you haven't added any items to your cart yet. Start
              shopping now to find great stationery products!
            </p>
            <Button asChild size='lg'>
              <Link to='/products'>
                <ArrowLeft className='mr-2 h-5 w-5' />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    )
  }

  return (
    <ScrollReveal direction='fade' delay={0.2}>
      <div className='container mx-auto py-8 md:py-16 px-4'>
        <h1 className='text-3xl md:text-4xl font-medium mb-8'>Your Cart</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='col-span-2'>
            <div className='bg-card rounded-lg shadow-sm p-4'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-medium'>
                  Cart Items ({items.length})
                </h2>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={handleClearCart}
                  disabled={processing}
                >
                  <Trash2 className='h-4 w-4 mr-1' /> Clear Cart
                </Button>
              </div>

              <Separator className='mb-4' />

              {items.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b last:border-none gap-4'
                >
                  <div className='flex items-center gap-4 flex-1'>
                    <div className='w-20 h-20 bg-muted rounded overflow-hidden'>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className='w-full h-full object-cover'
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='
                        }}
                      />
                    </div>
                    <div className='flex-1'>
                      <Link
                        to={`/api/products/${item._id}`}
                        className='font-medium hover:underline'
                      >
                        {item.name}
                      </Link>
                      <div className='text-sm text-muted-foreground mt-1 space-y-1'>
                        <p>Brand: {item.brand}</p>
                        <p>Category: {item.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-2'>
                      <button
                        className='disabled:opacity-50'
                        onClick={() =>
                          handleUpdateQuantity(
                            item._id,
                            item.quantity - 1,
                            item.quantity
                          )
                        }
                        disabled={item.quantity <= 1 || processing}
                      >
                        <MinusCircle className='h-5 w-5' />
                      </button>
                      <span className='w-8 text-center'>{item.quantity}</span>
                      <button
                        className='disabled:opacity-50'
                        onClick={() =>
                          handleUpdateQuantity(
                            item._id,
                            item.quantity + 1,
                            item.quantity
                          )
                        }
                        disabled={!item.inStock || processing}
                      >
                        <PlusCircle className='h-5 w-5' />
                      </button>
                    </div>

                    <div className='w-20 text-right'>
                      <div className='font-semibold'>
                        ৳{item.price * item.quantity}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        ৳{item.price} each
                      </div>
                    </div>

                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-destructive'
                      onClick={() => handleRemoveItem(item._id)}
                      disabled={processing}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className='col-span-1'>
            <div className='bg-card rounded-lg shadow-sm p-6'>
              <h2 className='text-xl font-medium mb-4'>Order Summary</h2>

              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>
                    Subtotal ({items.length} items)
                  </span>
                  <span>৳{calculateTotal()}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span>{calculateTotal() > 1000 ? 'Free' : '৳100'}</span>
                </div>

                <Separator />

                <div className='flex justify-between font-medium'>
                  <span>Total</span>
                  <div className='text-xl flex items-center'>
                    ৳
                    <TextScramble>
                      {(
                        calculateTotal() + (calculateTotal() > 1000 ? 0 : 100)
                      ).toString()}
                    </TextScramble>
                  </div>
                </div>

                <Button
                  className='w-full'
                  size='lg'
                  onClick={handleCheckout}
                  disabled={processing}
                >
                  {processing ? 'Processing...' : 'Proceed to Checkout'}
                </Button>

                <p className='text-xs text-muted-foreground text-center'>
                  Free shipping on orders over ৳1000
                </p>
              </div>
            </div>

            <div className='mt-4 p-4 bg-muted rounded-lg'>
              <h3 className='text-sm font-medium mb-2'>Need Help?</h3>
              <p className='text-xs text-muted-foreground'>
                If you have questions about your order, please contact our
                customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default Cart

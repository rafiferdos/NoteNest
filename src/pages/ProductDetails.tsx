import { useGetOneProductDataQuery } from '@/redux/Features/productManagement/productApi'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TextScramble } from '@/components/ui/text-scramble'
import { motion } from 'motion/react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/Features/productManagement/cart.api'
import { Check, ShoppingCart, AlertTriangle } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { TextShimmer } from '@/components/ui/text-shimmer'

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()

  const {
    data: response,
    isLoading,
    error,
    isError,
  } = useGetOneProductDataQuery(productId)
  const product = response?.data
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Enhanced error handling
  if (isError) {
    console.error('Error fetching product:', error)
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <AlertTriangle className='h-16 w-16 text-destructive mx-auto mb-4' />
          <h2 className='text-2xl font-medium mb-2'>Error Loading Product</h2>
          <p className='text-muted-foreground'>
            There was an error loading this product. Please try again later.
          </p>
          <pre className='mt-4 text-xs text-red-500 bg-red-50 p-2 rounded overflow-x-auto'>
            {JSON.stringify(error, null, 2)}
          </pre>
        </motion.div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='text-center'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TextShimmer className='text-xl font-thin' duration={0.8}>
              Loading product details...
            </TextShimmer>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <AlertTriangle className='h-16 w-16 text-destructive mx-auto mb-4' />
          <h2 className='text-2xl font-medium mb-2'>Product Not Found</h2>
          <p className='text-muted-foreground'>
            The product you're looking for doesn't exist or has been removed.
          </p>
        </motion.div>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }))
    toast.success(
      `${product.name} added to cart - ${quantity} item(s) added to your cart`,
      {
        position: 'bottom-right',
      }
    )
  }

  return (
    <>
      <div className='container mx-auto py-8 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
          {/* Product Image */}
          <ScrollReveal direction='left' delay={0.2} distance={50}>
            <motion.div
              className='rounded-lg overflow-hidden bg-white shadow-lg relative aspect-square'
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {!imageLoaded && (
                <div className='absolute inset-0 flex items-center justify-center bg-muted/20'>
                  <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
                </div>
              )}
              <img
                src={product.imageUrl}
                alt={product.name}
                className='w-full h-full object-cover'
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='
                  setImageLoaded(true)
                }}
              />
            </motion.div>
          </ScrollReveal>

          {/* Product Details */}
          <ScrollReveal direction='right' delay={0.2} distance={50}>
            <motion.div
              className='flex flex-col space-y-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className='flex items-center justify-between gap-4'>
                  <h1 className='text-3xl md:text-4xl font-medium'>
                    {product.name}
                  </h1>
                  <Badge variant='secondary' className='text-md'>
                    {product.brand}
                  </Badge>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  <Badge
                    variant={product.inStock ? 'outline' : 'destructive'}
                    className='text-sm'
                  >
                    {product.inStock ? (
                      <span className='flex items-center gap-1'>
                        <Check className='h-3 w-3' /> In Stock
                      </span>
                    ) : (
                      'Out of Stock'
                    )}
                  </Badge>
                  <Badge className='text-sm'>{product.category}</Badge>
                </div>
              </div>

              <div className='text-3xl font-medium flex items-center gap-1'>
                ৳<TextScramble>{product.price.toString()}</TextScramble>
              </div>

              <p className='text-muted-foreground leading-relaxed'>
                {product.description}
              </p>

              <Separator />

              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <span className='text-sm font-medium'>Quantity:</span>
                  <div className='flex items-center'>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8 rounded-r-none'
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <div className='h-8 px-4 flex items-center justify-center border-y'>
                      {quantity}
                    </div>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8 rounded-l-none'
                      onClick={() =>
                        quantity < product.quantity && setQuantity(quantity + 1)
                      }
                      disabled={quantity >= product.quantity}
                    >
                      +
                    </Button>
                  </div>
                  <span className='text-xs text-muted-foreground'>
                    {product.quantity} units available
                  </span>
                </div>

                <Button
                  className='w-full md:w-auto'
                  size='lg'
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className='mr-2 h-5 w-5' />
                  Add to Cart
                </Button>
              </div>

              <Separator />

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <h3 className='font-medium'>Product Details</h3>
                  <ul className='mt-2 space-y-1 text-muted-foreground'>
                    <li>
                      <span className='font-medium'>Brand:</span>{' '}
                      {product.brand}
                    </li>
                    <li>
                      <span className='font-medium'>Category:</span>{' '}
                      {product.category}
                    </li>
                    <li>
                      <span className='font-medium'>Stock:</span>{' '}
                      {product.quantity} units
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-medium'>Shipping & Returns</h3>
                  <ul className='mt-2 space-y-1 text-muted-foreground'>
                    <li>Free shipping on orders over ৳1000</li>
                    <li>30-day return policy</li>
                    <li>Satisfaction guaranteed</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Related Products Section - Can be added in future */}
        {/* <ScrollReveal direction='fade' delay={0.4} distance={50}>
        <div className='mt-20'>
          <h2 className='text-2xl font-medium mb-6'>Related Products</h2>
          <p className='text-muted-foreground'>Coming soon...</p>
        </div>
      </ScrollReveal> */}
      </div>
    </>
  )
}

export default ProductDetails

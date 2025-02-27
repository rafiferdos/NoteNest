import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { TextScramble } from '../ui/text-scramble'
import { TProduct } from './AllProducts'
import { ScrollReveal } from '@/components/ScrollReveal'

const OneProduct = ({ product }: { product: TProduct }) => {
  console.log('Attempting to load image:', product.imageUrl)
  return (
    <ScrollReveal direction='fade' delay={0.2}>
      <Link to={`/api/products/${product._id}`}>
        <Card key={product._id} className='flex flex-col h-full'>
          <CardHeader>
            <div className='flex justify-between w-full items-center'>
              <CardTitle>{product.name} </CardTitle>
              <Badge variant='secondary'>{product.brand}</Badge>
            </div>
            <CardDescription className='line-clamp-2'>
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <div className='w-full h-48 overflow-hidden rounded-md'>
              <img
                src={product.imageUrl}
                alt={`${product.name} image`}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.currentTarget.src =
                    'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='
                  console.error('Image failed to load:', product.imageUrl)
                }}
              />
            </div>
          </CardContent>
          <CardFooter className='flex justify-between items-center mt-auto'>
            <div className='flex justify-between items-center text-lg'>
              ৳
              <TextScramble className='text-lg font-semibold'>
                {product.price.toString()}
              </TextScramble>
            </div>
            <Button variant='ghost'>Add to Cart</Button>
          </CardFooter>
        </Card>
      </Link>
    </ScrollReveal>
  )
}

export default OneProduct

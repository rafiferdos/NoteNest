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

const OneProduct = (
  { product }: { product: TProduct }
) => {
  console.log('Attempting to load image:', product.imageUrl)
  return (
    <Card key={product._id}>
      <CardHeader>
        <div className='flex justify-between w-full items-center'>
          <CardTitle>{product.name} </CardTitle>
          <Badge variant='secondary'>{product.brand}</Badge>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
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
      <CardFooter className='flex justify-between items-center'>
        <div className='flex justify-between items-center'>
          <TextScramble className='text-lg font-semibold'>{product.price.toString()}</TextScramble>
        </div>
        <Button variant='ghost'>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default OneProduct

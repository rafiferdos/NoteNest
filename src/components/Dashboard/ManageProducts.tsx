import { useGetAllProductDataQuery } from '@/redux/Features/productManagement/productApi'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { TProduct } from '../AllProducts/AllProducts'
import { TextShimmer } from '../ui/text-shimmer'

export default function ManageProducts() {
  const { data: response, isLoading, isError } = useGetAllProductDataQuery([])
  const products = response?.data || []

  return (
    <div className='w-full max-w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Manage Products</h1>
        <Button asChild>
          <Link to='/dashboard/products/add'>
            <Plus className='mr-2 h-4 w-4' />
            Add Product
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className='text-center py-8'>
          <TextShimmer duration={0.7}>Loading products...</TextShimmer>
        </div>
      ) : isError ? (
        <div className='text-center py-8 text-destructive'>
          Error loading products. Please try again.
        </div>
      ) : (
        <div className='bg-card rounded-lg shadow-sm w-full'>
          <div className='overflow-x-auto w-full'>
            <table className='w-full min-w-full table-auto'>
              <thead className='bg-muted/50'>
                <tr>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Image
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Name
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Category
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Price
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Stock
                  </th>
                  <th className='px-4 py-3 text-left text-sm font-medium'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {products.map((product: TProduct) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className='hover:bg-muted/50'
                  >
                    <td className='px-4 py-3'>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className='h-12 w-12 object-cover rounded-md'
                      />
                    </td>
                    <td className='px-4 py-3 font-medium'>{product.name}</td>
                    <td className='px-4 py-3 text-muted-foreground'>
                      {product.category}
                    </td>
                    <td className='px-4 py-3'>৳{product.price}</td>
                    <td className='px-4 py-3'>{product.quantity}</td>
                    <td className='px-4 py-3'>
                      <div className='flex gap-2'>
                        <Button variant='outline' size='icon' asChild>
                          <Link to={`/dashboard/products/edit/${product._id}`}>
                            <Edit className='h-4 w-4' />
                          </Link>
                        </Button>
                        <Button variant='destructive' size='icon'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='p-4 bg-muted/20 border-t text-sm text-muted-foreground'>
            Showing {products.length} products
          </div>
        </div>
      )}
    </div>
  )
}

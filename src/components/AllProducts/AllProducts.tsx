import { useGetAllProductDataQuery } from '@/redux/Features/productManagement/productApi'
import { TQueryParam } from '@/types/global'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { allProductCategories } from '@/constants/global'
import { TextShimmer } from '../ui/text-shimmer'
import OneProduct from './OneProduct'
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '../ui/select'


export type TProduct = {
  _id: string
  name: string
  description: string
  imageUrl: string
  price: number
  category: string
  brand: string
  inStock: boolean
  quantity: number
}

const AllProductsC: React.FC = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
  const { data: response, isLoading } = useGetAllProductDataQuery(params)
  console.log(response)

  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target

    if (!value) return

    setParams((prevParams) => {
      const updatedParams = prevParams ? [...prevParams] : []
      const filterParams = updatedParams.filter((param) => param.name !== name)

      if (name === 'minPrice' || name === 'maxPrice') {
        const priceRangeParam = {
          name: name === 'minPrice' ? 'minPrice' : 'maxPrice',
          value: Number(value),
        }
        filterParams.push(priceRangeParam)
      } else if (name === 'inStock') {
        filterParams.push({ name, value })
      } else {
        filterParams.push({ name, value })
      }
      return filterParams
    })
  }

  const products = response?.data || response?.data?.result || []

  return (
    <div>
      <div className='relative'>
        <Search className='h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2' />
        <Input
          placeholder='Search by name/title/author/category'
          className='pl-10'
          onChange={handleChangeFilter}
          name='searchTerm'
        />
      </div>

      <div className='flex gap-4 my-4 w-full'>
        <Select 
          onValueChange={(value) => {
            setParams((prevParams) => {
              const updatedParams = prevParams ? [...prevParams] : []
              const filterParams = updatedParams.filter((param) => param.name !== 'category')
              filterParams.push({ name: 'category', value })
              return filterParams
            })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter by Category' />
          </SelectTrigger>
          <SelectContent>
            {allProductCategories?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select 
          onValueChange={(value) => {
            setParams((prevParams) => {
              const updatedParams = prevParams ? [...prevParams] : []
              const filterParams = updatedParams.filter((param) => param.name !== 'inStock')
              filterParams.push({ name: 'inStock', value })
              return filterParams
            })
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by Availability' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='true'>In Stock</SelectItem>
            <SelectItem value='false'>Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type='number'
          className='max-w-sm'
          name='minPrice'
          placeholder='Min Price'
          onChange={handleChangeFilter}
        />
        <Input
          type='number'
          className='max-w-sm'
          name='maxPrice'
          placeholder='Max Price'
          onChange={handleChangeFilter}
        />
      </div>




      <div className='md:my-16 my-10'>
        {isLoading ? (
          <TextShimmer
            className='font-charm text-3xl text-center my-12'
            duration={0.7}
          >
            Fetching products...
          </TextShimmer>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
              products?.map((product: TProduct) => (
                <OneProduct key={product._id} product={product} />
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProductsC

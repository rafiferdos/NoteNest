import { useGetAllProductDataQuery } from '@/redux/Features/productManagement/productApi'
import { TQueryParam } from '@/types/global'
import { useState } from 'react'

const AllProductsC: React.FC = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
  const { data: response, isLoading } = useGetAllProductDataQuery(params)

  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target

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

  const products = response?.data?.result

  return (
    <div>
      
    </div>
  )
}

export default AllProductsC
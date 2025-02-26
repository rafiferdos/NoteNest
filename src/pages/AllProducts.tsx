import AllProductsC from '@/components/AllProducts/AllProducts';

const AllProducts = () => {
  return (
    <div className='space-y-8 my-8 md:my-16'>
      <h1 className='font-thin text-3xl text-center md:text-4xl'>
        Our <span className='font-charm'>Products</span>
      </h1>
      <AllProductsC />
    </div>
  )
};

export default AllProducts;
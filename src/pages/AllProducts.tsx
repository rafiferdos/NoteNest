import AllProductsC from '@/components/AllProducts/AllProducts';
import { motion } from 'motion/react';

const AllProducts = () => {
  return (
    <div className='space-y-8 my-8 md:my-16'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

      <h1 className='font-thin text-3xl text-center md:text-4xl'>
        Our <span className='font-charm'>Products</span>
      </h1>
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

      <AllProductsC />
      </motion.section>
    </div>
  )
};

export default AllProducts;
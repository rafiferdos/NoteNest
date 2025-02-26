import Banner from '@/components/Home/Banner'
import FeaturedProducts from '@/components/Home/FeaturedProducts'

const Home = () => {
  return (
    <div className='lg:space-y-16 space-y-8'>
      <Banner />
      <FeaturedProducts />
    </div>
  )
}

export default Home

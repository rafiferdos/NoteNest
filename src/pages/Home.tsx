import Banner from '@/components/Home/Banner'
import FeaturedProducts from '@/components/Home/FeaturedProducts'
import Testimonials from '@/components/Home/Testimonials'

const Home = () => {
  return (
    <div className='lg:space-y-16 space-y-8'>
      <Banner />
      <FeaturedProducts />
      <Testimonials />
    </div>
  )
}

export default Home

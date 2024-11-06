import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import Bulusan from '@/assets/bulusan-destination.jpg'
import Bulan from '@/assets/bulan.webp'
import Barcelona from '@/assets/barcelona.jpg'
import Casiguran from '@/assets/casiguran.jpg'
import Castilla from '@/assets/castilla.webp'
import Donsol from '@/assets/donsol.jpg'
import Gubat from '@/assets/gubat.webp'
import Irosin from '@/assets/irosin.jpg'
import Juban from '@/assets/juban.jpg'
import Magallanes from '@/assets/magallanes.jpg'
import Matnog from '@/assets/matnog.webp'
import Pilar from '@/assets/pilar.jpg'
import Prieto from '@/assets/prieto.jpg'
import Santa from '@/assets/santa.jpg'
import Sorso from '@/assets/sorsogon city.jpg'
import { Link } from 'react-router-dom'


const destinations = [
    { name: 'Barcelona', image: Barcelona, link: '/destinations/barcelona' },
    { name: 'Bulan', image: Bulan, link: '/destinations/bulan' },
    { name: 'Bulusan', image: Bulusan, link: '/destinations/bulusan' },
    { name: 'Casiguran', image: Casiguran, link: '/destinations/casiguran' },
    { name: 'Castilla', image: Castilla, link: '/destinations/castilla' },
    { name: 'Donsol', image: Donsol, link: '/destinations/donsol' },
    { name: 'Gubat', image: Gubat, link: '/destinations/gubat' },
    { name: 'Irosin', image: Irosin, link: '/destinations/irosin' },
    { name: 'Juban', image: Juban, link: '/destinations/juban' },
    { name: 'Magallanes', image: Magallanes, link: '/destinations/magallanes' },
    { name: 'Matnog', image: Matnog, link: '/destinations/matnog' },
    { name: 'Pilar', image: Pilar, link: '/destinations/pilar' },
    { name: 'Prieto Diaz', image: Prieto, link: '/destinations/prieto-diaz' },
    { name: 'Santa Magdalena', image: Santa, link: '/destinations/santa-magdalena' },
    { name: 'Sorsogon City', image: Sorso, link: '/destinations/sorsogon-city' },
]
  

const DestinationSection = () => {
  return (
    <section className='mt-24 container mx-auto px-4'>
      <div className='flex flex-col items-start'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            Discover the Wonders of Sorsogon
          </h1>
          <div className='flex md:flex-row justify-between w-full items-center mb-4 flex-wrap'>
        <p className='text-lg text-gray-600 '>
          Uncover breathtaking destinations, hidden gems, and iconic attractions in Sorsogon.
        </p>
        <Link className='rounded-full text-center bg-color1 text-white p-2 text-sm hover:bg-color2 duration-300 hover:translate-x-2 flex items-center hover:shadow-lg mt-4 ' to='/destinations' target='_blank'>
            <button>View All ⇀</button>
          </Link>
      </div>
      </div>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          480: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        pagination={{ clickable: true }}
        navigation
        className='mb-5'
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={index}>
            <a href={destination.link} target="_blank">
              <motion.div
                className='relative overflow-hidden rounded-lg shadow-lg'
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={destination.image}
                  alt={destination.name}
                  className='w-full h-64 bg-black object-cover'
                  whileHover={{ scale: 1.1 }}
                />
                <motion.div
                  className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className='text-lg font-semibold'>{destination.name}</h3>
                </motion.div>
              </motion.div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default DestinationSection

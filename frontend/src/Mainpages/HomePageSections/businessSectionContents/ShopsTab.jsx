import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { GiPositionMarker } from 'react-icons/gi';
import { AiFillStar } from 'react-icons/ai';
import img from '@/assets/shop.webp';

const shopDetails = [
  {
    image: img,
    tags: ['Fashion', 'Trendy'],
    rating: 5,
    name: 'Trendy Boutique',
    destination: 'Sorsogon',
    budget: 1500,
    discount: 20,
  },
  {
    image: img,
    tags: ['Electronics', 'Gadgets'],
    rating: 4,
    name: 'Gadget Store',
    destination: 'Sorsogon',
    budget: 3000,
    discount: 15,
  },
  {
    image: img,
    tags: ['Home', 'Decor'],
    rating: 4,
    name: 'Home Decor Shop',
    destination: 'Sorsogon',
    budget: 2500,
    discount: 10,
  },
];

const ShopsTab = () => (
  <div>
    <div className="p-4 md:p-6">
      <div className='flex justify-between items-center'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center lg:text-start'>Must-Visit: Recommended Stores</h1>
      <Link to='/shops' target='_blank'>
      <h1 className='text-md font-semibold text-color1 hover:tracking-wide duration-300 hover:underline cursor-pointer'>
          See More ⥬
        </h1>
        </Link>
    </div>
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        className='max-w-full p-4 md:p-6'
      >
        {shopDetails.map((shop, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <div className='bg-white rounded-md hover:shadow-lg transform transition-all duration-500 p-4 w-full max-w-[280px] md:max-w-[320px] h-[380px] flex flex-col'>
              <div className='relative w-full h-40 md:h-44'>
                <img
                  src={shop.image || 'path/to/placeholder.jpg'}
                  alt={shop.name}
                  className='w-full h-full object-cover rounded-t-lg'
                />
                {!shop.image && (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
                    <span className='text-gray-500'>Image Not Available</span>
                  </div>
                )}
              </div>
              <div className='p-4 flex flex-col justify-between h-full'>
                <div>
                  <h3 className='font-semibold text-base md:text-lg text-color1 mb-1'>{shop.name}</h3>
                  <div className='text-xs text-gray-500 mb-2 flex items-center'>
                    <GiPositionMarker /> {shop.destination}
                  </div>
                  <div className='flex items-center justify-between gap-2 mb-3'>
                    <div className='flex flex-wrap gap-1'>
                      {shop.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className='text-xs px-2 py-1 rounded-full bg-gray-200 text-black'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-black text-sm'>{shop.rating}</span>
                      <span className='text-yellow-500'>
                        {'★'.repeat(shop.rating)}{'☆'.repeat(5 - shop.rating)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-sm md:text-md'>
                    <span>₱{shop.budget}- 4000</span>
                  </p>
                  <Link to="/business" target='_blank'>
                    <Button className='bg-color1 text-color3 hover:bg-color2 px-4 py-2 text-xs'>
                      Explore More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-light p-2 rounded-full shadow-md z-10 cursor-pointer hover:-translate-x-2 duration-300">
          ←
        </div>
        <div className="custom-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-light p-2 rounded-full shadow-md z-10 cursor-pointer hover:bg-gray-200 text-xl hover:translate-x-2 duration-300">
          →
        </div>
      </Swiper>
    </div>

    <div className="p-4 md:p-6">
      <div className='flex justify-between items-center'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center lg:text-start'>Shopper's Picks: Most Reviewed Shops</h1>
      <Link to='/shops' target='_blank'>
      <h1 className='text-md font-semibold text-color1 hover:tracking-wide duration-300 hover:underline cursor-pointer'>
          See More ⥬
        </h1>
        </Link>
    </div>
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        className='max-w-full p-4 md:p-6'
      >
        {shopDetails.map((shop, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <div className='bg-white rounded-md hover:shadow-lg transform transition-all duration-500 p-4 w-full max-w-[280px] md:max-w-[320px] h-[380px] flex flex-col'>
              <div className='relative w-full h-40 md:h-44'>
                <img
                  src={shop.image || 'path/to/placeholder.jpg'}
                  alt={shop.name}
                  className='w-full h-full object-cover rounded-t-lg'
                />
                {!shop.image && (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
                    <span className='text-gray-500'>Image Not Available</span>
                  </div>
                )}
              </div>
              <div className='p-4 flex flex-col justify-between h-full'>
                <div>
                  <h3 className='font-semibold text-base md:text-lg text-color1 mb-1'>{shop.name}</h3>
                  <div className='text-xs text-gray-500 mb-2 flex items-center'>
                    <GiPositionMarker /> {shop.destination}
                  </div>
                  <div className='flex items-center justify-between gap-2 mb-3'>
                    <div className='flex flex-wrap gap-1'>
                      {shop.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className='text-xs px-2 py-1 rounded-full bg-gray-200 text-black'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-black text-sm'>{shop.rating}</span>
                      <span className='text-yellow-500'>
                        {'★'.repeat(shop.rating)}{'☆'.repeat(5 - shop.rating)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-sm md:text-md'>
                    <span>₱{shop.budget}- 4000</span>
                  </p>
                  <Link to="/business" target='_blank'>
                    <Button className='bg-color1 text-color3 hover:bg-color2 px-4 py-2 text-xs'>
                      Explore More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-light p-2 rounded-full shadow-md z-10 cursor-pointer hover:-translate-x-2 duration-300">
          ←
        </div>
        <div className="custom-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-light p-2 rounded-full shadow-md z-10 cursor-pointer hover:bg-gray-200 text-xl hover:translate-x-2 duration-300">
          →
        </div>
      </Swiper>
    </div>

    <div className="p-4 md:p-6">
      <div className='flex justify-between items-center'>
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center lg:text-start'>Retail Therapy: Top Shopping Offers</h1>
      <Link to='/shops' target='_blank'>
      <h1 className='text-md font-semibold text-color1 hover:tracking-wide duration-300 hover:underline cursor-pointer'>
          See More ⥬
        </h1>
        </Link>
    </div>
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        className='max-w-full p-4 md:p-6'
      >
        {shopDetails.map((shop, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <div className='bg-white rounded-md hover:shadow-lg transform transition-all duration-500 p-4 w-full max-w-[280px] md:max-w-[320px] h-[380px] flex flex-col'>
              <div className='relative w-full h-40 md:h-44'>
                <img
                  src={shop.image || 'path/to/placeholder.jpg'}
                  alt={shop.name}
                  className='w-full h-full object-cover rounded-t-lg'
                />
                {!shop.image && (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
                    <span className='text-gray-500'>Image Not Available</span>
                  </div>
                )}
                {shop.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {shop.discount}% OFF
                  </div>
                )}
              </div>
              <div className='p-4 flex flex-col gap-4  h-full'>
                <div>
                  <h3 className='font-semibold text-base md:text-lg mb-1'>{shop.name}</h3>
                  <div className='flex items-center gap-1 mb-2'>
                    <span className='text-black font-semibold'>{shop.rating}</span>
                    <div className='flex'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <AiFillStar
                          key={star}
                          className={star <= shop.rating ? 'text-yellow-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-lg'>
                    {shop.discount ? (
                      <>
                        <span className='line-through text-gray-500'>₱{shop.budget}</span>
                        <span className='text-red-500 ml-2'>₱{shop.budget - (shop.budget * shop.discount / 100)}</span>
                      </>
                    ) : (
                      `₱${shop.budget}`
                    )}
                  </p>
                  <Link to="/business" target='_blank'>
                    <Button className='bg-color1 text-color3 hover:bg-color2 px-4 py-2 text-xs'>
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-light p-2 rounded-full shadow-md z-10 cursor-pointer hover:-translate-x-2 duration-300">
          ←
        </div>
        <div className="custom-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-light p-2 rounded-full shadow-md z-10 cursor-pointer hover:bg-gray-200 text-xl hover:translate-x-2 duration-300">
          →
        </div>
      </Swiper>
    </div>
  </div>
);

export default ShopsTab;
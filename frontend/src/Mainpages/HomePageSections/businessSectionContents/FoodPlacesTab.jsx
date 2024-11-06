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

const foodPlaceDetails = [
  {
    image: img,
    tags: ['Local', 'Authentic'],
    rating: 5,
    name: 'Local Diner',
    destination: 'Sorsogon',
    budget: 500,
    discount: 0,
  },
  {
    image: img,
    tags: ['Fine Dining', 'Gourmet'],
    rating: 4,
    name: 'Gourmet Restaurant',
    destination: 'Sorsogon',
    budget: 2000,
    discount: 10,
  },
  {
    image: img,
    tags: ['Casual', 'Family'],
    rating: 4,
    name: 'Family Eatery',
    destination: 'Sorsogon',
    budget: 800,
    discount: 5,
  },
];

const FoodPlacesTab = () => (
  <div>
    <div className="p-4 md:p-6 ">
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center lg:text-start'>Culinary Delights: Must-Try Food Spots</h1>
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
        {foodPlaceDetails.map((foodPlace, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <div className='bg-white rounded-md hover:shadow-lg transform transition-all duration-500 p-4 w-full max-w-[280px] md:max-w-[320px] h-[380px] flex flex-col'>
              <div className='relative w-full h-40 md:h-44'>
                <img
                  src={foodPlace.image || 'path/to/placeholder.jpg'}
                  alt={foodPlace.name}
                  className='w-full h-full object-cover rounded-t-lg'
                />
                {!foodPlace.image && (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
                    <span className='text-gray-500'>Image Not Available</span>
                  </div>
                )}
              </div>
              <div className='p-4 flex flex-col justify-between h-full'>
                <div>
                  <h3 className='font-semibold text-base md:text-lg text-color1 mb-1'>{foodPlace.name}</h3>
                  <div className='text-xs text-gray-500 mb-2 flex items-center'>
                    <GiPositionMarker /> {foodPlace.destination}
                  </div>
                  <div className='flex items-center justify-between gap-2 mb-3'>
                    <div className='flex flex-wrap gap-1'>
                      {foodPlace.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className='text-xs px-2 py-1 rounded-full bg-gray-200 text-black'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-black text-sm'>{foodPlace.rating}</span>
                      <span className='text-yellow-500'>
                        {'★'.repeat(foodPlace.rating)}{'☆'.repeat(5 - foodPlace.rating)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-sm md:text-md'>
                    <span>₱{foodPlace.budget}- 1000</span>
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
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center lg:text-start'>Taste-Tested: Most Reviewed Eateries</h1>
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
        {foodPlaceDetails.map((foodPlace, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <div className='bg-white rounded-md hover:shadow-lg transform transition-all duration-500 p-4 w-full max-w-[280px] md:max-w-[320px] h-[380px] flex flex-col'>
              <div className='relative w-full h-40 md:h-44'>
                <img
                  src={foodPlace.image || 'path/to/placeholder.jpg'}
                  alt={foodPlace.name}
                  className='w-full h-full object-cover rounded-t-lg'
                />
                {!foodPlace.image && (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
                    <span className='text-gray-500'>Image Not Available</span>
                  </div>
                )}
              </div>
              <div className='p-4 flex flex-col justify-between h-full'>
                <div>
                  <h3 className='font-semibold text-base md:text-lg text-color1 mb-1'>{foodPlace.name}</h3>
                  <div className='text-xs text-gray-500 mb-2 flex items-center'>
                    <GiPositionMarker /> {foodPlace.destination}
                  </div>
                  <div className='flex items-center justify-between gap-2 mb-3'>
                    <div className='flex flex-wrap gap-1'>
                      {foodPlace.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className='text-xs px-2 py-1 rounded-full bg-gray-200 text-black'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-black text-sm'>{foodPlace.rating}</span>
                      <span className='text-yellow-500'>
                        {'★'.repeat(foodPlace.rating)}{'☆'.repeat(5 - foodPlace.rating)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-sm md:text-md'>
                    <span>₱{foodPlace.budget}- 1000</span>
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
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center lg:text-start'>Savor the Savings: Top Food Offers</h1>
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
        {foodPlaceDetails.map((foodPlace, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <div className='bg-white rounded-md hover:shadow-lg transform transition-all duration-500 p-4 w-full max-w-[280px] md:max-w-[320px] h-[380px] flex flex-col'>
              <div className='relative w-full h-40 md:h-44'>
                <img
                  src={foodPlace.image || 'path/to/placeholder.jpg'}
                  alt={foodPlace.name}
                  className='w-full h-full object-cover rounded-t-lg'
                />
                {!foodPlace.image && (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
                    <span className='text-gray-500'>Image Not Available</span>
                  </div>
                )}
                {foodPlace.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {foodPlace.discount}% OFF
                  </div>
                )}
              </div>
              <div className='p-4 flex flex-col gap-4  h-full'>
                <div>
                  <h3 className='font-semibold text-base md:text-lg mb-1'>{foodPlace.name}</h3>
                  <div className='flex items-center gap-1 mb-2'>
                    <span className='text-black font-semibold'>{foodPlace.rating}</span>
                    <div className='flex'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <AiFillStar
                          key={star}
                          className={star <= foodPlace.rating ? 'text-yellow-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-lg'>
                    {foodPlace.discount ? (
                      <>
                        <span className='line-through text-gray-500'>₱{foodPlace.budget}</span>
                        <span className='text-red-500 ml-2'>₱{foodPlace.budget - (foodPlace.budget * foodPlace.discount / 100)}</span>
                      </>
                    ) : (
                      `₱${foodPlace.budget}`
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

export default FoodPlacesTab;
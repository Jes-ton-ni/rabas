import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import hall from '../assets/hall.jpeg';
import bulusan from '../assets/bulusan.jpg';
import subic from '../assets/Subic.jpeg';
import dancalan from '../assets/dancalan.png';
import Search from '../components/Search'

const Hero = () => {
  const images = [hall, bulusan, subic, dancalan];
  
  const greetings = [
    {
      title: 'Plan Your Perfect Journey',
      description: 'With RabaSorsogon, your trip to Sorsogon will be more enjoyable, memorable, and truly unforgettable. Experience the best of local culture, stunning landscapes, and services, making every moment a cherished memory.'
    },
    {
      title: 'Embrace Serenity and Adventure',
    },
    {
      title: 'Unwind and Rejuvenate',
    },
    {
      title: 'Discover Tranquil Escapes',
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeAnimation, setFadeAnimation] = useState(true);

  const handleNext = () => {
    setFadeAnimation(false);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      setFadeAnimation(true);
    }, 500); // Duration should match the CSS transition duration
  };

  const handlePrevious = () => {
    setFadeAnimation(false);
    setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? images.length - 1 : prevSlide - 1
      );
      setFadeAnimation(true);
    }, 500); 
  };

  return (
    <div className="mx-auto  mt-28 flex items-center justify-center h-[600px] relative font-sans">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-dark">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } w-full h-full`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        ))}
      </div>

      {/* Centered Text */}
      <div className="absolute md:w-[50rem] md:h-[600px] flex flex-col items-center justify-center text-center  p-4">
        <h1
          className={`text-white text-4xl md:text-5xl lg:text-5xl font-bold transition-opacity duration-500 ${
            fadeAnimation ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {greetings[currentSlide].title}
        </h1>
       
      
        <a href='/destination'
          className="mt-9 flex items-center bg-light text-black font-semibold py-2 px-4 rounded-full transform transition-transform duration-500 hover:translate-x-2 hover:bg-color1 hover:text-light"
        >
          Explore  <FiChevronRight className="" size={20} />
        </a>
      </div>

        
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black hover:bg-color3 hover:text-dark duration-300 bg-opacity-50 text-white p-2 rounded-full"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black hover:bg-color3 hover:text-dark duration-300  bg-opacity-50 text-white p-2 rounded-full"
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};

export default Hero;

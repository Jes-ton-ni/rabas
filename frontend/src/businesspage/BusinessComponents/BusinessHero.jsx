import React, { useState, useRef, useCallback } from 'react'
import Slider from 'react-slick'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react"
import EnlargedImage from '../../components/EnlargedImage'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const BusinessHero = () => {
  const [imageLoadError, setImageLoadError] = useState(false)
  const [_currentSlide, setCurrentSlide] = useState(0)
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const sliderRef = useRef(null)
  const [hoveredImage, setHoveredImage] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const images = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80',
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setCurrentSlide(next),
    arrows: false,
  }
  
  const handleImageError = () => {
    setImageLoadError(true)
  }

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index)
  }

  const goToNextSlide = () => {
    sliderRef.current.slickNext()
  }

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev()
  }

  const handleMouseMove = useCallback((event) => {
    if (hoveredImage) {
      setMousePosition({ x: event.clientX + 20, y: event.clientY + 20 })
    }
  }, [hoveredImage])

  const handleMouseEnter = (image, event) => {
    setHoveredImage(image)
    setMousePosition({ x: event.clientX + 20, y: event.clientY + 20 })
  }

  const handleMouseLeave = () => {
    setHoveredImage(null)
  }

  return (
    <div onMouseMove={handleMouseMove} className="mx-auto container px-4 mt-3  sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Hero Carousel */}
        <div className="w-full lg:w-2/3 relative">
          {imageLoadError ? (
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
              <p className="text-gray-500 text-lg">Failed to load images</p>
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden shadow-xl relative">
              <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Gallery image ${index + 1}`} 
                      className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover" 
                      onError={handleImageError}
                    />
                  </div>
                ))}
              </Slider>
              <button
                className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 sm:p-2 transition-all duration-300"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 sm:p-2 transition-all duration-300"
                onClick={goToNextSlide}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Business Name and View All Images button */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-end items-center p-4 bg-gradient-to-t from-black to-transparent">
                <Button 
                  auto 
                  className='bg-color1 text-white hover:bg-color2 transition-colors duration-300 px-4 sm:px-6 py-2 rounded-full text-sm font-semibold' 
                  onPress={onOpen}
                >
                  View All Images ({images.length})
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Thumbnails (hidden on smaller screens) */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 hidden lg:block">
          <div className="grid grid-cols-2 gap-2 ">
            {images.slice(0, 6).map((image, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden rounded-lg shadow-md aspect-square"
                onMouseEnter={(e) => handleMouseEnter(image, e)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onClick={() => goToSlide(index)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="5xl"
        className='max-h-[90vh]'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">All Images</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative group overflow-hidden rounded-lg aspect-square"
                      onMouseEnter={(e) => handleMouseEnter(image, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onClick={() => {
                          goToSlide(index)
                          onClose()
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
             \
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {hoveredImage && (
        <EnlargedImage
          src={hoveredImage}
          alt="Enlarged gallery image"
          position={mousePosition}
        />
      )}
    </div>
  )
}

export default BusinessHero
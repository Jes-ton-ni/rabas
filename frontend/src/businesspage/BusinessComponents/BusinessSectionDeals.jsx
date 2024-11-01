import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useDisclosure } from '@nextui-org/react';

// Discounted products from BusinessAllproducts.jsx
const discountedProducts = [
  {
    id: 'Hiking Adventure',
    name: 'Hiking Adventure',
    description: 'Explore scenic mountain trails. Guide and equipment included.',
    price: 1500,
    discountedPrice: 1350,
    image: 'https://via.placeholder.com/200',
    expiration: '10/4/2024',
  },
  {
    id: 'Snorkeling Tour',
    name: 'Snorkeling Tour',
    description: 'Discover the underwater world with a guided snorkeling tour.',
    price: 1200,
    discountedPrice: 1080,
    image: 'https://via.placeholder.com/200',
    expiration: '10/4/2024',
  },
  // Add more discounted products as needed
];

const BusinessSection = () => {
  const [visible, setVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [previewImage, setPreviewImage] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const images = [
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80', title: 'Sunset Over the Hills' },
    { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80', title: 'Mountain Range' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80', title: 'City Skyline' },
    { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80', title: 'Forest Path' },
    { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80', title: 'Ocean Waves' },
    { url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=900&q=80', title: 'Desert Dunes' },
  ];

  const handleThumbnailClick = (index) => {
    setPreviewImage(images[index].url);
    setPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewImage(null);
    setIsPreviewOpen(false);
  };

  const goToPrevImage = () => {
    if (previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
      setPreviewImage(images[previewIndex - 1].url);
    }
  };

  const goToNextImage = () => {
    if (previewIndex < images.length - 1) {
      setPreviewIndex(previewIndex + 1);
      setPreviewImage(images[previewIndex + 1].url);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        }
      }
    ]
  };

  const handleInquire = (deal) => {
    console.log(`Inquiring about: ${deal.name}`);
  };

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <div className='mx-auto mt-4 container p-4 rounded-xl mb-4 '>
      {/* Header Section */}
      <div className='flex justify-between items-center p-2'>
        <h1 className='text-2xl font-semibold'>Deals</h1>
        <h1 className='text-md font-semibold text-color1 hover:tracking-wide duration-300 hover:underline cursor-pointer' onClick={openModal}>
          See More
        </h1>
      </div>

      {/* Slider Section */}
      <div className='mt-8'>
        <Slider {...settings}>
          {discountedProducts.map(deal => (
            <div key={deal.id} className='p-4'>
              <div className='shadow-lg rounded-lg overflow-hidden bg-white relative'>
                <img src={deal.image} alt={deal.name} className='w-full h-48 object-cover' />
                {/* Discount Label */}
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  10% OFF
                </div>
                <Button size="sm" className="absolute top-2 right-2 text-white bg-color1" onClick={onOpen}>
                  View Images
                </Button>
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>{deal.name}</h3>
                  <p className='text-sm text-gray-600 mt-1'>{deal.description}</p>
                  <p className='text-xs text-red-500 mt-1'>Expires on: {deal.expiration}</p>
                  <div className='flex justify-between mt-3'>
                    <p className='mt-2 font-bold text-gray-800'>
                      <span className="line-through text-gray-500">₱{deal.price.toFixed(2)}</span> <span className="text-red-500">₱{deal.discountedPrice.toFixed(2)}</span>
                    </p>
                    <div className='flex gap-2'>
                      <Button auto size="sm" color="primary" onClick={() => handleInquire(deal)}>Inquire</Button>
                      <Button auto size="sm" color="primary" onClick={() => handleInquire(deal)}>Book Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Image Modal */}
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
              <ModalHeader className="flex flex-col gap-1">Image Gallery</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 cursor-pointer">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-lg shadow-md"
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img
                        src={image.url}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Single Image Preview Modal */}
      <Modal 
        isOpen={isPreviewOpen} 
        onOpenChange={setIsPreviewOpen}
        hideCloseButton
        size="full"
        className='z-50 bg-black bg-opacity-75 flex justify-center items-center'
      >
        <ModalContent className="relative flex justify-center items-center">
          <ModalBody className="relative max-w-full h-full flex justify-center items-center bg-white ">
            <img
              src={previewImage}
              alt="Preview"
              className="w-auto h-[80vh] object-contain rounded-md shadow-lg"
            />
            {previewIndex !== null && images[previewIndex] && (
              <div className="absolute bottom-4 left-0 right-0 text-center text-black text-2xl font-semibold py-2">
                {images[previewIndex].title}
              </div>
            )}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 transition-all duration-300"
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 transition-all duration-300"
              onClick={goToNextImage}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className="absolute top-4 right-4 bg-red-500  bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 transition-all duration-300"
              onClick={closePreview}
              aria-label="Close preview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal for See More */}
      <Modal isOpen={visible} onClose={closeModal} size='full'>
        <ModalContent className="max-w-5xl w-full">
          <ModalHeader className="flex justify-between">
            <h2 className='text-lg font-semibold'>All Deals</h2>
          </ModalHeader>
          <ModalBody className="overflow-y-auto scrollbar-custom h-[500px] p-4">
            {/* Scrollable Grid for the deals */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {discountedProducts.map(deal => (
                <div key={deal.id} className='shadow-lg rounded-lg overflow-hidden bg-white relative'>
                  <img src={deal.image} alt={deal.name} className='w-full h-48 object-cover' />
                  {/* Discount Label */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    10% OFF
                  </div>
                  <Button size="sm" className="absolute top-2 right-2 text-white bg-color1" onClick={onOpen}>
                    View Images
                  </Button>
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold text-gray-800'>{deal.name}</h3>
                    <p className='text-sm text-gray-600 mt-1'>{deal.description}</p>
                    <p className='text-xs text-red-500 mt-1'>Expires on: {deal.expiration}</p>
                    <div className='flex justify-between mt-3'>
                      <p className='mt-2 font-bold text-gray-800'>
                        <span className="line-through text-gray-500">₱{deal.price.toFixed(2)}</span> <span className="text-red-500">₱{deal.discountedPrice.toFixed(2)}</span>
                      </p>
                      <div className='flex gap-2'>
                        <Button auto size="sm" color="primary" onClick={() => handleInquire(deal)}>Inquire</Button>
                        <Button auto size="sm" color="primary" onClick={() => handleInquire(deal)}>Book Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={closeModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BusinessSection;

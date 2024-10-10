import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react"; // Import Button
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal"; // Modal import

const sampleDeals = [
  { id: 1, name: 'Deal 1', description: 'Description for deal 1', price: 100, image: 'https://via.placeholder.com/150', expiration: '10/4/2024' },
  { id: 2, name: 'Deal 2', description: 'Description for deal 2', price: 200, image: 'https://via.placeholder.com/150', expiration: '10/4/2024' },
  { id: 3, name: 'Deal 3', description: 'Description for deal 3', price: 300, image: 'https://via.placeholder.com/150', expiration: '10/4/2024' },
  { id: 3, name: 'Deal 3', description: 'Description for deal 3', price: 300, image: 'https://via.placeholder.com/150', expiration: '10/4/2024' },
  { id: 3, name: 'Deal 3', description: 'Description for deal 3', price: 300, image: 'https://via.placeholder.com/150', expiration: '10/4/2024' },
  { id: 3, name: 'Deal 3', description: 'Description for deal 3', price: 300, image: 'https://via.placeholder.com/150', expiration: '10/4/2024' },
  { id: 3, name: 'Deal 3', description: 'Description for deal 3', price: 300, image: 'https://via.placeholder.com/150', expiration: '10/4/2024' },
  // Add more sample deals as needed
];

const BusinessSection = () => {
  const [visible, setVisible] = useState(false); // Modal visibility state

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // Disable arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    <div className='mx-auto mt-4 container p-4 rounded-xl mb-4 bg-white'>
      {/* Header Section */}
      <div className='flex justify-between items-center p-2'>
        <h1 className='text-2xl font-semibold'>Deals</h1>
        <h1 className='text-md font-semibold text-blue-600 hover:text-blue-400 cursor-pointer' onClick={openModal}>
          See More
        </h1>
      </div>

      {/* Slider Section */}
      <div className='mt-8'>
        <Slider {...settings}>
          {sampleDeals.map(deal => (
            <div key={deal.id} className='p-4'>
              <div className='shadow-lg rounded-lg overflow-hidden bg-white'>
                <img src={deal.image} alt={deal.name} className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>{deal.name}</h3>
                  <p className='text-sm text-gray-600 mt-1'>{deal.description}</p>
                  <p className='text-xs text-red-500 mt-1'>Expires on: {deal.expiration}</p>
                  <div className='flex justify-between mt-3'>
                    <p className='mt-2 font-bold text-gray-800'>₱{deal.price.toFixed(2)}</p>
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

      {/* Modal for See More */}
      <Modal isOpen={visible} onClose={closeModal} size='full'>
        <ModalContent className="max-w-5xl w-full">
          <ModalHeader className="flex justify-between">
            <h2 className='text-lg font-semibold'>All Deals</h2>
    
          </ModalHeader>
          <ModalBody className="overflow-y-auto h-[500px] p-4">
            {/* Scrollable Grid for the deals */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {sampleDeals.map(deal => (
                <div key={deal.id} className='shadow-lg rounded-lg overflow-hidden bg-white'>
                  <img src={deal.image} alt={deal.name} className='w-full h-48 object-cover' />
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold text-gray-800'>{deal.name}</h3>
                    <p className='text-sm text-gray-600 mt-1'>{deal.description}</p>
                    <p className='text-xs text-red-500 mt-1'>Expires on: {deal.expiration}</p>
                    <div className='flex justify-between mt-3'>
                      <p className='mt-2 font-bold text-gray-800'>₱{deal.price.toFixed(2)}</p>
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

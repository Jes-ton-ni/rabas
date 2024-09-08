import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSwimmer, FaCampground, FaHiking, FaWater, FaUmbrellaBeach } from 'react-icons/fa';
import { MdOutlineSurfing } from "react-icons/md";
import Nav from '../components/navuser';
import Hero from '../components/heroactivity';
import Search from '../components/Search';
import Footer from '@/components/Footer';
import pic1 from '../assets/donsol.jpg';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { GiPositionMarker } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
const Activities = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('All');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  // Handle activity type selection
  const handleClick = (activity) => {
    if (activity === 'All') {
      setSelectedActivities([]);
    } else {
      setSelectedActivities((prevSelected) =>
        prevSelected.includes(activity)
          ? prevSelected.filter((a) => a !== activity)
          : [...prevSelected, activity]
      );
    }
  };

  // Handle rating selection
  const handleRatingClick = (rating) => {
    if (rating === 'All') {
      setSelectedRatings([]);
    } else {
      setSelectedRatings((prevSelected) =>
        prevSelected.includes(rating)
          ? prevSelected.filter((r) => r !== rating)
          : [...prevSelected, rating]
      );
    }
  };

  // Handle destination selection
  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
  };

  // Activity Icons Mapping
  const icons = {
    Diving: <FaSwimmer />,
    Camping: <FaCampground />,
    Hiking: <FaHiking />,
    'Island Hopping': <FaWater />,
    Swimming: <FaUmbrellaBeach />,
    Surfing: <MdOutlineSurfing />,
  };

  // Activity Details
  const activityDetails = [
    {
      name: 'Beautiful Beach',
      description: 'Relax and enjoy the scenic beach view.',
      image: pic1,
      tags: ['Swimming', 'Surfing'],
      rating: 5,
      destination: 'Donsol',
    },
    {
      name: 'Mountain Adventure',
      description: 'Hike through the mountains and enjoy nature.',
      image: pic1,
      tags: ['Hiking', 'Camping'],
      rating: 4,
      destination: 'Bulusan',
    },
    // ... more activity details ...
  ];

  // Filtering 
  const filteredActivities = activityDetails.filter((activity) => {
    const matchesActivityType = 
      selectedActivities.length === 0 || 
      selectedActivities.some((type) => activity.tags.includes(type));

    const matchesRating = 
      selectedRatings.length === 0 || 
      selectedRatings.includes(activity.rating);

    const matchesDestination = 
      selectedDestination === 'All' || 
      activity.destination === selectedDestination;

    return matchesActivityType && matchesRating && matchesDestination;
  });

  const destinations = [
    'All', 'Bulusan', 'Bulan', 'Barcelona', 'Casiguran', 'Castilla', 'Donsol', 'Gubat', 'Irosin', 'Juban', 'Magallanes', 'Matnog', 'Pilar', 'Prieto Diaz', 'Sta. Magdalena', 'Sorsogon City',
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for each activity card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className='mx-auto bg-light min-h-screen font-sans'>
      <Nav />
      <Hero />
      <Search />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='font-semibold text-3xl text-color1 mb-8'>Activities in Sorsogon</h1>
         
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filters Section */}
          <div className='w-full lg:w-1/4'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h2 className='text-xl font-semibold mb-4'>Filters</h2>
              
              {/* Destination Dropdown */}
              <div className='mb-6'>
                <h3 className='text-sm font-medium text-gray-700 mb-2'>Destination</h3>
                <Select
                  placeholder="Select Destination"
                  selectedKeys={[selectedDestination]}
                  onSelectionChange={(value) => handleDestinationChange(value.currentKey)}
                >
                  {destinations.map((destination) => (
                    <SelectItem key={destination} value={destination}>
                      {destination}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Activity Types */}
              <div className='mb-6'>
                <h3 className='text-sm font-medium text-gray-700 mb-2'>Activity Types</h3>
                <div className='flex flex-wrap gap-2'>
                  <button
                    onClick={() => handleClick('All')}
                    className={`flex items-center gap-2 text-color3 px-2 py-1 text-sm rounded-xl transition-all duration-300 ${
                      selectedActivities.length === 0 ? 'bg-color2/70' : 'bg-color1'
                    }`}
                  >
                    All
                  </button>
                  {Object.keys(icons).map((activity) => (
                    <button
                      key={activity}
                      onClick={() => handleClick(activity)}
                      className={`flex items-center gap-2 text-color3 px-2 py-1 text-sm rounded-xl transition-all duration-300 ${
                        selectedActivities.includes(activity) ? 'bg-color2/70' : 'bg-color1'
                      }`}
                    >
                      {icons[activity]}
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ratings Filter */}
              <div>
                <h3 className='text-sm font-medium text-gray-700 mb-2'>Ratings</h3>
                <div className='space-y-2'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      onChange={() => handleRatingClick('All')}
                      checked={selectedRatings.length === 0}
                      className='form-checkbox text-color2'
                    />
                    <span className='ml-2 text-sm'>All Ratings</span>
                  </label>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star} className='flex items-center'>
                      <input
                        type='checkbox'
                        onChange={() => handleRatingClick(star)}
                        checked={selectedRatings.includes(star)}
                        className='form-checkbox text-color2'
                      />
                      <span className='ml-2 text-sm flex items-center'>
                        {'★'.repeat(star)}{'☆'.repeat(5 - star)}
                        <span className='ml-1'>{star} Star{star > 1 ? 's' : ''}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity List */}
          <div className='w-full'>
            <motion.div 
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[1000px] scrollbar-hide p-4'
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className='bg-white rounded-lg shadow-lg hover:shadow-slate-500 hover:scale-105 duration-300'
                    variants={cardVariants}
                  >
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className='w-full h-48 object-cover rounded-t-lg'
                    />
                    <div className='p-4'>
                      <div className='flex flex-wrap gap-2 mb-2'>
                        {activity.tags.map((tag, index) => (
                          <span key={index} className='bg-color2 text-color3 text-xs px-2 py-1 rounded-full'>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className='text-lg font-semibold mb-2'>{activity.name}</h2>
                      <p className='text-sm text-gray-600 mb-2'>{activity.description}</p>
                      <div className='text-xs text-gray-500 mb-2 flex items-center'><GiPositionMarker/>{activity.destination}</div>
                      <div className='flex items-center mb-4'>
                        <span className='text-yellow-500'>{'★'.repeat(activity.rating)}{'☆'.repeat(5 - activity.rating)}</span>
                      </div>
                      <Button onPress={onOpen} className='w-full bg-color1 text-color3 hover:bg-color2'>
                        VIEW DETAILS
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className='col-span-full text-center text-gray-500'>No activities match your selected filters.</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gray-900/50 backdrop-opacity-40"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Activity Details</ModalHeader>
              <ModalBody>
                {/* Add activity details here */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                                color="primary" 
                                onPress={() => {
                                    onClose();
                                    navigate('/business');
                                }}
                            >
                                Explore
                            </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Activities;
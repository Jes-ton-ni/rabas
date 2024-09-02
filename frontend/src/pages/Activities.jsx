import React, { useState } from 'react';
import { FaSwimmer, FaCampground, FaHiking, FaWater, FaUmbrellaBeach } from 'react-icons/fa';
import { MdOutlineSurfing } from "react-icons/md";
import Nav from '../components/nav';
import Hero from '../components/heroactivity';
import Search from '../components/Search';
import Footer from '@/components/Footer';
import pic1 from '../assets/donsol.jpg';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const Activities = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('All');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    {
      name: 'Island Exploration',
      description: 'Hop from one island to another and explore.',
      image: pic1,
      tags: ['Island Hopping', 'Swimming', 'Diving'],
      rating: 3,
      destination: 'Matnog',
    },
    {
      name: 'Coral Reef Diving',
      description: 'Dive into the sea and explore coral reefs.',
      image: pic1,
      tags: ['Diving'],
      rating: 5,
      destination: 'Gubat',
    },
    {
      name: 'Forest Camp',
      description: 'Camp in the forest and enjoy the wilderness.',
      image: pic1,
      tags: ['Camping', 'Hiking'],
      rating: 2,
      destination: 'Juban',
    },
    {
      name: 'Surfing Paradise',
      description: 'Catch the waves and enjoy surfing.',
      image: pic1,
      tags: ['Surfing'],
      rating: 4,
      destination: 'Gubat',
    },
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
    'All',
    'Bulusan',
    'Bulan',
    'Barcelona',
    'Casiguran',
    'Castilla',
    'Donsol',
    'Gubat',
    'Irosin',
    'Juban',
    'Magallanes',
    'Matnog',
    'Pilar',
    'Prieto Diaz',
    'Sta. Magdalena',
    'Sorsogon City',
  ];

  return (
    <div className='mx-auto bg-light min-h-screen font-sans'>
      {/* Nav */}
      <div><Nav /></div>

      {/* Hero */}
      <div><Hero /></div>

      {/* Search */}
      <div><Search /></div>

      {/* Contents */}
      <div className='m-4 mx-auto w-full container bg-light p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg'>
        <div className='flex p-4 ml-2 mb-3'>
          <h1 className='font-semibold text-2xl text-color1'>Things To Do in Sorsogon</h1>
        </div>

        <div className='flex flex-col lg:flex-row gap-8 '>

          <div className=' w-full  lg:w-[300px]'>

            {/* Destination Dropdown */}
            <div className='p-4 flex flex-wrap gap-4'>
              <h1 className='text-dark text-xl'>Destinations</h1>
              <Select
                placeholder="Select Destination"
                selectedKeys={[selectedDestination]}
                onSelectionChange={(value) => setSelectedDestination(value.currentKey)}
              >
                {destinations.map((destination) => (
                  <SelectItem key={destination} value={destination}>
                    {destination}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Activity Filters */}
            <div className='p-4'>
              <h1 className='text-dark text-xl'>Activity Types</h1>
            </div>
            <div className='p-4 flex flex-wrap gap-3'>
              <button
                onClick={() => handleClick('All')}
                className={`flex items-center gap-2 text-color3 px-2 py-2 font-normal rounded-xl transition-all duration-300 ${
                  selectedActivities.length === 0 ? 'bg-color2/70' : 'bg-color1'
                }`}
              >
                All
              </button>
              {Object.keys(icons).map((activity) => (
                <button
                  key={activity}
                  onClick={() => handleClick(activity)}
                  className={`flex items-center gap-2 text-color3 px-2 py-2 font-normal rounded-xl transition-all duration-300 ${
                    selectedActivities.includes(activity) ? 'bg-color2/70' : 'bg-color1'
                  }`}
                >
                  {icons[activity]}
                  {activity}
                </button>
              ))}
            </div>

            {/* Star Rating Filters */}
            <div className='p-4'>
              <h1 className='text-dark text-xl'>Ratings</h1>
            </div>
            <div className='p-4 flex flex-col gap-2'>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  onChange={() => handleRatingClick('All')}
                  checked={selectedRatings.length === 0}
                  className='form-checkbox text-color2'
                />
                <span className='flex items-center'>
                  ★★★★★ <span className='ml-2'>All Ratings</span>
                </span>
              </label>
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    onChange={() => handleRatingClick(star)}
                    checked={selectedRatings.includes(star)}
                    className='form-checkbox text-color2'
                  />
                  <span className='flex items-center'>
                    {'★'.repeat(star)}{'☆'.repeat(5 - star)}
                    <span className='ml-2'>{star} Star{star > 1 ? 's' : ''}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Lists */}
          <div className='flex-grow h-screen rounded-lg max-w-full lg:max-w-[1000px] space-x-6 p-4'>
            <div className='flex justify-center flex-wrap overflow-y-auto max-h-full scrollbar-hide'>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, index) => (
                  <div key={index} className='bg-white  m-2 hover:scale-105 duration-400 gap-4 p-3 rounded-lg shadow-slate-400 border-2 shadow-md mb-4'>
                    {/* Main Image */}
                    <img 
                      src={activity.image} 
                      alt={activity.name} 
                      className='w-full h-48 object-cover rounded-lg mb-4'
                    />

                    {/* Categories (Tags) */}
                    <div className='flex gap-2 mb-2'>
                      {activity.tags.map((tag, index) => (
                        <button
                          key={index}
                          className='bg-color2 flex items-center justify-center gap-2 text-color3 text-xs px-2 py-1 rounded-md'>
                          {icons[tag]} {tag}
                        </button>
                      ))}
                    </div>

                    {/* Business Name */}
                    <h2 className='text-xl font-semibold mb-2'>{activity.name}</h2>

                    {/* Description / About */}
                    <p>{activity.description}</p>
                    <p className='text-gray-700 mt-2'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    {/* Location / Destination */}
                    <div className='flex items-center gap-2 mt-2 text-sm text-gray-500'>
                      <MdOutlineSurfing />
                      <span>{activity.destination}</span>
                    </div>

                    {/* Ratings */}
                    <div className='flex justify-between items-center mt-4'>
                      <span className='text-yellow-500'>{'★'.repeat(activity.rating)}{'☆'.repeat(5 - activity.rating)}</span>

                        {/* View Details Button */}
                    <Button onPress={onOpen} className=' text-color2 font-semibold'>
                      VIEW DETAILS &gt;
                    </Button>
                    </div>
 

                    {/* Modal */}
                    <Modal 
                      backdrop="opaque" 
                      isOpen={isOpen} 
                      onOpenChange={onOpenChange}
                      classNames={{
                        backdrop: "bg-light/20"
                      }}
                      motionProps={{
                        variants: {
                          enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                              duration: 0.2,
                              ease: "easeOut",
                            },
                          },
                          exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                              duration: 0.2,
                              ease: "easeIn",
                            },
                          },
                        }
                      }}
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className=''>
                              <div>{activity.name}</div>
                            </ModalHeader>
                            <ModalBody>
                              <p>{activity.description}</p>
                              <p className='text-gray-700 mt-2'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              </p>
                              <p className='text-gray-700 mt-2'>
                                Location/Destination details go here.
                              </p>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="danger" variant="light" onPress={onClose}>
                                Close
                              </Button>
                              <Button className='text-color3 bg-color1 hover:bg-color2 duration-500' onPress={onClose}>
                                Explore
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                ))
              ) : (
                <p>Select an activity to see more details.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Activities;

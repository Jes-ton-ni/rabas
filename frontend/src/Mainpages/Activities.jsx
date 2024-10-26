import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/nav';
import Hero from '../components/heroactivity';
import Footer from '@/components/Footer';
import pic1 from '../assets/donsol.jpg';
import { Button, Spinner } from "@nextui-org/react";
import { Checkbox, CheckboxGroup, Select, SelectItem, Slider } from "@nextui-org/react";
import { GiPositionMarker } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Search from '@/components/Search';


// Custom hook to detect if the screen is large
const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isLargeScreen;
};

const Activities = () => {
  // State Variables
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [budgetRange, setBudgetRange] = useState([0, 10000]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const isLargeScreen = useIsLargeScreen();

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Spinner className='flex justify-center items-center h-screen' size='lg' label="Loading..." color="primary" />;
  }

  const handleActivityChange = (selected) => {
    setSelectedActivities(selected);
  };

  const handleAmenitiesChange = (selected) => {
    setSelectedAmenities(selected);
  };

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

  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
  };

  const handleBudgetChange = (value) => {
    setBudgetRange(value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Activity Details
  const activityDetails = [
    {
      name: 'Beautiful Beach',
      description: 'Relax and enjoy the scenic beach view.',
      image: pic1,
      tags: ['Swimming', 'Surfing'],
      amenities: ['Parking', 'Restrooms'],
      rating: 5,
      destination: 'Donsol',
      budget: '500-2000',
      category: 'Relaxation',
    },
    {
      name: 'Mountain Adventure',
      description: 'Hike through the mountains and enjoy nature.',
      image: pic1,
      tags: ['Hiking', 'Camping'],
      amenities: ['Guides', 'Parking'],
      rating: 4,
      destination: 'Bulusan',
      budget: '250-3000',
      category: 'Adventure',
    },
    {
      name: 'Cultural Tour',
      description: 'Discover the local history and culture.',
      image: pic1,
      tags: ['Tour', 'History'],
      amenities: ['Guides'],
      rating: 4,
      destination: 'Sorsogon City',
      budget: '30-1500',
      category: 'Tour',
    },
    {
      name: 'Snorkeling Expedition',
      description: 'Explore underwater life.',
      image: pic1,
      tags: ['Swimming', 'Snorkeling'],
      amenities: ['Guides', 'Restrooms'],
      rating: 5,
      destination: 'Matnog',
      budget: '500-3500',
      category: 'Adventure',
    },
    {
      name: 'Camping Retreat',
      description: 'Spend the night under the stars.',
      image: pic1,
      tags: ['Camping'],
      amenities: ['Parking', 'Restrooms'],
      rating: 4,
      destination: 'Bulan',
      budget: '40-800',
      category: 'Adventure',
    },
    // Add more mock activities here...
  ];

  // Filtering Logic
  const filteredActivities = activityDetails.filter((activity) => {
    const matchesActivityType =
      selectedActivities.length === 0 || selectedActivities.every((type) => activity.tags.includes(type));

    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((amenity) => activity.amenities.includes(amenity));

    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(activity.rating);

    const matchesDestination =
      selectedDestination === 'All' || activity.destination === selectedDestination;

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(activity.category);

    const [minBudget, maxBudget] = activity.budget.split('-').map(Number);
    const matchesBudget =
      minBudget >= budgetRange[0] && maxBudget <= budgetRange[1];

    return matchesActivityType && matchesAmenities && matchesRating && matchesDestination && matchesCategory && matchesBudget;
  });

  // Dropdown Options
  const destinations = [
    'All', 'Bulusan', 'Bulan', 'Barcelona', 'Casiguran', 'Castilla', 'Donsol', 'Gubat', 'Irosin', 'Juban', 'Magallanes', 'Matnog', 'Pilar', 'Prieto Diaz', 'Sta. Magdalena', 'Sorsogon City',
  ];

  const categories = ['Adventure', 'Tour', 'Relaxation', 'Water Sports', 'Cultural', 'Nature'];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
      <Search/>

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='font-semibold text-3xl text-color1 mb-8'>Activities in Sorsogon</h1>

        {/* Toggle Button for Filters */}
        <div className="lg:hidden mb-4 sticky top-[7.5rem] z-40 bg-white">
          <Button onClick={toggleFilters} className="w-full bg-color1 text-color3">
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Conditionally render filters based on screen size and toggle state */}
          {(showFilters || isLargeScreen) && (
            <div className='w-full lg:w-1/4'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-semibold mb-4'>Filters</h2>
                {/* Filter components go here */}
                <CheckboxGroup
                  label="Activity Type"
                  value={selectedActivities}
                  onChange={handleActivityChange}
                >
                  {categories.map((category) => (
                    <Checkbox key={category} value={category}>
                      {category}
                    </Checkbox>
                  ))}
                </CheckboxGroup>

                <CheckboxGroup
                  label="Amenities"
                  value={selectedAmenities}
                  onChange={handleAmenitiesChange}
                >
                  {['Parking', 'Restrooms', 'Guides'].map((amenity) => (
                    <Checkbox key={amenity} value={amenity}>
                      {amenity}
                    </Checkbox>
                  ))}
                </CheckboxGroup>

                <Select
                  label="Destination"
                  value={selectedDestination}
                  onChange={handleDestinationChange}
                >
                  {destinations.map((destination) => (
                    <SelectItem key={destination} value={destination}>
                      {destination}
                    </SelectItem>
                  ))}
                </Select>

                <Slider
                  label="Budget Range"
                  step={100}
                  minValue={0}
                  maxValue={10000}
                  value={budgetRange}
                  onChange={setBudgetRange}
                  formatOptions={{ style: 'currency', currency: 'PHP' }}
                />
                <div className='flex justify-between text-xs'>
                  <span>₱{budgetRange[0]}</span>
                  <span>₱{budgetRange[1]}+</span>
                </div>

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
          )}

          {/* Activity List */}
          <div className='w-full'>
            <motion.div 
              className='grid grid-cols-1 gap-6 overflow-y-auto max-h-[1000px] scrollbar-custom  p-4'
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
                      <div className='flex items-center justify-between gap-2'>
                        {/* Category Badge */}
                        <div className='mb-2'>
                          <span className='inline-block bg-color2 text-white text-xs px-2 py-1 rounded-full'>
                            {activity.category}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <div className='flex items-center gap-1 '>
                            <span className='text-black text-[12px] '>{activity.rating}</span> 
                            <span className='text-yellow-500'>
                              {'★'.repeat(activity.rating)}{'☆'.repeat(5 - activity.rating)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h3 className='font-semibold text-lg text-color1'>{activity.name}</h3>
                      <div className='text-xs text-gray-500 mb-2 flex items-center'>
                        <GiPositionMarker/> {activity.destination}
                      </div>
                      <div className=' flex mb-2  max-w-[500px] max-h-[5rem] overflow-y-auto scrollbar-custom  flex-col '>      
                        <p className='text-sm text-gray-600 mb-2'>{activity.description}</p>
                      </div>
                      <p className='font-semibold text-md mb-2'>₱{activity.budget}</p>
                      <Link to="/business" target='_blank'>
                        <Button 
                          className='w-full bg-color1 text-color3 hover:bg-color2'
                        >
                          Explore More
                        </Button>
                      </Link>
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
    </div>
  );
};

export default Activities;
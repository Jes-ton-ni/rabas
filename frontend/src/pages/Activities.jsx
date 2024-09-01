import React, { useState } from 'react';
import { FaSwimmer, FaCampground, FaHiking, FaWater, FaUmbrellaBeach} from 'react-icons/fa';
import Nav from '../components/nav';
import Hero from '../components/heroactivity';
import Search from '../components/Search';
import Footer from '@/components/Footer';
import pic1 from '../assets/donsol.jpg'
import { MdOutlineSurfing } from "react-icons/md";

const Activities = () => {
  const [selectedActivities, setSelectedActivities] = useState(['All']);

  const handleClick = (activity) => {
    if (activity === 'All') {
      setSelectedActivities(['All']);
    } else {
      setSelectedActivities((prevSelected) =>
        prevSelected.includes(activity)
          ? prevSelected.filter((a) => a !== activity)
          : [...prevSelected.filter((a) => a !== 'All'), activity]
      );
    }
  };

  const icons = {
    Diving: <FaSwimmer />,
    Camping: <FaCampground />,
    Hiking: <FaHiking />,
    'Island Hopping': <FaWater />,
    Swimming: <FaUmbrellaBeach />,
    Surfing: <MdOutlineSurfing />,
  };

  const activityDetails = [
    {
      name: 'Beautiful Beach',
      description: 'Relax and enjoy the scenic beach view.',
      image: pic1,
      tags: ['Swimming', 'Surfing', 'Relaxation'],
    },
    {
      name: 'Mountain Adventure',
      description: 'Hike through the mountains and enjoy nature.',
      image: pic1,
      tags: ['Hiking', 'Camping'],
    },
    {
      name: 'Island Exploration',
      description: 'Hop from one island to another and explore.',
      image: pic1,
      tags: ['Island Hopping', 'Swimming', 'Diving'],
    },
    {
      name: 'Coral Reef Diving',
      description: 'Dive into the sea and explore coral reefs.',
      image: pic1,
      tags: ['Diving'],
    },
    {
      name: 'Forest Camp',
      description: 'Camp in the forest and enjoy the wilderness.',
      image: pic1,
      tags: ['Camping', 'Hiking'],
    },
    {
      name: 'Surfing Paradise',
      description: 'Catch the waves and enjoy surfing.',
      image: pic1,
      tags: ['Surfing'],
    },
  ];

  const filteredActivities =
    selectedActivities.includes('All') || selectedActivities.length === 0
      ? activityDetails
      : activityDetails.filter((activity) =>
          selectedActivities.some((selected) => activity.tags.includes(selected))
        );

  return (
    <div className='mx-auto bg-light min-h-screen font-sans'>
      {/** Nav */}
      <div><Nav /></div>

      {/** Hero */}
      <div><Hero /></div>

      {/** Search */}
      <div><Search /></div>

      {/** Contents */}
      <div className='m-4 mx-auto w-full container bg-light p-6 sm:p-9 rounded-lg'>
        <div className='flex p-4 ml-2 mb-3'>
          <h1 className='font-semibold text-2xl text-color1'>Things To Do in Sorsogon</h1>
        </div>

        <div className='flex flex-col lg:flex-row p-4 gap-8 lg:gap-24'>
          <div className='bg-light w-full lg:w-[300px]'>
            <div className='p-4'>
              <h1 className='text-dark text-xl'>Activity Types</h1>
            </div>
            <div className='p-4 flex flex-wrap gap-3'>
              {/* "All" Filter Button */}
              <button
                onClick={() => handleClick('All')}
                className={`flex items-center gap-2 text-color3 px-2 py-2 font-normal rounded-xl transition-all duration-300 ${
                  selectedActivities.includes('All') ? 'bg-color2/70' : 'bg-color1'
                }`}
              >
                All
              </button>
              {/* Other Filter Buttons with Icons */}
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
          </div>

          {/** Lists */}
          <div className='flex-grow h-screen rounded-lg max-w-full lg:max-w-[1000px] p-4'>
            <div className='flex justify-center flex-wrap overflow-y-auto max-h-full scrollbar-hide'>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, index) => (
                  <div key={index} className='bg-light w-full sm:w-[300px] p-4 rounded-lg shadow-slate-400 border-2 shadow-md mb-4'>
                    <img 
                      src={activity.image} 
                      alt={activity.name} 
                      className='w-full h-48 object-cover rounded-lg mb-4'
                    />
                    <h2 className='text-xl font-semibold mb-2'>{activity.name}</h2>
                    <p>{activity.description}</p>
                    <p className='text-gray-700 mt-2'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                ))
              ) : (
                <p>Select an activity to see more details.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/** Footer */}
      <Footer />
    </div>
  );
};

export default Activities;

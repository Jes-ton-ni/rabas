import React, { useState } from 'react';
import Nav from '../components/nav';
import Hero from '../components/herofood';
import Search from '@/components/Search';
import Footer from '@/components/Footer';
import Antonio from '../assets/antonio.jpg';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const Food = () => {
    const [selectedType, setSelectedType] = useState('All');
    const [selectedDestination, setSelectedDestination] = useState('All');
    const [selectedCuisine, setSelectedCuisine] = useState('All');
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Food Details
    const foodDetails = [
        {
            name: 'Sample Restaurant 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: Antonio,
            tags: ['Restaurant'],
            cuisine: 'Filipino',
            features: ['Wi-Fi', 'Outdoor Seating'],
            destination: 'Sorsogon City',
            rating: 4
        },
        {
            name: 'Sample Bar 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: Antonio,
            tags: ['Bar'],
            cuisine: 'International',
            features: ['Live Music', 'Happy Hour'],
            destination: 'Gubat',
            rating: 5
        },
        // Add more food establishments as needed
    ];

    const destinations = [
        'All', 'Bulusan', 'Bulan', 'Barcelona', 'Casiguran', 'Castilla', 'Donsol', 'Gubat', 'Irosin', 'Juban', 'Magallanes', 'Matnog', 'Pilar', 'Prieto Diaz', 'Sta. Magdalena', 'Sorsogon City'
    ];

    const types = ['All', 'Restaurant', 'Bar'];
    const cuisines = ['All', 'Filipino', 'International', 'Chinese', 'Japanese', 'Italian'];
    const features = ['Wi-Fi', 'Outdoor Seating', 'Live Music', 'Happy Hour', 'Family-Friendly', 'Vegan Options'];

    // Handle feature selection
    const handleFeatureClick = (feature) => {
        setSelectedFeatures((prevSelected) =>
            prevSelected.includes(feature)
                ? prevSelected.filter((f) => f !== feature)
                : [...prevSelected, feature]
        );
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

    // Filter the food establishments based on the selected filters
    const filteredFood = foodDetails.filter((food) => {
        const matchDestination = selectedDestination === 'All' || food.destination === selectedDestination;
        const matchType = selectedType === 'All' || food.tags.includes(selectedType);
        const matchCuisine = selectedCuisine === 'All' || food.cuisine === selectedCuisine;
        const matchFeatures = selectedFeatures.length === 0 || selectedFeatures.every(f => food.features.includes(f));
        const matchRating = selectedRatings.length === 0 || selectedRatings.includes(food.rating);
        return matchDestination && matchType && matchCuisine && matchFeatures && matchRating;
    });

    return (
        <div className='mx-auto bg-light min-h-screen font-sans'>
            <div><Nav /></div>
            <div><Hero /></div>
            <div><Search /></div>

            <div className='m-4 mx-auto w-full container bg-light p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg'>
                <div className='flex p-4 ml-2 mb-3'>
                    <h1 className='font-semibold text-2xl text-color1'>Food in Sorsogon</h1>
                </div>
                 
                <div className='flex flex-col lg:flex-row gap-8'>
                    <div className='w-full lg:w-[300px]'>
                        {/* Destination Dropdown */}
                        <div className='p-4'>
                            <h1 className='text-dark text-xl mb-2'>Destinations</h1>
                            <Select
                                className='max-w-[190px]'
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

                        {/* Type Dropdown */}
                        <div className='p-4'>
                            <h1 className='text-dark text-xl mb-2'>Type</h1>
                            <Select
                                className='max-w-[190px]'
                                placeholder="Select Type"
                                selectedKeys={[selectedType]}
                                onSelectionChange={(value) => setSelectedType(value.currentKey)}
                            >
                                {types.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* Cuisine Dropdown */}
                        <div className='p-4'>
                            <h1 className='text-dark text-xl mb-2'>Cuisine</h1>
                            <Select
                                className='max-w-[190px]'
                                placeholder="Select Cuisine"
                                selectedKeys={[selectedCuisine]}
                                onSelectionChange={(value) => setSelectedCuisine(value.currentKey)}
                            >
                                {cuisines.map((cuisine) => (
                                    <SelectItem key={cuisine} value={cuisine}>
                                        {cuisine}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        {/* Features Checkboxes */}
                        <div className='p-4'>
                            <h1 className='text-dark text-xl mb-2'>Features</h1>
                            <div className='flex flex-col gap-2'>
                                {features.map((feature) => (
                                    <label key={feature} className='flex items-center gap-2'>
                                        <input
                                            type='checkbox'
                                            onChange={() => handleFeatureClick(feature)}
                                            checked={selectedFeatures.includes(feature)}
                                            className='form-checkbox text-color2'
                                        />
                                        <span>{feature}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Ratings Filter */}
                        <div className='p-4'>
                            <h1 className='text-dark text-xl mb-2'>Ratings</h1>
                            <div className='flex flex-col gap-2'>
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
                    </div>

                    {/* Lists */}
                    <div className=' flex-grow h-screen rounded-lg max-w-full lg:max-w-[1000px] space-x-6 p-4'>
                        <div className='flex justify-center flex-wrap overflow-y-auto max-h-full scrollbar-hide'>
                            {filteredFood.length > 0 ? (
                                filteredFood.map((food, index) => (
                                    <div key={index} className='bg-white  m-2 hover:scale-105 duration-400 gap-4 p-3 rounded-lg shadow-slate-400 border-2 shadow-md mb-4'>
                                        <img
                                            src={food.image}
                                            alt={food.name}
                                            className='w-full h-40 object-cover rounded-lg mb-4'
                                        />
                                        <div className='flex gap-2 mb-2'>
                                            {food.tags.map((tag, index) => (
                                                <button
                                                    key={index}
                                                    className='bg-color2 flex items-center justify-center gap-2 text-color3 text-xs px-2 py-1 rounded-md'>
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                        <h2 className='text-lg font-semibold mb-2'>{food.name}</h2>
                                        <p className='text-sm'>{food.description}</p>
                                        <div className='flex items-center gap-2 mt-2 text-xs text-gray-500'>
                                            <span>{food.destination}</span>
                                        </div>
                                        <div className='mt-2'>
                                            <span className='text-sm font-semibold'>Cuisine: </span>
                                            <span className='text-sm'>{food.cuisine}</span>
                                        </div>
                                        <div className='flex items-center mt-2'>
                                            <span className='text-yellow-500'>{'★'.repeat(food.rating)}{'☆'.repeat(5 - food.rating)}</span>
                                        </div>
                                        <Button onPress={onOpen} className='mt-4 text-color2 font-semibold'>
                                            VIEW DETAILS &gt;
                                        </Button>

                                        {/* Modal */}
                                        <Modal
                                            backdrop="opaque"
                                            isOpen={isOpen}
                                            onOpenChange={onOpenChange}
                                            classNames={{
                                                backdrop: "bg-light/20"
                                            }}
                                        >
                                            <ModalContent>
                                                {(onClose) => (
                                                    <>
                                                        <ModalHeader className=''>
                                                            <div>{food.name}</div>
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <p>{food.description}</p>
                                                            <p className='text-gray-700 mt-2'>
                                                                Cuisine: {food.cuisine}
                                                            </p>
                                                            <p className='text-gray-700 mt-2'>
                                                                Features: {food.features.join(', ')}
                                                            </p>
                                                            <p className='text-gray-700 mt-2'>
                                                                Location: {food.destination}
                                                            </p>
                                                            <div className='flex items-center mt-2'>
                                                                <span className='text-yellow-500'>{'★'.repeat(food.rating)}{'☆'.repeat(5 - food.rating)}</span>
                                                            </div>
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
                                <p>No food establishments match your selected filters.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div><Footer /></div>
        </div>
    )
}

export default Food;
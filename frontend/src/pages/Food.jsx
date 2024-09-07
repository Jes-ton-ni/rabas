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
            <Nav />
            <Hero />
            <Search />

            {/** content */}

            <div className='mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
                <h1 className='font-semibold text-3xl text-color1 mb-8'>Food in Sorsogon</h1>
                 
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
                            <div className='mb-6'>
                                <h3 className='text-sm font-medium text-gray-700 mb-2'>Type</h3>
                                <Select
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
                            <div className='mb-6'>
                                <h3 className='text-sm font-medium text-gray-700 mb-2'>Cuisine</h3>
                                <Select
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
                            <div className='mb-6'>
                                <h3 className='text-sm font-medium text-gray-700 mb-2'>Features</h3>
                                <div className='space-y-2'>
                                    {features.map((feature) => (
                                        <label key={feature} className='flex items-center'>
                                            <input
                                                type='checkbox'
                                                onChange={() => handleFeatureClick(feature)}
                                                checked={selectedFeatures.includes(feature)}
                                                className='form-checkbox text-color2'
                                            />
                                            <span className='ml-2 text-sm'>{feature}</span>
                                        </label>
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

                    {/* Food List */}
                    <div className=' w-full '>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[1000px] scrollbar-hide p-4' >
                            {filteredFood.length > 0 ? (
                                filteredFood.map((food, index) => (
                                    <div key={index} className='bg-white rounded-lg shadow-md hover:scale-105 duration-300 '>
                                        <img
                                            src={food.image}
                                            alt={food.name}
                                            className='w-full h-48 object-cover rounded-t-lg'
                                        />
                                        <div className='p-4'>
                                            <div className='flex flex-wrap gap-2 mb-2'>
                                                {food.tags.map((tag, index) => (
                                                    <span key={index} className='bg-color2 text-color3 text-xs px-2 py-1 rounded-full'>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className='text-lg font-semibold mb-2'>{food.name}</h2>
                                            <p className='text-sm text-gray-600 mb-2'>{food.description}</p>
                                            <div className='text-xs text-gray-500 mb-2'>{food.destination}</div>
                                            <div className='mb-2'>
                                                <span className='text-sm font-semibold'>Cuisine: </span>
                                                <span className='text-sm'>{food.cuisine}</span>
                                            </div>
                                            <div className='flex items-center mb-4'>
                                                <span className='text-yellow-500'>{'★'.repeat(food.rating)}{'☆'.repeat(5 - food.rating)}</span>
                                            </div>
                                            <Button onPress={onOpen} className='w-full bg-color1 text-color3 hover:bg-color2'>
                                                VIEW DETAILS
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='col-span-full text-center text-gray-500'>No food establishments match your selected filters.</p>
                            )}
                        </div>
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
                            <ModalHeader className="flex flex-col gap-1">Food Details</ModalHeader>
                            <ModalBody>
                                {/* Add food details here */}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
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

export default Food;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/nav';
import Hero from '../components/heroaccomodation';
import Search from '@/components/Search';
import Footer from '@/components/Footer';
import Antonio from '../assets/antonio.jpg';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { GiPositionMarker } from "react-icons/gi";

const Accomodation = () => {
    const [selectedAccommodation, setSelectedAccommodation] = useState('All');
    const [selectedDestination, setSelectedDestination] = useState('All');
    const [selectedRatings, setSelectedRatings] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Accommodation Details
    const accommodationDetails = [
        {
            name: 'Hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: Antonio,
            tags: ['Hotel'],
            rating: 5,
            destination: 'Sorsogon City'
        },
        {
            name: 'Innside',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: Antonio,
            tags: ['Inn'],
            rating: 5,
            destination: 'Gubat'
        },
        {
            name: 'Lodging House',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: Antonio,
            tags: ['Lodging'],
            rating: 5,
            destination: 'Barcelona'
        },
        // ... more accommodation details ...
    ];

    const destinations = [
        'All', 'Bulusan', 'Bulan', 'Barcelona', 'Casiguran', 'Castilla', 'Donsol', 'Gubat', 'Irosin', 'Juban', 'Magallanes', 'Matnog', 'Pilar', 'Prieto Diaz', 'Sta. Magdalena', 'Sorsogon City'
    ];

    const accommodations = ['All', 'Hotel', 'Inn', 'Lodging'];

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

    // Filter the accommodations based on the selected filters
    const filteredAccommodations = accommodationDetails.filter((accommodation) => {
        const matchDestination = selectedDestination === 'All' || accommodation.destination === selectedDestination;
        const matchType = selectedAccommodation === 'All' || accommodation.tags.includes(selectedAccommodation);
        const matchRating = selectedRatings.length === 0 || selectedRatings.includes(accommodation.rating);
        return matchDestination && matchType && matchRating;
    });

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

    // Animation variants for each accommodation card
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
                <h1 className='font-semibold text-3xl text-color1 mb-8'>Accommodations in Sorsogon</h1>
                 
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

                            {/* Accommodation Type Dropdown */}
                            <div className='mb-6'>
                                <h3 className='text-sm font-medium text-gray-700 mb-2'>Accommodation Type</h3>
                                <Select
                                    placeholder="Select Accommodation"
                                    selectedKeys={[selectedAccommodation]}
                                    onSelectionChange={(value) => setSelectedAccommodation(value.currentKey)}
                                >
                                    {accommodations.map((accommodation) => (
                                        <SelectItem key={accommodation} value={accommodation}>
                                            {accommodation}
                                        </SelectItem>
                                    ))}
                                </Select>
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

                    {/* Accommodation List */}
                    <div className='w-full'>
                        <motion.div 
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[1000px] scrollbar-hide p-4'
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredAccommodations.length > 0 ? (
                                filteredAccommodations.map((accommodation, index) => (
                                    <motion.div
                                        key={index}
                                        className='bg-white rounded-lg shadow-lg hover:shadow-slate-500 hover:scale-105 duration-300'
                                        variants={cardVariants}
                                    >
                                        <img
                                            src={accommodation.image}
                                            alt={accommodation.name}
                                            className='w-full h-48 object-cover rounded-t-lg'
                                        />
                                        <div className='p-4'>
                                            <div className='flex flex-wrap gap-2 mb-2'>
                                                {accommodation.tags.map((tag, index) => (
                                                    <span key={index} className='bg-color2 text-color3 text-xs px-2 py-1 rounded-full'>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className='text-lg font-semibold mb-2'>{accommodation.name}</h2>
                                            <p className='text-sm text-gray-600 mb-2'>{accommodation.description}</p>
                                            <div className='text-xs text-gray-500 mb-2 flex items-center'><GiPositionMarker/>{accommodation.destination}</div>
                                            <div className='flex items-center mb-4'>
                                                <span className='text-yellow-500'>{'★'.repeat(accommodation.rating)}{'☆'.repeat(5 - accommodation.rating)}</span>
                                            </div>
                                            <Button onPress={onOpen} className='w-full bg-color1 text-color3 hover:bg-color2'>
                                                VIEW DETAILS
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className='col-span-full text-center text-gray-500'>No accommodations match your selected filters.</p>
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
                            <ModalHeader className="flex flex-col gap-1">Accommodation Details</ModalHeader>
                            <ModalBody>
                                {/* Add accommodation details here */}
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
    )
}

export default Accomodation;
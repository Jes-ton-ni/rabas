import React, { useState } from 'react';
import Nav from '../components/nav';
import Hero from '../components/heroaccomodation';
import Search from '@/components/Search';
import Footer from '@/components/Footer';
import Antonio from '../assets/antonio.jpg';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

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

    return (
        <div className='mx-auto bg-light min-h-screen font-sans'>
            {/* Nav */}
            <div><Nav /></div>

            {/** Hero */}
            <div><Hero /></div>

            {/**Search */}
            <div><Search /></div>

            {/** Contents */}
            <div className='m-4 mx-auto w-full container bg-light p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg'>
                <div className='flex p-4 ml-2 mb-3'>
                    <h1 className='font-semibold text-2xl text-color1'>Accommodations in Sorsogon</h1>
                </div>
                 
                <div className='flex flex-col lg:flex-row gap-8'>
                    <div className=' w-full lg:w-[300px]'>
                        {/* Destination Dropdown */}
                        <div className='p-4 flex flex-wrap gap-4'>
                            <h1 className='text-dark text-xl'>Destinations</h1>
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

                        {/** Accommodation type */}
                        <div className='p-4 flex flex-wrap gap-4'>
                            <h1 className='text-dark text-xl'>Accommodation Type</h1>
                            <Select
                                className='max-w-[190px]'
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

                    {/** Lists */}
                    <div className=' flex-grow h-screen rounded-lg max-w-full lg:max-w-[1000px] space-x-6 p-4'>
                        <div className='flex justify-center flex-wrap overflow-y-auto max-h-full scrollbar-hide'>
                            {filteredAccommodations.length > 0 ? (
                                filteredAccommodations.map((accommodation, index) => (
                                    <div key={index} className='bg-white  m-2 hover:scale-105 duration-400 gap-4 p-3 rounded-lg shadow-slate-400 border-2 shadow-md mb-4'>
                                        {/* Main Image */}
                                        <img
                                            src={accommodation.image}
                                            alt={accommodation.name}
                                            className='w-full h-40 object-cover rounded-lg mb-4'
                                        />

                                        {/* Categories (Tags) */}
                                        <div className='flex gap-2 mb-2'>
                                            {accommodation.tags.map((tag, index) => (
                                                <button
                                                    key={index}
                                                    className='bg-color2 flex items-center justify-center gap-2 text-color3 text-xs px-2 py-1 rounded-md'>
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Business Name */}
                                        <h2 className='text-lg font-semibold mb-2'>{accommodation.name}</h2>

                                        {/* Description / About */}
                                        <p className='text-sm'>{accommodation.description}</p>

                                        {/* Location / Destination */}
                                        <div className='flex items-center gap-2 mt-2 text-xs text-gray-500'>
                                            <span>{accommodation.destination}</span>
                                        </div>

                                        {/* Ratings */}
                                        <div className='flex items-center mt-4'>
                                            <span className='text-yellow-500'>{'★'.repeat(accommodation.rating)}{'☆'.repeat(5 - accommodation.rating)}</span>
                                        </div>

                                        {/* View Details Button */}
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
                                                            <div>{accommodation.name}</div>
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <p>{accommodation.description}</p>
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
                                <p>Select an accommodation to see more details.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/** Footer */}
            <div><Footer /></div>
        </div>
    )
}

export default Accomodation;

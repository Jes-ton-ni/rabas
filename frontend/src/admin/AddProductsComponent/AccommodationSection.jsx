import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { Input, Button, Checkbox } from '@nextui-org/react';
import Slider from 'react-slick';
import { addAccommodation, updateAccommodation, deleteAccommodations } from '@/redux/accomodationSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch, FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';

const AccommodationSection = () => {
  // State Management
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAccommodationId, setEditingAccommodationId] = useState(null);
  const [accommodationName, setAccommodationName] = useState('');
  const [pricing, setPricing] = useState('');
  const [pricingUnit, setPricingUnit] = useState('');
  const [hasBooking, setHasBooking] = useState(false);
  const [inclusions, setInclusions] = useState('');
  const [inclusionList, setInclusionList] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState([]);
  const [accommodationType, setAccommodationType] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState([]);
  const [termsList, setTermsList] = useState([]); // New state for terms list

  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);
  const sliderRefs = useRef({});

  // Handlers for Inclusions
  const handleAddInclusion = () => {
    if (inclusions.trim()) {
      setInclusionList([...inclusionList, inclusions.trim()]);
      setInclusions('');
    }
  };

  const handleRemoveInclusion = (index) => {
    const updatedInclusionList = inclusionList.filter((_, i) => i !== index);
    setInclusionList(updatedInclusionList);
  };

  // Handlers for Terms and Conditions
  const handleAddTerm = () => {
    if (termsAndConditions.trim()) {
      setTermsList([...termsList, termsAndConditions.trim()]);
      setTermsAndConditions('');
    }
  };

  const handleRemoveTerm = (index) => {
    const updatedTermsList = termsList.filter((_, i) => i !== index);
    setTermsList(updatedTermsList);
  };

  // Handlers for Image Upload
  const handleImageUpload = (e) => {  
    const files = Array.from(e.target.files);  
    setImages((prevImages) => [...prevImages, ...files]);  
  };  

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Handlers for Deleting Selected Accommodations
  const handleDeleteSelected = () => {
    if (selectedAccommodations.length > 0) {
      dispatch(deleteAccommodations(selectedAccommodations));
      setSelectedAccommodations([]);
    }
  };

  // Handlers for Checkbox Changes
  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedAccommodations((prev) => [...prev, id]);
    } else {
      setSelectedAccommodations((prev) => prev.filter((accommodationId) => accommodationId !== id));
    }
  };

  // Handler for Form Submission (Add/Edit Accommodation)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (accommodationName && pricing && pricingUnit && accommodationType) {
      const newAccommodation = {
        id: isEditing ? editingAccommodationId : nanoid(),
        accommodationName,
        pricing,
        pricingUnit,
        hasBooking,
        inclusions: inclusionList,
        images: images.map((file) =>
          typeof file === 'string' ? file : URL.createObjectURL(file)
        ),
        accommodationType,
        termsAndConditions: termsList, // Include terms list
      };

      if (isEditing) {
        dispatch(updateAccommodation({ id: editingAccommodationId, updatedData: newAccommodation }));
      } else {
        dispatch(addAccommodation(newAccommodation));
      }

      // Reset form
      setModalOpen(false);
      resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  // Reset Form Fields
  const resetForm = () => {
    setAccommodationName('');
    setPricing('');
    setPricingUnit('');
    setInclusionList([]);
    setImages([]);
    setHasBooking(false);
    setIsEditing(false);
    setEditingAccommodationId(null);
    setAccommodationType('');
    setTermsAndConditions('');
    setTermsList([]); // Reset terms list
  };

  // Handler for Editing an Accommodation
  const handleEdit = (accommodation) => {
    setAccommodationName(accommodation.accommodationName);
    setPricing(accommodation.pricing);
    setPricingUnit(accommodation.pricingUnit);
    setInclusionList(accommodation.inclusions);
    setImages(accommodation.images);
    setHasBooking(accommodation.hasBooking);
    setEditingAccommodationId(accommodation.id);
    setIsEditing(true);
    setModalOpen(true);
    setAccommodationType(accommodation.accommodationType);
    setTermsList(accommodation.termsAndConditions || []); // Set terms list
  };

  // Slider Settings for Image Carousel
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Get Unique Accommodation Types for Tabs
  const uniqueAccommodationTypes = [...new Set(accommodations.map((accommodation) => accommodation.accommodationType))];

  return (
    <div className="max-h-[620px] p-3 w-full h-full rounded-xl shadow-gray-400 shadow-lg bg-white">
      {/* Header Section */}
      <div className="flex justify-between p-3 items-center">
        <div className="font-semibold text-xl mb-3 p-3 items-center gap-4 flex">
          <h1>Accommodations</h1>
          <div className='relative'>
            <Input
              placeholder='Search ...'
              className='w-72 pl-10 placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <FaSearch className='absolute top-2 left-3 text-gray-500' />
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            color="danger"
            onClick={handleDeleteSelected}
            disabled={!selectedAccommodations.length}
          >
            Delete Selected
          </Button>
          <Button
            color="primary"
            className="text-white hover:bg-color2"
            onPress={() => setModalOpen(true)}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs flex justify-start gap-3 mb-4">
        <Button
          onClick={() => setSelectedType('')}
          className={`border p-2 rounded-md transition duration-300 ease-in-out ${
            selectedType === ''
              ? 'bg-color1 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-color2 hover:text-white'
          }`}
        >
          All
        </Button>
        {uniqueAccommodationTypes.map((type) => (
          <Button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`border p-2 rounded-md transition duration-300 ease-in-out ${
              selectedType === type
                ? 'bg-color1 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-color2 hover:text-white'
            }`}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Accommodations List */}
      <div className="border-2 max-h-[430px] h-full flex flex-wrap overflow-auto p-4 gap-4">
        {accommodations
          .filter((accommodation) => !selectedType || accommodation.accommodationType === selectedType)
          .map((accommodation) => (
            <div
              key={accommodation.id}
              className="mb-4 p-3 border rounded-lg shadow-md w-60 h-auto bg-white transition duration-300 hover:shadow-lg"
            >
              {/* Accommodation Header */}
              <div className="flex mb-3 items-center gap-2 justify-between">
                <Button
                  size="sm"
                  color="success"
                  onClick={() => handleEdit(accommodation)}
                >
                  Edit
                </Button>
                <Checkbox
                  checked={selectedAccommodations.includes(accommodation.id)}
                  onChange={(e) => handleCheckboxChange(accommodation.id, e.target.checked)}
                />
              </div>

              {/* Accommodation Details */}
              <h2 className="text-sm font-bold">Accommodation Name: {accommodation.accommodationName}</h2>
              <p className="text-sm">
                <strong>Price:</strong> ₱{accommodation.pricing} {accommodation.pricingUnit}
              </p>
              <p className="text-sm">
                <strong>Booking Option:</strong> {accommodation.hasBooking ? 'Yes' : 'No'}
              </p>

              {/* Inclusions */}
              <h1 className='text-sm font-semibold'>Inclusions or Details:</h1>
              <ul className="list-disc overflow-auto h-24 pl-4 text-xs">
                {accommodation.inclusions.map((inclusion, i) => (
               
                  <li key={i}>{inclusion}</li>
                ))}
              </ul>

              {/* Terms and Conditions */}
              <h1 className='text-sm font-semibold'>Terms and Conditions:</h1>
              <ul className="list-disc overflow-auto h-24 pl-4 text-xs">
                {accommodation.termsAndConditions?.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>

              {/* Image Carousel */}
              {accommodation.images.length > 0 && (
                <div className="relative mt-4">
                  <Slider ref={(slider) => (sliderRefs.current[accommodation.id] = slider)} {...sliderSettings}>
                    {accommodation.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={`Accommodation ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg mt-2"
                        />
                      </div>
                    ))}
                  </Slider>
                  {/* Next and Previous buttons */}
                  <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                    onClick={() => sliderRefs.current[accommodation.id].slickPrev()}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                    onClick={() => sliderRefs.current[accommodation.id].slickNext()}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Modal for Adding/Editing Accommodations */}
      <Modal isOpen={modalOpen} onOpenChange={setModalOpen} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEditing ? 'Update Accommodation' : 'Add Your Accommodation'}
              </ModalHeader>
              <ModalBody>
                {/* Add/Edit Accommodation Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Accommodation Type */}
                  <div className="mb-4">
                    <Input
                      label="Accommodation Type"
                      placeholder="Enter the type of accommodation"
                      value={accommodationType}
                      onChange={(e) => setAccommodationType(e.target.value)}
                      fullWidth
                      required
                    />
                  </div>

                  {/* Accommodation Name */}
                  <div className="mb-4">
                    <Input
                      label="Accommodation Name"
                      placeholder="Enter the name of the accommodation"
                      value={accommodationName}
                      onChange={(e) => setAccommodationName(e.target.value)}
                      fullWidth
                      required
                    />
                  </div>

                  {/* Pricing with Unit */}
                  <div className="mb-4 flex space-x-2">
                    <div className="w-1/2">
                      <Input
                        label="Pricing"
                        placeholder="e.g. 300"
                        type="number"
                        value={pricing}
                        onChange={(e) => setPricing(e.target.value)}
                        fullWidth
                        required
                        min="0"
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        label="Pricing Unit"
                        placeholder="per night, per stay, etc."
                        value={pricingUnit}
                        onChange={(e) => setPricingUnit(e.target.value)}
                        fullWidth
                        required
                      />
                    </div>
                  </div>

                  {/* Booking Option */}
                  <div className="mb-4">
                    <Checkbox
                      isSelected={hasBooking}
                      onChange={(e) => setHasBooking(e.target.checked)}
                    >
                      Accommodation has booking option
                    </Checkbox>
                  </div>

                  {/* Terms and Conditions */}
                  {hasBooking && (
                    <div className="mb-4">
                      <Input
                        label="Terms and Conditions"
                        placeholder="Enter a term or condition"
                        value={termsAndConditions}
                        onChange={(e) => setTermsAndConditions(e.target.value)}
                        fullWidth
                      />
                      <Button
                        type="button"
                        color="primary"
                        className="mt-2 hover:bg-color2"
                        onClick={handleAddTerm}
                      >
                        Add Term or Condition
                      </Button>

                      {/* Terms List */}
                      <ul className="mt-3 flex items-center flex-wrap gap-3 pl-5 text-sm">
                        {termsList.map((item, index) => (
                          <li key={index} className="flex gap-3 items-center bg-light p-2 rounded-md">
                            {item}
                            <Button
                              auto
                              color="danger"
                              size="sm"
                              onClick={() => handleRemoveTerm(index)}
                            >
                              Remove
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Inclusions */}
                  <div className="mb-4">
                    <Input
                      label="Inclusions"
                      placeholder="Enter an inclusion or details about the accommodation"
                      value={inclusions}
                      onChange={(e) => setInclusions(e.target.value)}
                      fullWidth
                    />
                    <Button
                      type="button"
                      color="primary"
                      className="mt-2 hover:bg-color2"
                      onClick={handleAddInclusion}
                    >
                      Add Inclusions or Details
                    </Button>

                    {/* Inclusions List */}
                    <ul className="mt-3 flex items-center flex-wrap gap-3 pl-5 text-sm">
                      {inclusionList.map((item, index) => (
                        <li key={index} className="flex gap-3 items-center bg-light p-2 rounded-md">
                          {item}
                          <Button
                            auto
                            color="danger"
                            size="sm"
                            onClick={() => handleRemoveInclusion(index)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-4">
                    {/* Hidden input field */}
                    <input
                      id="imageUpload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {/* Label with FaImage icon to trigger the file input */}
                    <label
                      htmlFor="imageUpload"
                      className="flex items-center justify-center gap-2 cursor-pointer p-3 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <FaImage className="text-2xl text-gray-600" />
                      <span className="text-sm font-semibold text-gray-600">Upload Images</span>
                    </label>
                  </div>

                  {/* Uploaded Images Preview with Remove Option */}
                  <div className="mb-4 flex flex-wrap gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="flex gap-3 mb-2">
                        <img
                          src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                          alt={`Uploaded ${index + 1}`}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                        <Button
                          auto
                          color="danger"
                          size="xs"
                          onClick={() => handleRemoveImage(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" color='primary' className="w-full hover:bg-color2">
                    {isEditing ? 'Update Accommodation' : 'Add Accommodation'}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AccommodationSection;
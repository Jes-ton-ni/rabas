import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { Input, Button, Checkbox } from '@nextui-org/react';
import Slider from 'react-slick';
import { addActivity, updateActivity, deleteActivities } from '@/redux/activitiesSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch, FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';

const ActivitySections = () => {
  // State Management
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [activityName, setActivityName] = useState('');
  const [pricing, setPricing] = useState('');
  const [pricingUnit, setPricingUnit] = useState('');
  const [hasBooking, setHasBooking] = useState(false);
  const [inclusions, setInclusions] = useState('');
  const [inclusionList, setInclusionList] = useState([]);
  const [images, setImages] = useState([]); // Updated to store objects with url and title
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [activityType, setActivityType] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState([]);
  const [termsList, setTermsList] = useState([]); // New state for terms list

  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);
  const sliderRefs = useRef({});

  // Handlers for Inclusions
  const handleAddInclusion = useCallback(() => {
    if (inclusions.trim()) {
      setInclusionList([...inclusionList, inclusions.trim()]);
      setInclusions('');
    }
  }, [inclusions, inclusionList]);

  const handleRemoveInclusion = useCallback((index) => {
    const updatedInclusionList = inclusionList.filter((_, i) => i !== index);
    setInclusionList(updatedInclusionList);
  }, [inclusionList]);

  // Handlers for Terms and Conditions
  const handleAddTerm = useCallback(() => {
    if (termsAndConditions.trim()) {
      setTermsList([...termsList, termsAndConditions.trim()]);
      setTermsAndConditions('');
    }
  }, [termsAndConditions, termsList]);

  const handleRemoveTerm = useCallback((index) => {
    const updatedTermsList = termsList.filter((_, i) => i !== index);
    setTermsList(updatedTermsList);
  }, [termsList]);

  // Handlers for Image Upload
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);  
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      title: '',
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const handleImageTitleChange = (index, title) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].title = title;
      return updatedImages;
    });
  };

  const handleRemoveImage = useCallback((index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  }, [images]);

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (typeof image !== 'string') {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [images]);

  // Handlers for Deleting Selected Activities
  const handleDeleteSelected = useCallback(() => {
    if (selectedActivities.length > 0) {
      dispatch(deleteActivities(selectedActivities));
      setSelectedActivities([]);
    }
  }, [selectedActivities, dispatch]);

  // Handlers for Checkbox Changes
  const handleCheckboxChange = useCallback((id, isChecked) => {
    if (isChecked) {
      setSelectedActivities((prev) => [...prev, id]);
    } else {
      setSelectedActivities((prev) => prev.filter((activityId) => activityId !== id));
    }
  }, []);

  // Handler for Form Submission (Add/Edit Activity)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activityName && pricing && pricingUnit && activityType) {
      const newActivity = {
        id: isEditing ? editingActivityId : nanoid(),
        activityName,
        pricing,
        pricingUnit,
        hasBooking,
        inclusions: inclusionList,
        images: images.map((image) => ({
          url: image.url,
          title: image.title,
        })),
        activityType,
        termsAndConditions: termsList, // Include terms list
      };

      if (isEditing) {
        dispatch(updateActivity({ id: editingActivityId, updatedData: newActivity }));
      } else {
        dispatch(addActivity(newActivity));
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
    setActivityName('');
    setPricing('');
    setPricingUnit('');
    setInclusionList([]);
    setImages([]);
    setHasBooking(false);
    setIsEditing(false);
    setEditingActivityId(null);
    setActivityType('');
    setTermsAndConditions('');
    setTermsList([]); // Reset terms list
  };

  // Handler for Editing an Activity
  const handleEdit = (activity) => {
    setActivityName(activity.activityName);
    setPricing(activity.pricing);
    setPricingUnit(activity.pricingUnit);
    setInclusionList(activity.inclusions);
    setImages(activity.images);
    setHasBooking(activity.hasBooking);
    setEditingActivityId(activity.id);
    setIsEditing(true);
    setModalOpen(true);
    setActivityType(activity.activityType);
    setTermsList(activity.termsAndConditions || []); // Set terms list
  };

  // Slider Settings for Image Carousel
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Get Unique Activity Types for Tabs
  const uniqueActivityTypes = [...new Set(activities.map((activity) => activity.activityType))];

  return (
    <div className="max-h-[620px] p-3 w-full h-full rounded-xl shadow-gray-400 shadow-lg bg-white">
      {/* Header Section */}
      <div className="flex justify-between p-3 items-center">
        <div className="font-semibold text-xl mb-3 p-3 items-center gap-4 flex">
          <h1>Activities</h1>
          <div className="relative">
            <Input
              placeholder="Search ..."
              className="w-72 pl-10 placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute top-2 left-3 text-gray-500" />
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            color="danger"
            onClick={handleDeleteSelected}
            disabled={!selectedActivities.length}
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
        {uniqueActivityTypes.map((type) => (
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

      {/* Activities List */}
      <div className="border-2 max-h-[430px] h-full flex flex-wrap overflow-auto p-4 gap-4">
        {activities
          .filter((activity) => !selectedType || activity.activityType === selectedType)
          .map((activity) => (
            <div
              key={activity.id}
              className="mb-4 p-3 border rounded-lg shadow-md w-60 h-auto bg-white transition duration-300 hover:shadow-lg"
            >
              {/* Activity Header */}
              <div className="flex mb-3 items-center gap-2 justify-between">
                <Button size="sm" color="success" onClick={() => handleEdit(activity)}>
                  Edit
                </Button>
                <Checkbox
                  checked={selectedActivities.includes(activity.id)}
                  onChange={(e) => handleCheckboxChange(activity.id, e.target.checked)}
                />
              </div>

              {/* Activity Details */}
              <h2 className="text-sm font-bold">Activity Name: {activity.activityName}</h2>
              <p className="text-sm">
                <strong>Price:</strong> ₱{activity.pricing} {activity.pricingUnit}
              </p>
              <p className="text-sm">
                <strong>Booking Option:</strong> {activity.hasBooking ? 'Yes' : 'No'}
              </p>

              {/* Inclusions */}
              <h1 className='text-sm font-semibold'>Inclusions or Details:</h1>
              <ul className="list-disc overflow-auto h-24 pl-4 text-xs">
                {activity.inclusions.map((inclusion, i) => (
                  <li key={i}>{inclusion}</li>
                ))}
              </ul>

              {/* Terms and Conditions */}
              <h1 className='text-sm font-semibold'>Terms and Conditions:</h1>
              <ul className="list-disc overflow-auto h-24 pl-4 text-xs">
                {activity.termsAndConditions?.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>

              {/* Image Carousel */}
              {activity.images.length > 0 && (
                <div className="relative mt-4">
                  <Slider ref={(slider) => (sliderRefs.current[activity.id] = slider)} {...sliderSettings}>
                    {activity.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image.url}
                          alt={image.title || `Activity ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg mt-2"
                        />
                        <p className="text-xs text-center mt-1">{image.title}</p>
                      </div>
                    ))}
                  </Slider>
                  {/* Next and Previous buttons */}
                  <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                    onClick={() => sliderRefs.current[activity.id]?.slickPrev()}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                    onClick={() => sliderRefs.current[activity.id]?.slickNext()}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Modal for Adding/Editing Activities */}
      <Modal isOpen={modalOpen} onOpenChange={setModalOpen} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEditing ? 'Update Activity' : 'Add Your Activity'}
              </ModalHeader>
              <ModalBody>
                {/* Add/Edit Activity Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Activity Type */}
                  <div className="mb-4">
                    <Input
                      label="Activity Type"
                      placeholder="Enter the type of activity"
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      fullWidth
                      required
                    />
                  </div>

                  {/* Activity Name */}
                  <div className="mb-4">
                    <Input
                      label="Activity Name"
                      placeholder="Enter the name of the activity"
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
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
                        placeholder="per pax, per person, etc."
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
                      checked={hasBooking}
                      onChange={(e) => setHasBooking(e.target.checked)}
                    >
                      Activity has booking option
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
                      placeholder="Enter an inclusion or details about the activity"
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

                    {/* Text below the input */}
                    <p className="text-sm font-semibold mt-2 text-gray-500">
                      You can upload up to 5 images.
                    </p>
                  </div>

                  {/* Uploaded Images Preview with Title Input and Remove Option */}
                  <div className="mb-4 flex flex-wrap gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="flex flex-col gap-2 mb-2">
                        <img
                          src={image.url}
                          alt={`Uploaded ${index + 1}`}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                        <Input
                          placeholder="Enter image title"
                          value={image.title}
                          onChange={(e) => handleImageTitleChange(index, e.target.value)}
                          fullWidth
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
                  <Button type="submit" color="primary" className="w-full hover:bg-color2">
                    {isEditing ? 'Update Activity' : 'Add Activity'}
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

export default ActivitySections;

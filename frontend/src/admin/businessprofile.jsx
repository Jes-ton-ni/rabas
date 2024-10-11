import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/sidebar';
import { FaUpload, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { Tabs, Tab, Card, CardBody, Input, Button, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { businessIcons } from '../businesspage/BusinessComponents/businessIcons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  updateBusinessData,
  addFacility,
  updateFacility,
  removeFacility,
  updateFacilityIcon,
  addPolicy,
  updatePolicy,
  removePolicy,
  addPolicyItem,
  updatePolicyItem,
  removePolicyItem,
  addContactInfo,
  updateContactInfo,
  removeContactInfo,
  updateContactIcon,
  updateBusinessCard 
} from '../redux/businessSlice';

const BusinessProfile = () => {
  const dispatch = useDispatch();
  const businessData = useSelector((state) => state.business);
  const fileInputRef = useRef(null);
  const heroImagesInputRef = useRef(null);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [currentEditingField, setCurrentEditingField] = useState(null);
  const businessCard = useSelector((state) => state.business.businessCard);
  const [cardImage, setCardImage] = useState(businessCard.cardImage);
  const [description, setDescription] = useState(businessCard.description);
  const [location, setLocation] = useState(businessCard.location);
  const [priceRange, setPriceRange] = useState(businessCard.priceRange);

  const MySwal = withReactContent(Swal);

  // Handle updating the business card
  const handleUpdate = () => {
    if (!cardImage || !description || !location || !priceRange) {
      MySwal.fire({
        title: 'Error',
        text: 'Please fill in all fields for the business card.',
        icon: 'error',
        confirmButtonColor: '#0BDA51',
      });
      return;
    }
    dispatch(updateBusinessCard({ cardImage, description, location, priceRange }));
    MySwal.fire({
      title: 'Success',
      text: 'Business card updated successfully!',
      icon: 'success',
      confirmButtonColor: '#0BDA51',
    });
  };

  // Handle file upload for the business card image
  const handleCardImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCardImage(e.target.result); // Set the image as base64 string
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for business logo
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => dispatch(updateBusinessData({ businessLogo: e.target.result }));
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for hero images
  const handleHeroImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    dispatch(updateBusinessData({ heroImages: [...businessData.heroImages, ...newImages] }));
  };

  // Handle removing a hero image
  const handleRemoveHeroImage = (index) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This will remove the hero image.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0BDA51',
      cancelButtonColor: '#D33736',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateBusinessData({ heroImages: businessData.heroImages.filter((_, i) => i !== index) }));
        MySwal.fire({
          title: 'Removed!',
          text: 'The image has been removed.',
          icon: 'success',
          confirmButtonColor: '#0BDA51',
        });
      }
    });
  };

  // Handle removing a contact info
  const handleRemoveContactInfo = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This will remove the contact info.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0BDA51',
      cancelButtonColor: '#D33736',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeContactInfo({ id }));
        MySwal.fire({
          title: 'Removed!',
          text: 'The contact info has been removed.',
          icon: 'success',
          confirmButtonColor: '#0BDA51',
        });
      }
    });
  };

  // Handle removing a facility
  const handleRemoveFacility = (index) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This will remove the facility.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0BDA51',
      cancelButtonColor: '#D33736',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFacility({ index }));
        MySwal.fire({
          title: 'Removed!',
          text: 'The facility has been removed.',
          icon: 'success',
          confirmButtonColor: '#0BDA51',
        });
      }
    });
  };

  // Handle opening the icon picker modal
  const openIconModal = (field) => {
    setCurrentEditingField(field);
    setIsIconModalOpen(true);
  };

  // Handle icon selection
  const handleIconSelect = (iconName) => {
    if (currentEditingField.startsWith('contact-')) {
      const id = parseInt(currentEditingField.split('-')[1]);
      dispatch(updateContactIcon({ id, icon: iconName }));
    } else if (currentEditingField.startsWith('facility-')) {
      const index = parseInt(currentEditingField.split('-')[1]);
      dispatch(updateFacilityIcon({ index, icon: iconName }));
    }
    setIsIconModalOpen(false);
  };

  // Handle saving the entire profile
  const handleSave = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save the business profile?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0BDA51',
      cancelButtonColor: '#D33736',
      confirmButtonText: 'Yes, save it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement API call or save logic
        console.log('Saving business profile...', businessData);
        MySwal.fire({
          title: 'Saved!',
          text: 'Your business profile has been saved.',
          icon: 'success',
          confirmButtonColor: '#0BDA51',
        });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mx-auto bg-gray-100 font-sans">
      <Sidebar />
      
      <div className="flex-1 p-4 lg:p-8 max-h-screen overflow-y-auto">
        <div className='flex justify-between items-center mb-3'>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Business Profile</h1>
          <Button
            onClick={handleSave}
            className='bg-green-500 text-white hover:bg-green-600 transition flex items-center'
          >
            <FaSave className='mr-2' />
            Save Profile
          </Button>
        </div>
       
        <Tabs aria-label="Business Profile Sections" className="w-full">
          <Tab key="general" title="General Info">
            <Card>
              <CardBody>
              <h3 className="text-lg font-bold mb-4 p-5">Update Business Logo and Name</h3>
                <div className='flex flex-col lg:flex-row items-center mb-6 shadow-lg p-3 rounded-sm shadow-slate-400'>
                  <div className='relative w-24 h-24 lg:mr-6 mb-4 lg:mb-0'>
                        
                    {businessData.businessLogo ? (
                      <img
                        src={businessData.businessLogo}
                        alt="Business Logo"
                        className='w-full h-full object-cover rounded-full'
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-200 rounded-full flex items-center justify-center'>
                        <FaUpload className='text-gray-400 text-2xl' />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      className='hidden'
                      accept='image/*'
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className='absolute bottom-0 right-0 bg-color1 text-white p-2 rounded-full hover:bg-color2'
                    >
                      <FaUpload />
                    </button>
                  </div>
                  <Input
                    type="text"
                    value={businessData.businessName}
                    onChange={(e) => dispatch(updateBusinessData({ businessName: e.target.value }))}
                    placeholder="Enter Business Name"
                    className='text-xl lg:text-2xl font-semibold w-full'
                  />
                </div>

                <div className="mb-6 shadow-md rounded-md p-6 shadow-slate-400 ">
                  <h3 className="text-lg font-bold mb-4">Update Business Card</h3>
                  <div className="space-y-4">
                  <div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-1">Card Image</label>
  
  {/* Display the uploaded image preview if available */}
  {cardImage ? (
    <div className="relative w-full h-48 mb-3">
      <img
        src={cardImage}
        alt="Card Preview"
        className="w-full h-full object-cover rounded-md shadow-md"
      />
      <button
        onClick={() => setCardImage(null)}  // Option to clear the image
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
      >
        <FaTrash size={14} />
      </button>
    </div>
  ) : (
    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex justify-center items-center">
      <input 
        type="file"
        accept="image/*"
        onChange={handleCardImageUpload}
        className="hidden"
        id="cardImageUpload"
      />
      <label
        htmlFor="cardImageUpload"
        className="cursor-pointer bg-color1 text-white px-4 py-2 rounded-md hover:bg-color2 transition"
      >
        <FaUpload className="inline mr-2" />
        Upload Image
      </label>
    </div>
  )}
</div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={description || ''}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-color1"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={location || ''}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-color1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                      <input
                        type="text"
                        value={priceRange || ''}
                        onChange={(e) => setPriceRange(e.target.value)}
                        placeholder="Enter budget range"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-color1"
                      />
                    </div>
                    <button
                      onClick={handleUpdate}
                      className="mt-4 w-full bg-color1 text-white p-2 rounded-md hover:bg-color2 transition"
                    >
                      Update Business Card
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4">Business Card Preview</h3>
                  <div className="border border-gray-300 rounded-md p-4">
                    {cardImage && (
                      <img
                        src={cardImage}
                        alt="Business Card"
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Price Range:</strong> {priceRange}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="hero" title="Cover Photo">
            <Card>
              <CardBody>
                <h2 className="text-lg lg:text-xl font-semibold mb-4 text-gray-700">Cover Photo</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                  {businessData.heroImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Hero ${index + 1}`} className='w-full h-40 object-cover rounded-lg' />
                      <Button
                        onClick={() => handleRemoveHeroImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <FaTrash size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  ref={heroImagesInputRef}
                  onChange={handleHeroImagesUpload}
                  className='hidden'
                  accept='image/*'
                  multiple
                />
                <Button
                  onClick={() => heroImagesInputRef.current.click()}
                  className='bg-color1 text-white hover:bg-color2 transition'
                >
                  Upload Images
                </Button>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="about" title="About Us">
            <Card>
              <CardBody className='overflow-x-auto'>
                <h2 className="text-lg lg:text-xl font-semibold mb-4 text-gray-700">About Us</h2>
                <textarea
                  value={businessData.aboutUs}
                  onChange={(e) => dispatch(updateBusinessData({ aboutUs: e.target.value }))}
                  placeholder="Enter information about your business"
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />

                <h3 className="text-md lg:text-lg font-semibold mt-4 mb-2">Contact Information</h3>
                {businessData.contactInfo.map((info) => (
                  <div key={info.id} className='flex flex-col lg:flex-row items-center gap-2 mb-2'>
                    <Button onClick={() => openIconModal(`contact-${info.id}`)} className="min-w-[40px] h-[40px] p-0">
                      {React.createElement(businessIcons.find(icon => icon.name === info.icon)?.icon || FaPlus, { size: 20 })}
                    </Button>
                    <Input
                      type="text"
                      value={info.label}
                      onChange={(e) => dispatch(updateContactInfo({ id: info.id, field: 'label', value: e.target.value }))}
                      placeholder="Label (e.g. Email, Phone, Facebook)"
                      className='flex-grow'
                    />
                    <Input
                      type="text"
                      value={info.value}
                      onChange={(e) => dispatch(updateContactInfo({ id: info.id, field: 'value', value: e.target.value }))}
                      placeholder="Url if needed"
                      className='flex-grow'
                    />
                    <Button onClick={() => handleRemoveContactInfo(info.id)} className="bg-red-500 text-white p-2">
                      <FaTrash size={16} />
                    </Button>
                  </div>
                ))}
                <Button onClick={() => dispatch(addContactInfo())} className="mt-2 bg-color1 text-white hover:bg-color2 transition">Add Contact Info</Button>

                <h3 className="text-md lg:text-lg font-semibold mt-4 mb-2">Opening Hours</h3>
                {businessData.openingHours.map((hours, index) => (
                  <div key={index} className='flex flex-col lg:flex-row items-center gap-2 mb-2'>
                    <Input
                      type="text"
                      value={hours.day}
                      readOnly
                      className='w-full lg:w-1/4'
                    />
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => dispatch(updateBusinessData({ openingHours: businessData.openingHours.map((h, i) => i === index ? { ...h, open: e.target.value } : h) }))}
                      placeholder="Open"
                      className='w-full lg:w-1/4'
                    />
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => dispatch(updateBusinessData({ openingHours: businessData.openingHours.map((h, i) => i === index ? { ...h, close: e.target.value } : h) }))}
                      placeholder="Close"
                      className='w-full lg:w-1/4'
                    />
                  </div>
                ))}
              </CardBody>
            </Card>
          </Tab>

          <Tab key="facilities" title="Facilities & Amenities">
            <Card>
              <CardBody className='h-[300px] overflow-x-auto scrollbar-hide'>
                <h2 className="text-lg lg:text-xl font-semibold mb-4 text-gray-700">Facilities & Amenities</h2>
                <div className='flex justify-start flex-wrap gap-3'>
                  {businessData.facilities.map((facility, index) => (
                    <div key={index} className='flex lg:flex-row items-center gap-2 mb-2'>
                      <Button onClick={() => openIconModal(`facility-${index}`)} className="min-w-[40px] h-[40px] p-0">
                        {facility.icon ? React.createElement(businessIcons.find(icon => icon.name === facility.icon)?.icon, { size: 20 }) : <FaPlus size={20} />}
                      </Button>
                      <Input 
                        type="text"
                        value={facility.name}
                        onChange={(e) => dispatch(updateFacility({ index, field: 'name', value: e.target.value }))}
                        placeholder="Facility name"
                        className='w-[15rem]'
                      />
                      <Button onClick={() => handleRemoveFacility(index)} className="bg-red-500 text-white p-2">
                        <FaTrash size={16} />
                      </Button>
                    </div>                
                  ))}
                </div>
              </CardBody>
            </Card>
            <Button onClick={() => dispatch(addFacility())} className="mt-2 bg-color1 text-white hover:bg-color2 transition">Add Facility</Button>
          </Tab>

          <Tab key="policies" title="Policies">
            <Card>
              <CardBody>
                <h2 className="text-lg lg:text-xl font-semibold mb-4 text-gray-700">Policies</h2>
                {businessData.policies.map((policy, policyIndex) => (
                  <div key={policyIndex} className='mb-4'>
                    <Input
                      type="text"
                      value={policy.title}
                      onChange={(e) => dispatch(updatePolicy({ index: policyIndex, field: 'title', value: e.target.value }))}
                      placeholder="Policy title"
                      className='mb-2'
                    />
                    {policy.items.map((item, itemIndex) => (
                      <div key={itemIndex} className='flex flex-col lg:flex-row items-center gap-2 mb-2'>
                        <Input
                          type="text"
                          value={item}
                          onChange={(e) => dispatch(updatePolicyItem({ policyIndex, itemIndex, value: e.target.value }))}
                          placeholder="Policy item"
                          className='flex-grow'
                        />
                        <Button onClick={() => dispatch(removePolicyItem({ policyIndex, itemIndex }))} className="bg-red-500 text-white p-2">
                          <FaTrash size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => dispatch(addPolicyItem({ policyIndex }))} className="mr-2">Add Item</Button>
                    <Button onClick={() => dispatch(removePolicy({ policyIndex }))} className="bg-red-500 text-white">Remove Policy</Button>
                  </div>
                ))}
                <Button onClick={() => dispatch(addPolicy())} className="mt-2 bg-color1 text-white hover:bg-color2 transition">Add Policy</Button>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      <Modal isOpen={isIconModalOpen} onClose={() => setIsIconModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Select an Icon</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-4 gap-4">
              {businessIcons.map(({ name, icon: Icon }) => (
                <Button
                  key={name}
                  onClick={() => handleIconSelect(name)}
                  className="p-2 hover:bg-gray-100 flex items-center justify-center"
                >
                  <Icon size={24} />
                </Button>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BusinessProfile;

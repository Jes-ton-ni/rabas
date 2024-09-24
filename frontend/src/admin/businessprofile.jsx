import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/sidebar';
import { FaUpload, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { Tabs, Tab, Card, CardBody, Input, Button, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { businessIcons } from '../businesspage/BusinessComponents/businessIcons';
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
  updateContactIcon
} from '../redux/businessSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BusinessProfile = () => {
  const dispatch = useDispatch();
  const businessData = useSelector((state) => state.business);
  const fileInputRef = useRef(null);
  const heroImagesInputRef = useRef(null);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [currentEditingField, setCurrentEditingField] = useState(null);

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

  // Handle adding new contact info
  const handleAddContactInfo = () => {
    dispatch(addContactInfo());
  };

  // Handle changes in contact info
  const handleContactInfoChange = (id, field, value) => {
    dispatch(updateContactInfo({ id, field, value }));
  };

  // Handle removing contact info
  const handleRemoveContactInfo = (id) => {
    dispatch(removeContactInfo({ id }));
  };

  // Handle adding new facility
  const handleAddFacility = () => {
    dispatch(addFacility());
  };

  // Handle changes in facility info
  const handleFacilityChange = (index, field, value) => {
    console.log('Updating facility', { index, field, value });
    dispatch(updateFacility({ index, field, value }));
  };

  // Handle removing facility
  const handleRemoveFacility = (index) => {
    console.log('Removing facility', index);
    dispatch(removeFacility({ index }));
  };

  // Handle adding new policy
  const handleAddPolicy = () => {
    dispatch(addPolicy());
  };

  // Handle changes in policy info
  const handlePolicyChange = (index, field, value) => {
    console.log('Updating policy', { index, field, value });
    dispatch(updatePolicy({ index, field, value }));
  };

  // Handle removing policy
  const handleRemovePolicy = (index) => {
    console.log('Removing policy', index);
    dispatch(removePolicy({ index }));
  };

  // Handle adding new policy item
  const handleAddPolicyItem = (policyIndex) => {
    console.log('Adding policy item to policy', policyIndex);
    dispatch(addPolicyItem({ policyIndex }));
  };

  // Handle changes in policy item
  const handlePolicyItemChange = (policyIndex, itemIndex, value) => {
    console.log('Updating policy item', { policyIndex, itemIndex, value });
    dispatch(updatePolicyItem({ policyIndex, itemIndex, value }));
  };

  // Handle removing policy item
  const handleRemovePolicyItem = (policyIndex, itemIndex) => {
    console.log('Removing policy item', { policyIndex, itemIndex });
    dispatch(removePolicyItem({ policyIndex, itemIndex }));
  };

  // Handle changes in opening hours
  const handleOpeningHoursChange = (index, field, value) => {
    const updatedHours = [...businessData.openingHours];
    updatedHours[index][field] = value;
    dispatch(updateBusinessData({ openingHours: updatedHours }));
  };

  // Open icon modal
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

  // Handle save action
  const handleSave = () => {
    // Implement API call to save data
    console.log('Saving business profile...', businessData);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mx-auto  bg-gray-100 font-sans">
      <Sidebar />
      
      <div className="flex-1 p-4 lg:p-8 ">
      <div className='flex justify-between items-center mb-3'>
        <h1 className="text-2xl lg:text-3xl font-semibold   text-gray-800">Business Profile</h1>
        <Button
          onClick={handleSave}
          className=' bg-green-500 text-white hover:bg-green-600 transition flex items-center'
        >
          <FaSave className='mr-2' />
          Save Profile
        </Button>
        </div>
       
        <Tabs  aria-label="Business Profile Sections" className="w-full">
          <Tab key="general" title="General Info">
            <Card>
              <CardBody>
                <div className='flex flex-col lg:flex-row items-center mb-6'>
                  <div className='relative w-24 h-24 lg:mr-6 mb-4 lg:mb-0'>
                    {businessData.businessLogo ? (
                      <img src={businessData.businessLogo} alt="Business Logo" className='w-full h-full object-cover rounded-full' />
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
                        onClick={() => dispatch(updateBusinessData({ heroImages: businessData.heroImages.filter((_, i) => i !== index) }))}
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
                <ReactQuill
                  value={businessData.aboutUs}
                  onChange={(value) => dispatch(updateBusinessData({ aboutUs: value }))}
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
                      onChange={(e) => handleContactInfoChange(info.id, 'label', e.target.value)}
                      placeholder="Label (e.g. Email, Phone, Facebook)"
                      className='flex-grow'
                    />
                    <Input
                      type="text"
                      value={info.value}
                      onChange={(e) => handleContactInfoChange(info.id, 'value', e.target.value)}
                      placeholder="Url if needed"
                      className='flex-grow'
                    />
                    <Button onClick={() => handleRemoveContactInfo(info.id)} className="bg-red-500 text-white p-2">
                      <FaTrash size={16} />
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddContactInfo} className="mt-2 bg-color1 text-white hover:bg-color2 transition">Add Contact Info</Button>

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
                      onChange={(e) => handleOpeningHoursChange(index, 'open', e.target.value)}
                      placeholder="Open"
                      className='w-full lg:w-1/4'
                    />
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleOpeningHoursChange(index, 'close', e.target.value)}
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
                 <div className=' flex justify-start flex-wrap gap-3 '>
                {businessData.facilities.map((facility, index) => (
                
             
                    <div className='flex  lg:flex-row items-center gap-2 mb-2'>
                      <Button onClick={() => openIconModal(`facility-${index}`)} className="min-w-[40px] h-[40px] p-0">
                        {facility.icon ? React.createElement(businessIcons.find(icon => icon.name === facility.icon)?.icon, { size: 20 }): <FaPlus size={20} />}
                      </Button>
                      <Input 
                        type="text"
                        value={facility.name}
                        onChange={(e) => handleFacilityChange(index, 'name', e.target.value)}
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
            <Button onClick={handleAddFacility} className="mt-2 bg-color1 text-white hover:bg-color2 transition">Add Facility</Button>
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
                      onChange={(e) => handlePolicyChange(policyIndex, 'title', e.target.value)}
                      placeholder="Policy title"
                      className='mb-2'
                    />
                    {policy.items.map((item, itemIndex) => (
                      <div key={itemIndex} className='flex flex-col lg:flex-row items-center gap-2 mb-2'>
                        <Input
                          type="text"
                          value={item}
                          onChange={(e) => handlePolicyItemChange(policyIndex, itemIndex, e.target.value)}
                          placeholder="Policy item"
                          className='flex-grow'
                        />
                        <Button onClick={() => handleRemovePolicyItem(policyIndex, itemIndex)} className="bg-red-500 text-white p-2">
                          <FaTrash size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button onClick={() => handleAddPolicyItem(policyIndex)} className="mr-2">Add Item</Button>
                    <Button onClick={() => handleRemovePolicy(policyIndex)} className="bg-red-500 text-white">Remove Policy</Button>
                  </div>
                ))}
                <Button onClick={handleAddPolicy} className="mt-2 bg-color1 text-white hover:bg-color2 transition">Add Policy</Button>
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

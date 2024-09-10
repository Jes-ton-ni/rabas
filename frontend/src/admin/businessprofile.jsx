import React, { useState, useRef } from 'react'
import Sidebar from '../components/sidebar'
import { FaUpload, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import { Tabs, Tab, Card, CardBody, Input, Button, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useBusinessContext } from '../businesspage/BusinessComponents/BusinessContext'
import { businessIcons } from '../businesspage/BusinessComponents/businessIcons'

const BusinessProfile = () => {
  const { businessData, updateBusinessData } = useBusinessContext();
  const fileInputRef = useRef(null);
  const heroImagesInputRef = useRef(null);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [currentEditingField, setCurrentEditingField] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => updateBusinessData({ businessLogo: e.target.result })
      reader.readAsDataURL(file)
    }
  }

  const handleHeroImagesUpload = (event) => {
    const files = Array.from(event.target.files)
    const newImages = files.map(file => URL.createObjectURL(file))
    updateBusinessData({ heroImages: [...businessData.heroImages, ...newImages] })
  }

  const handleAddContactInfo = () => {
    updateBusinessData({
      contactInfo: [...businessData.contactInfo, { id: Date.now(), icon: 'FaPlus', label: '', value: '' }]
    })
  }

  const handleContactInfoChange = (id, field, value) => {
    updateBusinessData({
      contactInfo: businessData.contactInfo.map(info => 
        info.id === id ? { ...info, [field]: value } : info
      )
    })
  }

  const handleRemoveContactInfo = (id) => {
    updateBusinessData({
      contactInfo: businessData.contactInfo.filter(info => info.id !== id)
    })
  }

  const handleAddFacility = () => {
    updateBusinessData({
      facilities: [...businessData.facilities, { icon: null, name: '', description: '' }]
    })
  }

  const handleFacilityChange = (index, field, value) => {
    const updatedFacilities = [...businessData.facilities]
    updatedFacilities[index][field] = value
    updateBusinessData({ facilities: updatedFacilities })
  }

  const handleRemoveFacility = (index) => {
    const updatedFacilities = [...businessData.facilities]
    updatedFacilities.splice(index, 1)
    updateBusinessData({ facilities: updatedFacilities })
  }

  const handleAddPolicy = () => {
    updateBusinessData({
      policies: [...businessData.policies, { title: '', items: [''] }]
    })
  }

  const handlePolicyChange = (index, field, value) => {
    const updatedPolicies = [...businessData.policies]
    updatedPolicies[index][field] = value
    updateBusinessData({ policies: updatedPolicies })
  }

  const handleRemovePolicy = (index) => {
    const updatedPolicies = [...businessData.policies]
    updatedPolicies.splice(index, 1)
    updateBusinessData({ policies: updatedPolicies })
  }

  const handleAddPolicyItem = (policyIndex) => {
    const updatedPolicies = [...businessData.policies]
    updatedPolicies[policyIndex].items.push('')
    updateBusinessData({ policies: updatedPolicies })
  }

  const handlePolicyItemChange = (policyIndex, itemIndex, value) => {
    const updatedPolicies = [...businessData.policies]
    updatedPolicies[policyIndex].items[itemIndex] = value
    updateBusinessData({ policies: updatedPolicies })
  }

  const handleRemovePolicyItem = (policyIndex, itemIndex) => {
    const updatedPolicies = [...businessData.policies]
    updatedPolicies[policyIndex].items.splice(itemIndex, 1)
    updateBusinessData({ policies: updatedPolicies })
  }

  const handleAddNearbyPlace = () => {
    updateBusinessData({
      nearbyPlaces: [...businessData.nearbyPlaces, { icon: null, name: '', distance: '' }]
    })
  }

  const handleNearbyPlaceChange = (index, field, value) => {
    const updatedPlaces = [...businessData.nearbyPlaces]
    updatedPlaces[index][field] = value
    updateBusinessData({ nearbyPlaces: updatedPlaces })
  }

  const handleRemoveNearbyPlace = (index) => {
    const updatedPlaces = [...businessData.nearbyPlaces]
    updatedPlaces.splice(index, 1)
    updateBusinessData({ nearbyPlaces: updatedPlaces })
  }

  const handleOpeningHoursChange = (index, field, value) => {
    const updatedHours = [...businessData.openingHours]
    updatedHours[index][field] = value
    updateBusinessData({ openingHours: updatedHours })
  }

  const openIconModal = (field) => {
    setCurrentEditingField(field)
    setIsIconModalOpen(true)
  }

  const handleIconSelect = (iconName) => {
    if (currentEditingField.startsWith('contact-')) {
      const id = parseInt(currentEditingField.split('-')[1])
      handleContactInfoChange(id, 'icon', iconName)
    } else if (currentEditingField.startsWith('facility-')) {
      const index = parseInt(currentEditingField.split('-')[1])
      handleFacilityChange(index, 'icon', iconName)
    } else if (currentEditingField.startsWith('nearby-')) {
      const index = parseInt(currentEditingField.split('-')[1])
      handleNearbyPlaceChange(index, 'icon', iconName)
    }
    setIsIconModalOpen(false)
  }

  const handleAddReview = () => {
    updateBusinessData({
      reviews: [...(businessData.reviews || []), { id: Date.now(), name: '', rating: 0, comment: '', avatar: '' }]
    })
  }

  const handleReviewChange = (id, field, value) => {
    updateBusinessData({
      reviews: businessData.reviews.map(review => 
        review.id === id ? { ...review, [field]: value } : review
      )
    })
  }

  const handleRemoveReview = (id) => {
    updateBusinessData({
      reviews: businessData.reviews.filter(review => review.id !== id)
    })
  }

  const handleMapEmbedUrlChange = (value) => {
    updateBusinessData({ mapEmbedUrl: value })
  }

  const handleSave = () => {
    // Implement API call to save data
    console.log('Saving business profile...', businessData)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Business Profile</h1>

        <Tabs aria-label="Business Profile Sections">
          <Tab key="general" title="General Info">
            <Card>
              <CardBody>
                <div className='flex items-center mb-6'>
                  <div className='relative w-24 h-24 mr-6'>
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
                      className='absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition'
                    >
                      <FaUpload />
                    </button>
                  </div>
                  <Input
                    type="text"
                    value={businessData.businessName}
                    onChange={(e) => updateBusinessData({ businessName: e.target.value })}
                    placeholder="Enter Business Name"
                    className='text-2xl font-semibold'
                  />
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="hero" title="Hero Images">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Hero Images</h2>
                <div className='grid grid-cols-3 gap-4 mb-4'>
                  {businessData.heroImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Hero ${index + 1}`} className='w-full h-40 object-cover rounded-lg' />
                      <Button
                        onClick={() => updateBusinessData({ heroImages: businessData.heroImages.filter((_, i) => i !== index) })}
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
                  className='bg-blue-500 text-white hover:bg-blue-600 transition'
                >
                  Upload Hero Images
                </Button>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="about" title="About Us">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">About Us</h2>
                <ReactQuill
                  value={businessData.aboutUs}
                  onChange={(content) => updateBusinessData({ aboutUs: content })}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      [{ 'align': [] }],
                      [{ 'color': [] }, { 'background': [] }],
                      ['clean']
                    ]
                  }}
                />
                <h3 className="text-lg font-semibold mt-4 mb-2">Contact Information</h3>
                {businessData.contactInfo.map((info) => (
                  <div key={info.id} className='flex items-center gap-2 mb-2'>
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
                <Button onClick={handleAddContactInfo} className="mt-2">Add Contact Info</Button>

                <h3 className="text-lg font-semibold mt-4 mb-2">Opening Hours</h3>
                {businessData.openingHours.map((hours, index) => (
                  <div key={index} className='flex items-center gap-2 mb-2'>
                    <Input
                      type="text"
                      value={hours.day}
                      readOnly
                      className='w-1/4'
                    />
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => handleOpeningHoursChange(index, 'open', e.target.value)}
                      placeholder="Open"
                      className='w-1/4'
                    />
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleOpeningHoursChange(index, 'close', e.target.value)}
                      placeholder="Close"
                      className='w-1/4'
                    />
                  </div>
                ))}

                <h3 className="text-lg font-semibold mt-4 mb-2">Nearby Places</h3>
                {businessData.nearbyPlaces.map((place, index) => (
                  <div key={index} className='flex items-center gap-2 mb-2'>
                    <Button onClick={() => openIconModal(`nearby-${index}`)} className="min-w-[40px] h-[40px] p-0">
                      {place.icon ? React.createElement(businessIcons.find(icon => icon.name === place.icon)?.icon, { size: 20 }) : <FaPlus size={20} />}
                    </Button>
                    <Input
                      type="text"
                      value={place.name}
                      onChange={(e) => handleNearbyPlaceChange(index, 'name', e.target.value)}
                      placeholder="Place name"
                      className='flex-grow'
                    />
                    <Input
                      type="text"
                      value={place.distance}
                      onChange={(e) => handleNearbyPlaceChange(index, 'distance', e.target.value)}
                      placeholder="Distance"
                      className='w-1/4'
                    />
                    <Button onClick={() => handleRemoveNearbyPlace(index)} className="bg-red-500 text-white p-2">
                      <FaTrash size={16} />
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddNearbyPlace} className="mt-2">Add Nearby Place</Button>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="facilities" title="Facilities & Amenities">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Facilities & Amenities</h2>
                {businessData.facilities.map((facility, index) => (
                  <div key={index} className='mb-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Button onClick={() => openIconModal(`facility-${index}`)} className="min-w-[40px] h-[40px] p-0">
                        {facility.icon ? React.createElement(businessIcons.find(icon => icon.name === facility.icon)?.icon, { size: 20 }) : <FaPlus size={20} />}
                      </Button>
                      <Input
                        type="text"
                        value={facility.name}
                        onChange={(e) => handleFacilityChange(index, 'name', e.target.value)}
                        placeholder="Facility name"
                        className='flex-grow'
                      />
                      <Button onClick={() => handleRemoveFacility(index)} className="bg-red-500 text-white p-2">
                        <FaTrash size={16} />
                      </Button>
                    </div>
                    <ReactQuill
                      value={facility.description}
                      onChange={(content) => handleFacilityChange(index, 'description', content)}
                      modules={{
                        toolbar: [
                          ['bold', 'italic', 'underline'],
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          [{ 'align': [] }],
                          [{ 'color': [] }, { 'background': [] }],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                ))}
                <Button onClick={handleAddFacility} className="mt-2">Add Facility</Button>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="policies" title="Policies">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Policies</h2>
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
                      <div key={itemIndex} className='flex items-center gap-2 mb-2'>
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
                <Button onClick={handleAddPolicy} className="mt-2">Add Policy</Button>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="reviews" title="Reviews">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Reviews</h2>
                {businessData.reviews && businessData.reviews.map((review) => (
                  <div key={review.id} className='mb-4'>
                    <Input
                      type="text"
                      value={review.name}
                      onChange={(e) => handleReviewChange(review.id, 'name', e.target.value)}
                      placeholder="Customer Name"
                      className='mb-2'
                    />
                    <Input
                      type="number"
                      value={review.rating}
                      onChange={(e) => handleReviewChange(review.id, 'rating', parseInt(e.target.value))}
                      placeholder="Rating (1-5)"
                      min="1"
                      max="5"
                      className='mb-2'
                    />
                    <ReactQuill
                      value={review.comment}
                      onChange={(content) => handleReviewChange(review.id, 'comment', content)}
                      placeholder="Review comment"
                    />
                    <Input
                      type="text"
                      value={review.avatar}
                      onChange={(e) => handleReviewChange(review.id, 'avatar', e.target.value)}
                      placeholder="Avatar URL"
                      className='mt-2'
                    />
                    <Button onClick={() => handleRemoveReview(review.id)} className="bg-red-500 text-white mt-2">
                      Remove Review
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddReview} className="mt-2">Add Review</Button>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="map" title="Map">
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Map Embed</h2>
                <Input
                  type="text"
                  value={businessData.mapEmbedUrl || ''}
                  onChange={(e) => handleMapEmbedUrlChange(e.target.value)}
                  placeholder="Enter Google Maps Embed URL"
                  className='mb-4'
                />
                {businessData.mapEmbedUrl && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <iframe
                      src={businessData.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        <Button
          onClick={handleSave}
          className='mt-8 bg-green-500 text-white hover:bg-green-600 transition flex items-center'
        >
          <FaSave className='mr-2' />
          Save Profile
        </Button>
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
  )
}

export default BusinessProfile
                
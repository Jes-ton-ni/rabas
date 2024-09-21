import  { useState } from 'react';
import Sidebar from '@/components/sidebar';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import { FaPlus, FaEdit, FaTimes, FaTrash, FaImage, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomInput = ({ type = 'text', label, placeholder, value, onChange, multiline = false, className, ...props }) => {
  const InputComponent = multiline ? 'textarea' : Input;
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <InputComponent
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        {...props}
      />
    </div>
  );
};

const DealCard = ({ deal, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % deal.images.length);
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + deal.images.length) % deal.images.length);

  return (
    <div className="w-full max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        {deal.images.length > 0 && (
          <div className="relative">
            <img src={deal.images[currentImageIndex]} alt={deal.name} className="w-full h-48 object-cover" />
            {deal.images.length > 1 && (
              <>
                <Button isIconOnly className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white" onClick={prevImage}>
                  <FaChevronLeft />
                </Button>
                <Button isIconOnly className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white" onClick={nextImage}>
                  <FaChevronRight />
                </Button>
              </>
            )}
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-800">{deal.name}</h3>
        <div className="text-sm text-gray-600 mt-1">{deal.description}</div>
        <p className="mt-2 font-bold text-gray-800">₱{deal.price.toFixed(2)}</p>
      </div>
      <div className="flex justify-between p-4 bg-gray-100">
        <Button color="secondary" size="sm" startContent={<FaEdit />} onClick={() => onEdit(deal)}>Edit</Button>
        <Button color="danger" size="sm" startContent={<FaTrash />} onClick={() => onDelete(deal.id)}>Delete</Button>
      </div>
    </div>
  );
};

const BusinessDeals = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dealDetails, setDealDetails] = useState({});
  const [editingDeal, setEditingDeal] = useState(null);
  const [deals, setDeals] = useState([]);

  const handleInputChange = (field, value) => {
    console.log(`Input Change - ${field}: ${value}`);
    setDealDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log('Files uploaded:', files);
    if (files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setDealDetails(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async () => {
    try {
      const readFileAsDataURL = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

      const imageDataUrls = await Promise.all((dealDetails.images || []).map(readFileAsDataURL));

      const newDeal = {
        id: Date.now(),
        name: dealDetails.name,
        description: dealDetails.description || '',
        price: parseFloat(dealDetails.price) || 0,
        images: imageDataUrls,
      };

      console.log('New Deal:', newDeal);
      setDeals(prevDeals => [...prevDeals, newDeal]);
      setDealDetails({});
      onOpenChange(false);
      alert(`Deal "${newDeal.name}" added successfully!`);
    } catch (error) {
      console.error('Error adding deal:', error);
    }
  };

  const handleEditDeal = (deal) => {
    console.log('Editing Deal:', deal);
    setEditingDeal(deal);
    setDealDetails(deal);
    setEditModalOpen(true);
  };

  const handleUpdateDeal = async () => {
    try {
      const readFileAsDataURL = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

      const updatedImages = await Promise.all((dealDetails.images || []).map(async (image) => {
        if (image instanceof File) {
          return await readFileAsDataURL(image);
        }
        return image;
      }));

      const updatedDeal = {
        ...editingDeal,
        name: dealDetails.name,
        description: dealDetails.description,
        price: parseFloat(dealDetails.price),
        images: updatedImages,
      };

      console.log('Updated Deal:', updatedDeal);
      setDeals(prevDeals => prevDeals.map(d => d.id === updatedDeal.id ? updatedDeal : d));
      setEditingDeal(null);
      setEditModalOpen(false);
      alert(`Deal "${updatedDeal.name}" updated successfully!`);
    } catch (error) {
      console.error('Error updating deal:', error);
    }
  };

  const handleDeleteDeal = (dealId) => {
    console.log('Deleting Deal ID:', dealId);
    setDeals(prevDeals => prevDeals.filter(deal => deal.id !== dealId));
    alert("Deal deleted successfully!");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-0">My Deals</h1>
          <Button color="primary" endContent={<FaPlus />} onPress={onOpen}>Add Deal</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map(deal => <DealCard key={deal.id} deal={deal} onEdit={handleEditDeal} onDelete={handleDeleteDeal} />)}
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add New Deal</ModalHeader>
                <ModalBody>
                  <CustomInput label="Deal Name" placeholder="Enter deal name" value={dealDetails.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} />
                  <CustomInput label="Description" placeholder="Enter description" multiline value={dealDetails.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} />
                  <CustomInput label="Price (PHP)" placeholder="Enter price" type="number" value={dealDetails.price || ''} onChange={(e) => handleInputChange('price', e.target.value)} />
                  <div className="flex items-center space-x-2">
                    <Button color="primary" startContent={<FaImage />} as="label" htmlFor="image-upload">Upload Images (Max 5)</Button>
                    <input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <span className="text-sm text-gray-500">{(dealDetails.images || []).length} / 5 images</span>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                  <Button color="primary" onPress={handleSubmit}>Add Deal</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal isOpen={editModalOpen} onOpenChange={setEditModalOpen} size="md" scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Edit Deal</ModalHeader>
                <ModalBody>
                  <CustomInput label="Deal Name" placeholder="Enter deal name" value={dealDetails.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} />
                  <CustomInput label="Description" placeholder="Enter description" multiline value={dealDetails.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} />
                  <CustomInput label="Price (PHP)" placeholder="Enter price" type="number" value={dealDetails.price || ''} onChange={(e) => handleInputChange('price', e.target.value)} />
                  <div className="flex items-center space-x-2">
                    <Button color="primary" startContent={<FaImage />} as="label" htmlFor="image-upload-edit">Upload Images (Max 5)</Button>
                    <input id="image-upload-edit" type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <span className="text-sm text-gray-500">{(dealDetails.images || []).length} / 5 images</span>
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {(dealDetails.images || []).map((image, index) => (
                      <div key={index} className="relative w-24 h-24 mr-2 mb-2">
                        <img src={image.url || URL.createObjectURL(image)} alt={`Deal ${index}`} className="w-full h-full object-cover rounded" />
                        <button onClick={() => setDealDetails(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }))} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                  <Button color="primary" onPress={handleUpdateDeal}>Update Deal</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default BusinessDeals;
import { useState } from 'react';
import Sidebar from '../components/sidebar';
import {
  Button, Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, Card, CardBody, CardFooter, Input, useDisclosure, Checkbox,
} from '@nextui-org/react';
import { FaPlus, FaBed, FaUtensils, FaHiking, FaShoppingBag, FaImage, FaChevronLeft, FaChevronRight, FaEdit, FaTimes, FaTrash, } from 'react-icons/fa';

// Reusable input component
const CustomInput = ({ label, multiline = false, ...props }) => {
  const InputComponent = multiline ? 'textarea' : Input;
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <InputComponent {...props} className="shadow border rounded w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline" />
    </div>
  );
};

// Tag component
const Tag = ({ children, onClose }) => (
  <div className="inline-flex items-center bg-blue-600 text-white text-sm font-medium mr-2 px-3 py-1 rounded-full shadow">
    {children}
    {onClose && <button onClick={onClose} className="ml-2 text-white hover:text-gray-300"><FaTimes size={12} /></button>}
  </div>
);

const TagGroup = ({ tags, onRemove }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {tags.map((tag, index) => <Tag key={index} onClose={() => onRemove(index)}>{tag}</Tag>)}
  </div>
);

// Image uploader component
const ImageUploader = ({ category, images, onUpload, onRemove }) => (
  <div>
    <div className="flex items-center space-x-4">
      <Button color="secondary" startContent={<FaImage />} as="label" htmlFor={`image-upload-${category}`}>
        Upload Images (Max 5)
      </Button>
      <input id={`image-upload-${category}`} type="file" multiple accept="image/*" className="hidden" onChange={onUpload} />
      <span className="text-sm text-gray-500">{images.length} / 5 images</span>
    </div>
    {/* Image Preview and Delete */}
    <div className="flex mt-4 space-x-4">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
            alt={`Preview ${index}`}
            className="w-24 h-24 object-cover rounded"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full hover:bg-red-800"
          >
            <FaTimes size={12} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

// Product card component
const ProductCard = ({ product, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + product.images.length) % product.images.length);

  return (
    <Card className="w-full sm:w-[27rem] shadow-lg rounded-lg overflow-hidden">
      <CardBody className="p-0">
        {product.images.length > 0 && (
          <div className="relative">
            <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-52 object-cover" />
            {product.images.length > 1 && (
              <>
                <Button
                  isIconOnly
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white"
                  onClick={prevImage}
                >
                  <FaChevronLeft />
                </Button>
                <Button
                  isIconOnly
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white"
                  onClick={nextImage}
                >
                  <FaChevronRight />
                </Button>
              </>
            )}
          </div>
        )}
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
          <div className="text-sm text-gray-600 mt-2">{product.description}</div>
          <p className="mt-3 text-lg font-bold text-gray-900">
            ₱{product.price.toFixed(2)} {product.priceType && `(${product.priceType})`}
          </p>
          {product.perPax && (
            <p className="mt-2 text-black text-sm font-bold">Per Pax: {product.perPax}</p>
          )}
          <ul className="mt-3 text-sm flex gap-2 flex-wrap text-gray-600">
            {product.tags.map((tag, index) => (
              <li key={index}>• {tag}</li>
            ))}
          </ul>
          {product.enableBooking && (
            <div className="flex justify-end">
              <Button color="success" className="mt-4">Book</Button>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex justify-between p-4 bg-gray-100">
        <Button color="primary" size="sm" startContent={<FaEdit />} onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button color="danger" size="sm" startContent={<FaTrash />} onClick={() => onDelete(product.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};



const ProductForm = ({
  productDetails,
  categoryCards,
  handleInputChange,
  handleImageUpload,
  handleRemoveImage,
  handleSubmit,
  handleAddTag,
  handleRemoveTag,
  isEditing,
}) => (
  <div className="flex flex-wrap justify-center gap-4">
    {categoryCards
      .filter((card) => !isEditing || card.title === Object.keys(productDetails)[0])
      .map((card, index) => (
        <Card key={index} className="shadow-lg w-[28rem] rounded-lg border-1 shadow-color1">
          <CardBody className="flex items-center text-center">
            <div className="text-primary text-3xl mb-4">{card.icon}</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h4>
            <p className="text-sm text-gray-600 mb-5">{card.description}</p>
            <div className="w-full space-y-4">
              {/* Product Name */}
              <CustomInput
                label="Product Name"
                placeholder="Enter product name"
                value={productDetails[card.title]?.name || ''}
                onChange={(e) => handleInputChange(card.title, 'name', e.target.value)}
              />

              {/* Description */}
              <CustomInput
                label="Description"
                placeholder="Enter description"
                multiline
                value={productDetails[card.title]?.description || ''}
                onChange={(e) => handleInputChange(card.title, 'description', e.target.value)}
              />

              {/* Price and Price Breakdown */}
              <div className="flex space-x-4">
                <CustomInput
                  label="Price (PHP)"
                  placeholder="Enter price"
                  type="number"
                  value={productDetails[card.title]?.price || ''}
                  onChange={(e) => handleInputChange(card.title, 'price', e.target.value)}
                />
                <CustomInput
                  label="Price Type"
                  placeholder="e.g. per hour, per night"
                  value={productDetails[card.title]?.priceType || ''}
                  onChange={(e) => handleInputChange(card.title, 'priceType', e.target.value)}
                />
              </div>
              {['Accommodation', 'Activity'].includes(card.title) && (
                <CustomInput
                  label="Per Pax"
                  placeholder="Enter number of pax"
                  type="number"
                  value={productDetails[card.title]?.perPax || ''}
                  onChange={(e) => handleInputChange(card.title, 'perPax', e.target.value)}
                />
              )}

              {/* Image Uploader */}
              <ImageUploader
                category={card.title}
                images={productDetails[card.title]?.images || []}
                onUpload={(e) => handleImageUpload(card.title, e)}
                onRemove={(index) => handleRemoveImage(card.title, index)}
              />

              {/* Inclusions/Tags */}
              <CustomInput
                label="Add Inclusions"
                placeholder="Enter Inclusions"
                value={productDetails[card.title]?.newTag || ''}
                onChange={(e) => handleInputChange(card.title, 'newTag', e.target.value)}
              />
              <Button color="primary" onPress={() => handleAddTag(card.title)}>
                Add Inclusions
              </Button>
              <TagGroup
                tags={productDetails[card.title]?.tags || []}
                onRemove={(index) => handleRemoveTag(card.title, index)}
              />

              {/* Enable Booking Checkbox */}
              {card.title !== 'Food' && (
                <Checkbox
                  isSelected={productDetails[card.title]?.enableBooking || false}
                  onChange={(e) => handleInputChange(card.title, 'enableBooking', e.target.checked)}
                >
                  Enable booking
                </Checkbox>
              )}
            </div>
          </CardBody>
          <CardFooter className="justify-center mt-5">
            <Button
              color="primary"
              className="w-full"
              onPress={() => handleSubmit(card.title)}
            >
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </CardFooter>
        </Card>
      ))}
  </div>
);




const BusinessProducts = () => {
  const { isOpen, onOpenChange } = useDisclosure(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [editingProduct, setEditingProduct] = useState(null); 
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  const categoryCards = [
    { title: 'Accommodation', icon: <FaBed />, description: 'Add hotels, resorts, or vacation rentals', fields: [] },
    { title: 'Food', icon: <FaUtensils />, description: 'Add restaurants, cafes, or food tours', fields: [] },
    { title: 'Activity', icon: <FaHiking />, description: 'Add tours, attractions, or experiences', fields: [] },
    { title: 'Shop', icon: <FaShoppingBag />, description: 'Add retail stores or souvenir shops', fields: [] },
  ];
  const handleInputChange = (category, field, value) => {
    setProductDetails((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };
  
  

  const handleImageUpload = (category, event) => {
    const files = Array.from(event.target.files).slice(0, 5 - (productDetails[category]?.images?.length || 0));
    setProductDetails(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        images: [...(prev[category]?.images || []), ...files]
      }
    }));
  };

  const handleRemoveImage = (category, index) => {
    setProductDetails(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        images: prev[category].images.filter((_, i) => i !== index),
      }
    }));
  };

  const handleAddTag = (category) => {
    const newTag = productDetails[category]?.newTag;
    if (newTag) {
      setProductDetails(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          tags: [...(prev[category]?.tags || []), newTag],
          newTag: '',
        }
      }));
    }
  };

  const handleRemoveTag = (category, index) => {
    setProductDetails(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        tags: prev[category].tags.filter((_, i) => i !== index),
      }
    }));
  };

  const handleSubmit = async (category) => {
    const productData = productDetails[category];
    
    if (!productData?.name) return alert('Please enter a product name.');
  
    const imageDataUrls = await Promise.all((productData.images || []).map(file => 
      typeof file === 'string' ? file : new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      })
    ));

    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      category,
      name: productData.name,
      description: productData.description || '',
      price: parseFloat(productData.price) || 0,
      priceType: productData.priceType || '',
      perPax: productData.perPax || '',
      images: imageDataUrls,
      tags: productData.tags || [],
      enableBooking: productData.enableBooking || false,
    };
  
    if (editingProduct) {
      const updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      setProducts(prev => [...prev, newProduct]);
    }
  
    setProductDetails({});
    setEditModalOpen(false);
    onOpenChange(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    
    setProductDetails({
      [product.category]: {
        name: product.name,
        description: product.description,
        price: product.price,
        priceType: product.priceType || '',
        perPax: product.perPax || '',
        images: product.images,
        tags: product.tags,
        enableBooking: product.enableBooking || false,
        newTag: '', // Initialize newTag as empty for adding tags
      },
    });
  
    setEditModalOpen(true);
  };
  

  const handleDeleteProduct = (productId) => setProducts(prev => prev.filter(product => product.id !== productId));

  const filteredProducts = filter === 'all' ? products : products.filter(product => product.category === filter || product.tags.includes(filter));

  return (
    <div className="flex flex-col lg:flex-row min-h-screen  bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 p-6 ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">Manage Products and Services</h1>
          <Button color="primary" endContent={<FaPlus />} onPress={() => { setEditingProduct(null); setEditModalOpen(true); }}>Add Product</Button>
        </div>
        <div className="mb-8 flex  overflow-x-auto">
          <Tabs aria-label="Product categories" selectedKey={filter} onSelectionChange={setFilter} color="primary" variant="underlined" className="flex-wrap gap-4 text-gray-700">
            {['all', ...categoryCards.map(card => card.title)].map(option => <Tab key={option} title={option.charAt(0).toUpperCase() + option.slice(1)} />)}
          </Tabs>
        </div>
        <div className="flex flex-wrap gap-6 p-4 overflow-auto scrollbar-hide max-h-[520px]">
  {filteredProducts.map(product => (
    <ProductCard key={product.id} product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
  ))}
</div>

        <Modal isOpen={editModalOpen} onOpenChange={setEditModalOpen} size="5xl" className='  ' scrollBehavior="inside">
          <ModalContent >
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">{editingProduct ? 'Edit Product' : 'Add Product'}</ModalHeader>
                <ModalBody >
                  <ProductForm 
                    productDetails={productDetails}
                    setProductDetails={setProductDetails}
                    categoryCards={categoryCards}
                    handleInputChange={handleInputChange}
                    handleImageUpload={handleImageUpload}
                    handleRemoveImage={handleRemoveImage}
                    handleSubmit={handleSubmit}
                    handleAddTag={handleAddTag}
                    handleRemoveTag={handleRemoveTag}
                    isEditing={!!editingProduct}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

      </div>
    </div>
  );
};

export default BusinessProducts;

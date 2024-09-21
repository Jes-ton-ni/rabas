import { useState } from 'react';
import Sidebar from '../components/sidebar';
import { Button, Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardFooter, Input, useDisclosure } from "@nextui-org/react";
import { FaPlus, FaBed, FaUtensils, FaHiking, FaShoppingBag, FaImage, FaClock, FaUsers, FaChevronLeft, FaChevronRight, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';

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

const Tag = ({ children, onClose }) => (
  <div className="inline-flex items-center bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
    {children}
    {onClose && (
      <button onClick={onClose} className="ml-1 text-blue-600 hover:text-blue-800">
        <FaTimes size={12} />
      </button>
    )}
  </div>
);

const TagGroup = ({ children }) => (
  <div className="flex flex-wrap mt-2">
    {children}
  </div>
);

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + product.images.length) % product.images.length);

  return (
    <Card key={product.id} className="w-full max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardBody className="p-0">
        {product.images.length > 0 && (
          <div className="relative">
            <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-48 object-cover" />
            {product.images.length > 1 && (
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
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <div className="text-sm text-gray-600 mt-1">{product.description}</div>
          <p className="mt-2 font-bold text-gray-800">₱{product.price.toFixed(2)}{product.perPax !== null && ` per ${product.perPax} pax`}</p>
          {product.customFields.map((field, index) => field.value && (
            <p key={index} className="flex items-center text-gray-700">
              {getIconForField(field.key)}
              <span className="font-semibold mr-1">{field.key}:</span> {field.value}
            </p>
          ))}
          <ul className="mt-2 text-sm text-gray-600">
            {product.tags.map((tag, index) => (
              <li key={index}>• {tag}</li>
            ))}
          </ul>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between p-4 bg-gray-100">
        <Button color="secondary" size="sm" startContent={<FaEdit />} onClick={() => onEdit(product)}>Edit</Button>
        <Button color="danger" size="sm" startContent={<FaTrash />} onClick={() => onDelete(product.id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

const ProductForm = ({ productDetails, setProductDetails, categoryCards, handleInputChange, handleImageUpload, handleSubmit, handleAddTag, handleRemoveTag, isEditing }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {categoryCards.filter(card => !isEditing || card.title === editingCategory).map((card, index) => (
      <Card key={index} className="p-4 shadow-lg rounded-lg">
        <CardBody className="flex flex-col items-center text-center">
          {card.icon}
          <h4 className="text-lg font-semibold mt-2 text-gray-800">{card.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{card.description}</p>
          <div className="w-full mt-4 space-y-2">
            <CustomInput label="Product Name" placeholder="Enter product name" value={productDetails[card.title]?.name || ''} onChange={(e) => handleInputChange(card.title, 'name', e.target.value)} />
            <CustomInput label="Description" placeholder="Enter description" multiline value={productDetails[card.title]?.description || ''} onChange={(e) => handleInputChange(card.title, 'description', e.target.value)} />
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <CustomInput label="Price (PHP)" placeholder="Enter price" type="number" startContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">₱</span></div>} value={productDetails[card.title]?.price || ''} onChange={(e) => handleInputChange(card.title, 'price', e.target.value)} />
              {card.includePerPax && <CustomInput label="Per Pax" placeholder="Enter per pax" type="number" value={productDetails[card.title]?.perPax || ''} onChange={(e) => handleInputChange(card.title, 'perPax', e.target.value)} />}
            </div>
            <div className="flex items-center space-x-2">
              <Button color="primary" startContent={<FaImage />} as="label" htmlFor={`image-upload-${card.title}`}>Upload Images (Max 5)</Button>
              <input id={`image-upload-${card.title}`} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleImageUpload(card.title, e)} />
              <span className="text-sm text-gray-500">{productDetails[card.title]?.images?.length || 0} / 5 images</span>
            </div>
            {card.fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <CustomInput label={field.key} placeholder={field.placeholder} type={field.type} value={productDetails[card.title]?.[field.key] || ''} onChange={(e) => handleInputChange(card.title, field.key, e.target.value)} />
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <CustomInput label="Add Tag" placeholder="Enter tag" value={productDetails[card.title]?.newTag || ''} onChange={(e) => handleInputChange(card.title, 'newTag', e.target.value)} />
              <Button color="primary" onPress={() => handleAddTag(card.title)}>Add Tag</Button>
            </div>
            <TagGroup>
              {productDetails[card.title]?.tags?.map((tag, index) => (
                <Tag key={index} onClose={() => handleRemoveTag(card.title, index)}>{tag}</Tag>
              ))}
            </TagGroup>
          </div>
        </CardBody>
        <CardFooter className="justify-center">
          <Button color="primary" onPress={() => handleSubmit(card.title)}>{isEditing ? 'Update Product' : 'Add Product'}</Button>
        </CardFooter>
      </Card>
    ))}
  </div>
);

const BusinessProducts = () => {
  const [filter, setFilter] = useState('all');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categoryCards] = useState([
    { title: 'Accommodation', icon: <FaBed className="text-2xl" />, description: 'Add hotels, resorts, or vacation rentals', fields: [{ key: 'Capacity', type: 'number', placeholder: 'Enter capacity' }], includePerPax: false },
    { title: 'Food', icon: <FaUtensils className="text-2xl" />, description: 'Add restaurants, cafes, or food tours', fields: [{ key: 'Cuisine', type: 'text', placeholder: 'Enter cuisine type' }], includePerPax: true },
    { title: 'Activity', icon: <FaHiking className="text-2xl" />, description: 'Add tours, attractions, or experiences', fields: [{ key: 'Duration', type: 'text', placeholder: 'Enter duration (e.g., 2 hours)' }], includePerPax: true },
    { title: 'Shop', icon: <FaShoppingBag className="text-2xl" />, description: 'Add retail stores or souvenir shops', fields: [], includePerPax: false },
  ]);

  const filterOptions = ['all', ...categoryCards.map(card => card.title)];

  const handleInputChange = (category, field, value) => {
    setProductDetails(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (category, event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setProductDetails(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        images: files
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
          newTag: ''
        }
      }));
    }
  };

  const handleRemoveTag = (category, index) => {
    setProductDetails(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        tags: prev[category].tags.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (category) => {
    const productData = productDetails[category];
    if (!productData || !productData.name) {
      alert("Please enter a product name.");
      return;
    }

    const readFileAsDataURL = (file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

    const imageDataUrls = await Promise.all((productData.images || []).map(readFileAsDataURL));
    const categoryConfig = categoryCards.find(card => card.title === category);

    const newProduct = {
      id: Date.now(),
      category,
      name: productData.name,
      description: productData.description || '',
      price: parseFloat(productData.price) || 0,
      perPax: categoryConfig.includePerPax && productData.perPax ? parseInt(productData.perPax) : null,
      images: imageDataUrls,
      customFields: categoryConfig.fields.map(field => ({ key: field.key, value: productData[field.key] || '' })),
      tags: productData.tags || []
    };

    setProducts(prevProducts => [...prevProducts, newProduct]);
    setProductDetails(prev => ({ ...prev, [category]: {} }));
    onOpenChange(false);
    alert(`Product "${newProduct.name}" added successfully!`);
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product, images: product.images.map(url => ({ url })) });
    setProductDetails({ [product.category]: product });
    setEditModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    const readFileAsDataURL = (file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

    const updatedImages = await Promise.all(editingProduct.images.map(async (image) => {
      if (image instanceof File) {
        return await readFileAsDataURL(image);
      }
      return image.url;
    }));

    const updatedProduct = {
      ...editingProduct,
      images: updatedImages,
      price: parseFloat(editingProduct.price),
      perPax: editingProduct.perPax !== null ? parseInt(editingProduct.perPax) : null,
    };

    setProducts(prevProducts => prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setEditModalOpen(false);
    alert(`Product "${updatedProduct.name}" updated successfully!`);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    alert("Product deleted successfully!");
  };

  const filteredProducts = filter === 'all' ? products : products.filter(product => product.category.toLowerCase() === filter.toLowerCase() || product.tags.includes(filter));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-0">My Products</h1>
          <Button color="primary" endContent={<FaPlus />} onPress={onOpen}>Add Product</Button>
        </div>
        <div className="mb-6 overflow-x-auto">
          <Tabs aria-label="Product categories" selectedKey={filter} onSelectionChange={setFilter} color="primary" variant="underlined" className="flex-wrap">
            {filterOptions.map((option) => (
              <Tab key={option} title={option.charAt(0).toUpperCase() + option.slice(1)} />
            ))}
          </Tabs>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />)}
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Choose Product Category and Add Details</ModalHeader>
                <ModalBody>
                  <ProductForm productDetails={productDetails} setProductDetails={setProductDetails} categoryCards={categoryCards} handleInputChange={handleInputChange} handleImageUpload={handleImageUpload} handleSubmit={handleSubmit} handleAddTag={handleAddTag} handleRemoveTag={handleRemoveTag} isEditing={false} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal isOpen={editModalOpen} onOpenChange={setEditModalOpen} size="md" scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
                <ModalBody>
                  {editingProduct && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomInput label="Product Name" placeholder="Enter product name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                        <CustomInput label="Price (PHP)" placeholder="Enter price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} />
                      </div>
                      <CustomInput label="Description" placeholder="Enter description" multiline value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryCards.find(card => card.title === editingProduct.category).fields.map((field, index) => (
                          <CustomInput key={index} label={field.key} placeholder={field.placeholder} type={field.type} value={editingProduct[field.key]} onChange={(e) => setEditingProduct({ ...editingProduct, [field.key]: e.target.value })} />
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button color="primary" startContent={<FaImage />} as="label" htmlFor="image-upload-edit">Upload Images (Max 5)</Button>
                        <input id="image-upload-edit" type="file" multiple accept="image/*" className="hidden" onChange={(e) => {
                          const files = Array.from(e.target.files);
                          if (files.length + editingProduct.images.length > 5) {
                            alert("You can only have up to 5 images in total.");
                            return;
                          }
                          setEditingProduct(prev => ({ ...prev, images: [...prev.images, ...files] }));
                        }} />
                        <span className="text-sm text-gray-500">{editingProduct.images.length} / 5 images</span>
                      </div>
                      <div className="flex flex-wrap mt-2">
                        {editingProduct.images.map((image, index) => (
                          <div key={index} className="relative w-24 h-24 mr-2 mb-2">
                            <img src={image.url || URL.createObjectURL(image)} alt={`Product ${index}`} className="w-full h-full object-cover rounded" />
                            <button onClick={() => setEditingProduct(prev => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index)
                            }))} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                              <FaTimes size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <CustomInput label="Add Tag" placeholder="Enter tag" value={editingProduct.newTag || ''} onChange={(e) => setEditingProduct({ ...editingProduct, newTag: e.target.value })} />
                        <Button color="primary" onPress={() => {
                          if (editingProduct.newTag) {
                            setEditingProduct(prev => ({
                              ...prev,
                              tags: [...(prev.tags || []), editingProduct.newTag],
                              newTag: ''
                            }));
                          }
                        }}>Add Tag</Button>
                      </div>
                      <TagGroup>
                        {editingProduct.tags.map((tag, index) => (
                          <Tag key={index} onClose={() => setEditingProduct(prev => ({
                            ...prev,
                            tags: prev.tags.filter((_, i) => i !== index)
                          }))}>{tag}</Tag>
                        ))}
                      </TagGroup>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                  <Button color="primary" onPress={handleUpdateProduct}>Update Product</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

const getIconForField = (fieldKey) => {
  switch (fieldKey.toLowerCase()) {
    case 'capacity':
    case 'per pax':
      return <FaUsers className="mr-2" />;
    case 'cuisine':
      return <FaUtensils className="mr-2" />;
    case 'duration':
      return <FaClock className="mr-2" />;
    default:
      return null;
  }
};

export default BusinessProducts;
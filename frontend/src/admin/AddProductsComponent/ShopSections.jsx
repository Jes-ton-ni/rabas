import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { Input, Button, Checkbox } from '@nextui-org/react';
import Slider from 'react-slick';
import { addProduct, updateProduct, deleteProducts } from '@/redux/shopSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch, FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';

const ShopSections = () => {
  // State Management
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageList, setImageList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);
  const sliderRefs = useRef({});

  // Handlers for Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);  
    // Update the state with the newly selected files without a limit  
    setImageList((prevImages) => [...prevImages, ...files]);  
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imageList.filter((_, i) => i !== index);
    setImageList(updatedImages);
  };

  // Handlers for Deleting Selected Products
  const handleDeleteSelected = () => {
    if (selectedProducts.length > 0) {
      dispatch(deleteProducts(selectedProducts));
      setSelectedProducts([]);
    }
  };

  // Handlers for Checkbox Changes
  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedProducts((prev) => [...prev, id]); // Add product ID if checked
    } else {
      setSelectedProducts((prev) => prev.filter((productId) => productId !== id)); // Remove product ID if unchecked
    }
  };

  // Handler for Form Submission (Add/Edit Product)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName && price && category) {
      const newProduct = {
        id: isEditing ? editingProductId : nanoid(),
        productName,
        price,
        category,
        description,
        images: imageList.map((file) =>
          typeof file === 'string' ? file : URL.createObjectURL(file)
        ),
      };

      if (isEditing) {
        dispatch(updateProduct({ id: editingProductId, updatedData: newProduct }));
      } else {
        dispatch(addProduct(newProduct));
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
    setProductName('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImageList([]);
    setIsEditing(false);
    setEditingProductId(null);
  };

  // Handler for Editing a Product
  const handleEdit = (product) => {
    setProductName(product.productName);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setImageList(product.images);
    setEditingProductId(product.id);
    setIsEditing(true);
    setModalOpen(true);
  };

 // Slider settings dynamically based on number of images
  const getSliderSettings = (numImages) => ({
    infinite: numImages > 1,  // Infinite scroll only if more than 1 image
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: numImages > 1,  // Show next/prev buttons only if more than 1 image
  });


  // Get Unique Categories for Tabs
  const uniqueCategories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="max-h-[620px] p-3 w-full h-full rounded-xl shadow-gray-400 shadow-lg bg-white">
      {/* Header Section */}
      <div className="flex justify-between p-3 items-center">
        <div className="font-semibold text-xl mb-3 p-3 items-center gap-4 flex">
          <h1>Products</h1>
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
            disabled={!selectedProducts.length} // Disable delete button if no products are selected
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
          onClick={() => setSelectedCategory('')}
          className={`border p-2 rounded-md transition duration-300 ease-in-out ${
            selectedCategory === ''
              ? 'bg-color1 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-color2 hover:text-white'
          }`}
        >
          All
        </Button>
        {uniqueCategories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`border p-2 rounded-md transition duration-300 ease-in-out ${
              selectedCategory === category
                ? 'bg-color1 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-color2 hover:text-white'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

    {/* Products List */}
    <div className="border-2 max-h-[430px] h-full flex flex-wrap overflow-auto p-4 gap-4">
        {products
          .filter((product) => !selectedCategory || product.category === selectedCategory)
          .map((product) => (
            <div
              key={product.id}
              className="mb-4 p-3 border rounded-lg shadow-md w-60 h-auto bg-white transition duration-300 hover:shadow-lg"
            >
              {/* Product Header */}
              <div className="flex mb-3 items-center gap-2 justify-between">
                <Button
                  size="sm"
                  color="success"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </Button>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                />
              </div>

              {/* Product Details */}
              <h2 className="text-sm font-bold">Product Name: {product.productName}</h2>
              <p className="text-sm">
                <strong>Price:</strong> ₱{product.price}
              </p>
              <p className="text-sm">
                <strong>Description:</strong> {product.description}
              </p>

              {/* Image Carousel */}
              {product.images.length > 0 && (
                <div className="relative mt-4">
                  <Slider
                    ref={(slider) => (sliderRefs.current[product.id] = slider)}
                    {...getSliderSettings(product.images.length)}
                  >
                    {product.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg mt-2"
                        />
                      </div>
                    ))}
                  </Slider>

                  {/* Show next/prev buttons only if more than 1 image */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                        onClick={() => sliderRefs.current[product.id].slickPrev()}
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
                        onClick={() => sliderRefs.current[product.id].slickNext()}
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Modal for Adding/Editing Products */}
      <Modal isOpen={modalOpen} onOpenChange={setModalOpen} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEditing ? 'Update Product' : 'Add Your Product'}
              </ModalHeader>
              <ModalBody>
                {/* Add/Edit Product Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Category */}
                  <div className="mb-4">
                    <Input
                      label="Category"
                      placeholder="Enter the category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      fullWidth
                      required
                    />
                  </div>

                  {/* Product Name */}
                  <div className="mb-4">
                    <Input
                      label="Product Name"
                      placeholder="Enter the name of the product"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      fullWidth
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <Input
                      label="Price"
                      placeholder="e.g. 300"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      fullWidth
                      required
                      min="0"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <Input
                      label="Description"
                      placeholder="Enter product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      fullWidth
                    />
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
                  {/* Uploaded Images Preview with Remove Option */}
                  <div className="mb-4 flex flex-wrap gap-3">
                    {imageList.map((image, index) => (
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
                    {isEditing ? 'Update Product' : 'Add Product'}
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

export default ShopSections;

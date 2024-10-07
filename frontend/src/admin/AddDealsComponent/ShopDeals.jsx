import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addShopDeal, deleteShopDeal, updateShopDeal } from '@/redux/shopDealsSlice';

const ShopDeals = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);
  const activeDeals = useSelector((state) => state.shopDeals.activeDeals);
  const expiredDeals = useSelector((state) => state.shopDeals.expiredDeals);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discount, setDiscount] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [editingDeal, setEditingDeal] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newDeal, setNewDeal] = useState({
    name: '',
    description: '',
    price: '',
    pricingUnit: '',
    expirationDate: '',
    image: null,
  });

  const [newActiveDeals, setNewActiveDeals] = useState([]);
  const [newExpiredDeals, setNewExpiredDeals] = useState([]);
  const { isOpen: isNewDealOpen, onOpen: onNewDealOpen, onClose: onNewDealClose } = useDisclosure();

  const showAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#0BDA51',
    });
  };

  const handleProductChange = (event) => {
    const value = event.target.value;
    setSelectedProduct(value);
    const product = products.find(product => product.id === value);
    if (product) {
      setOriginalPrice(Number(product.price));
    }
  };

  const handleAddDeal = () => {
    if (!selectedProduct || !discount || !expirationDate) {
      showAlert("Please fill all fields");
      return;
    }

    const discountValue = parseFloat(discount);
    if (isNaN(discountValue) || discountValue <= 0 || discountValue >= 100) {
      showAlert("Please enter a valid discount percentage (0-100)");
      return;
    }

    const expiration = new Date(expirationDate);
    if (isNaN(expiration.getTime())) {
      showAlert("Please enter a valid expiration date");
      return;
    }

    if (editingDeal) {
      dispatch(updateShopDeal({
        dealId: editingDeal.id,
        discount: discountValue,
        expirationDate,
        isExpired: editingDeal.isExpired,
      }));
      setEditingDeal(null);
      Swal.fire({
        title: 'Success!',
        text: 'Deal updated successfully!',
        icon: 'success',
        confirmButtonColor: '#0BDA51',
      });
      
    } else {
      dispatch(addShopDeal(selectedProduct, discountValue, expirationDate));
      Swal.fire({
        title: 'Success!',
        text: 'Deal added successfully!',
        icon: 'success',
        confirmButtonColor: '#0BDA51',
      });
    
    }

    setDiscount('');
    setExpirationDate('');
  };

  const handleEditDeal = (deal, isExpired) => {
    setEditingDeal({ ...deal, isExpired });
    setDiscount(deal.discount.toString());
    setExpirationDate(new Date(deal.expirationDate).toISOString().split('T')[0]);
    onOpen();
  };

  const handleDeleteDeal = (dealId, isExpired) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor:'#0BDA51',
      cancelButtonColor: '#D33736',

    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteShopDeal({ dealId, isExpired }));
        Swal.fire({
          title: 'Deleted!',
          text: 'The deal has been deleted.',
          icon: 'success',
          confirmButtonColor: '#0BDA51',
        });
        
      }
    });
  };

  const handleNewDealChange = (e) => {
    const { name, value } = e.target;
    setNewDeal(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewDeal(prev => ({ ...prev, image: file }));
  };

  const handleAddNewDeal = () => {
    if (!newDeal.name || !newDeal.description || !newDeal.price || !newDeal.pricingUnit || !newDeal.expirationDate || !newDeal.image) {
      showAlert("Please fill all fields in the New Deal form!");
      return;
    }

    const today = new Date();
    const expiration = new Date(newDeal.expirationDate);
    if (expiration > today) {
      setNewActiveDeals([...newActiveDeals, newDeal]);
    } else {
      setNewExpiredDeals([...newExpiredDeals, newDeal]);
    }

    setNewDeal({
      name: '',
      description: '',
      price: '',
      pricingUnit: '',
      expirationDate: '',
      image: null,
    });
    Swal.fire({
      title: 'Success!',
      text: 'New deal added!',
      icon: 'success',
      confirmButtonColor: '#0BDA51',
    });
    
  };

  const handleEditNewDeal = (deal, isExpired) => {
    setNewDeal(deal);
    onNewDealOpen();
  };

  const handleDeleteNewDeal = (dealId, isExpired) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor:'#0BDA51',
      cancelButtonColor: '#D33736'
    }).then((result) => {
      if (result.isConfirmed) {
        if (isExpired) {
          setNewExpiredDeals(newExpiredDeals.filter(deal => deal.name !== dealId));
        } else {
          setNewActiveDeals(newActiveDeals.filter(deal => deal.name !== dealId));
        }
        Swal.fire({
          title: 'Deleted!',
          text: 'The deal has been deleted.',
          icon: 'success',
          confirmButtonColor: '#0BDA51',
        });
        
        
      }
    });
  };

  const discountedPrice = originalPrice && discount ? (originalPrice - (originalPrice * (parseFloat(discount) / 100))).toFixed(2) : originalPrice;

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto">

        {/* Left Section - Active and Expired Deals */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Manage Existing Product</h2>
          <Select
            placeholder="Select Product"
            onChange={handleProductChange}
            className="w-full mb-4"
          >
            <SelectSection title="Products">
              {products.map(product => (
                <SelectItem key={product.id} value={product.id}>
                  {product.productName}
                </SelectItem>
              ))}
            </SelectSection>
          </Select>

          {selectedProduct && (
            <div className="mb-4">
              <p>Original Price: <span className="font-semibold">₱{originalPrice}</span></p>
              <p>Discounted Price: <span className="font-semibold">₱{discountedPrice}</span></p>
            </div>
          )}
          <div className="flex space-x-4 mb-4">
            <Input
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="flex-1"
            />
            <Input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="flex-1"
            />
          </div>
          <Button onClick={handleAddDeal} className="w-full  text-white mb-6 rounded-md" color='success'>
            {editingDeal ? "Update Deal" : "Add Deal"}
          </Button>

          {/* Active Deals */}
          <h3 className="text-xl font-semibold mb-4">Active Deals</h3>
          <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
            {activeDeals.map(deal => (
              <div key={deal.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex flex-col mb-2">
                  <span className="font-bold">{products.find(product => product.id === deal.productId)?.productName}</span>
                  <span className="text-sm text-gray-600">Discount: {deal.discount}%</span>
                  <span className="text-sm text-gray-600">Expiration: {new Date(deal.expirationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleEditDeal(deal, false)} size="sm" color='primary'>Edit</Button>
                  <Button onClick={() => handleDeleteDeal(deal.id, false)} size="sm" color="danger">Delete</Button>
                </div>
              </div>
            ))}
          </div>

          {/* Expired Deals */}
          <h3 className="text-xl font-semibold mt-8 mb-4">Expired Deals</h3>
          <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
            {expiredDeals.map(deal => (
              <div key={deal.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex flex-col mb-2">
                  <span className="font-bold">{products.find(product => product.id === deal.productId)?.productName}</span>
                  <span className="text-sm text-gray-600">Discount: {deal.discount}%</span>
                  <span className="text-sm text-gray-600">Expiration: {new Date(deal.expirationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleDeleteDeal(deal.id, true)} size="sm" color="danger">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - New Deal */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Deal</h2>
          <Input
            placeholder="Deal Name"
            name="name"
            value={newDeal.name}
            onChange={handleNewDealChange}
            className="w-full mb-4"
          />
          <Input
            placeholder="Description"
            name="description"
            value={newDeal.description}
            onChange={handleNewDealChange}
            className="w-full mb-4"
          />
          <Input
            placeholder="Price (₱)"
            name="price"
            value={newDeal.price}
            onChange={handleNewDealChange}
            className="w-full mb-4"
          />
          <Input
            placeholder="Pricing Unit (e.g., per item)"
            name="pricingUnit"
            value={newDeal.pricingUnit}
            onChange={handleNewDealChange}
            className="w-full mb-4"
          />
          <Input
            type="date"
            name="expirationDate"
            value={newDeal.expirationDate}
            onChange={handleNewDealChange}
            className="w-full mb-4"
          />
          <div className="mb-4">
          <div>Upload Image</div>
            <input type="file" onChange={handleImageChange} />
            {newDeal.image && (
              <div className="mt-2">
           
                <img src={URL.createObjectURL(newDeal.image)} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                <Button onClick={() => setNewDeal(prev => ({ ...prev, image: null }))} size="sm" color="danger" className="mt-2">Remove Image</Button>
              </div>
            )}
          </div>
          <Button onClick={handleAddNewDeal} className="w-full  text-white rounded-md" color='success'>Add New Deal</Button>

          {/* New Active Deals */}
          <h3 className="text-xl font-semibold mt-8 mb-4">New Active Deals</h3>
          <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
            {newActiveDeals.map(deal => (
              <div key={deal.name} className="bg-white shadow-md rounded-lg p-4">
                <div className="mb-4">
                  <img
                    src={deal.image ? URL.createObjectURL(deal.image) : '/placeholder.png'}
                    alt={deal.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <span className="font-semibold">Deal Name: <span className='font-normal'>{deal.name}</span></span>
                  <span className="font-semibold">Price: <span className='font-normal'>{deal.price} {deal.pricingUnit}</span></span>
                  <span className="font-semibold">Description: <span className='font-normal'>{deal.description}</span></span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleEditNewDeal(deal, false)} size="sm" color='primary'>Edit</Button>
                  <Button onClick={() => handleDeleteNewDeal(deal.name, false)} size="sm" color="danger">Delete</Button>
                </div>
              </div>
            ))}
          </div>

          {/* New Expired Deals */}
          <h3 className="text-xl font-semibold mt-8 mb-4">New Expired Deals</h3>
          <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
            {newExpiredDeals.map(deal => (
              <div key={deal.name} className="bg-white shadow-md rounded-lg p-4">
                <div className="mb-4">
                  <img
                    src={deal.image ? URL.createObjectURL(deal.image) : '/placeholder.png'}
                    alt={deal.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col mb-2">
                <span className="font-semibold">Deal Name: <span className='font-normal'>{deal.name}</span></span>
                  <span className="font-semibold">Price: <span className='font-normal'>{deal.price} {deal.pricingUnit}</span></span>
                  <span className="font-semibold">Description: <span className='font-normal'>{deal.description}</span></span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleDeleteNewDeal(deal.name, true)} size="sm" color="danger">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Editing Deals */}
      <Modal isOpen={isOpen} onClose={() => { onClose(); setEditingDeal(null); }}>
        <ModalContent>
          <ModalHeader>{editingDeal ? "Edit Deal" : "Add Deal"}</ModalHeader>
          <ModalBody>
            <Input
              placeholder="New Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mb-4"
            />
            <Input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { onClose(); setEditingDeal(null); }} color='danger'>Cancel</Button>
            <Button onClick={handleAddDeal}color='success'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isNewDealOpen} onClose={onNewDealClose}>
        <ModalContent>
          <ModalHeader>Edit New Deal</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Deal Name"
              name="name"
              value={newDeal.name}
              onChange={handleNewDealChange}
              className="mb-2"
            />
            <Input
              placeholder="Description"
              name="description"
              value={newDeal.description}
              onChange={handleNewDealChange}
              className="mb-2"
            />
            <Input
              placeholder="Price (₱)"
              name="price"
              value={newDeal.price}
              onChange={handleNewDealChange}
              className="mb-2"
            />
            <Input
              placeholder="Pricing Unit (e.g., per item)"
              name="pricingUnit"
              value={newDeal.pricingUnit}
              onChange={handleNewDealChange}
              className="mb-2"
            />
            <Input
              type="date"
              name="expirationDate"
              value={newDeal.expirationDate}
              onChange={handleNewDealChange}
              className="mb-2"
            />
            <div className="mb-4">
              <input type="file" onChange={handleImageChange} />
              {newDeal.image && (
                <div className="mt-2">
                  <img src={URL.createObjectURL(newDeal.image)} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  <Button onClick={() => setNewDeal(prev => ({ ...prev, image: null }))} size="sm" color="danger" className="mt-2" >Remove Image</Button>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onNewDealClose} color='danger'>Cancel</Button>
            <Button onClick={handleAddNewDeal} color='success'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ShopDeals;
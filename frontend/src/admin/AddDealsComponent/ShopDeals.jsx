import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { deleteShopDeal, updateShopDeal } from '@/redux/shopDealsSlice';

const ShopDeals = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.shopProducts);
  const activeDeals = useSelector((state) => state.shopDeals.activeDeals);
  const expiredDeals = useSelector((state) => state.shopDeals.expiredDeals);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [discount, setDiscount] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [editingDeal, setEditingDeal] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sampleActiveDeals = [
    { id: '1', productId: '101', discount: 20, expirationDate: '2023-12-31' },
  ];

  const sampleExpiredDeals = [
    { id: '2', productId: '102', discount: 15, expirationDate: '2023-01-01' },
  ];

  const showAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      confirmButtonColor:'#0BDA51',
      text: message,
    });
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
      // Add new deal logic here
    }
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

  return (
    <div className="p-4 sm:p-8  w-full">
      <div className="grid grid-cols-1  gap-8 max-w-7xl mx-auto">
        <div className="shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Shop Deals</h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <Input
              placeholder="Discount (%)"
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
          <Button onClick={handleAddDeal} className="mb-6 rounded-md bg-color1 hover:bg-color2 text-white w-full">
            Add Deal
          </Button>

          <h3 className="text-xl font-semibold mb-4 text-gray-700">Active Deals</h3>
          <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
            {sampleActiveDeals.map(deal => (
              <div key={deal.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col mb-2">
                  <span className="font-bold text-gray-800">{products.find(product => product.id === deal.productId)?.productName || 'Sample Product'}</span>
                  <span className="text-sm text-gray-600">Discount: {deal.discount}%</span>
                  <span className="text-sm text-gray-600">Expiration: {new Date(deal.expirationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleEditDeal(deal, false)} size="sm" className="bg-color1 hover:bg-color2 text-white">Edit</Button>
                  <Button onClick={() => handleDeleteDeal(deal.id, false)} size="sm" className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Expired Deals</h3>
          <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
            {sampleExpiredDeals.map(deal => (
              <div key={deal.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col mb-2">
                  <span className="font-bold text-gray-800">{products.find(product => product.id === deal.productId)?.productName || 'Sample Product'}</span>
                  <span className="text-sm text-gray-600">Discount: {deal.discount}%</span>
                  <span className="text-sm text-gray-600">Expiration: {new Date(deal.expirationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleDeleteDeal(deal.id, true)} size="sm" className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => { onClose(); setEditingDeal(null); }}>
        <ModalContent>
          <ModalHeader className="text-center">{editingDeal ? "Edit Deal" : "Add Deal"}</ModalHeader>
          <ModalBody>
            <Input
              placeholder="New Discount (%)"
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
            <Button onClick={() => { onClose(); setEditingDeal(null); }} className="bg-red-500 hover:bg-red-600 text-white">Cancel</Button>
            <Button onClick={handleAddDeal} className="bg-color1 hover:bg-color2 text-white">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ShopDeals;
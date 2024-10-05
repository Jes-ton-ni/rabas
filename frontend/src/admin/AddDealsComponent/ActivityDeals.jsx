import React, { useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { addNewDeal, editDeal, deleteDeal } from '@/redux/activitydealSlice';
import { updateActivity } from '@/redux/activitiesSlice';

const ActivityDeals = () => {
  const dispatch = useDispatch();

  const { activities } = useSelector((state) => state.activities);
  const { activeDeals, expiredDeals } = useSelector((state) => state.activitydeals);

  const [newDeal, setNewDeal] = useState({
    name: '',
    description: '',
    price: '',
    priceUnit: '',
    expiration: '',
    image: '',
    activityId: '',
  });

  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [editingDeal, setEditingDeal] = useState(null); // Store the deal being edited
  const [editingActivity, setEditingActivity] = useState(null); // Store the activity being edited

  const [showDealModal, setShowDealModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Handle form input changes for new deal
  const handleNewDealChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  // Handle image upload for new deal
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewDeal({ ...newDeal, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image from new deal
  const handleRemoveImage = () => {
    setImagePreview(null);
    setNewDeal({ ...newDeal, image: '' });
  };

  // Add new deal
  const handleAddNewDeal = () => {
    dispatch(addNewDeal(newDeal));
    setNewDeal({ name: '', description: '', price: '', priceUnit: 'PHP', expiration: '', image: '', activityId: '' });
    setImagePreview(null);
  };

  // Add deal for a specific activity
  const handleAddDealToActivity = (activityId) => {
    setNewDeal({ ...newDeal, activityId });
  };

  // Open modal to edit a deal
  const handleOpenEditDeal = (deal) => {
    setEditingDeal(deal);
    setShowDealModal(true);
  };

  // Open modal to edit an activity
  const handleOpenEditActivity = (activity) => {
    setEditingActivity(activity);
    setShowActivityModal(true);
  };

  // Handle deal edit submit
  const handleEditDealSubmit = () => {
    dispatch(editDeal({ id: editingDeal.id, updatedDeal: editingDeal }));
    setShowDealModal(false);
    setEditingDeal(null);
  };

  // Handle activity edit submit
  const handleEditActivitySubmit = () => {
    dispatch(updateActivity({ id: editingActivity.id, updatedData: editingActivity }));
    setShowActivityModal(false);
    setEditingActivity(null);
  };

  // Render existing activities
  const renderExistingActivities = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <div key={activity.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{activity.activityName}</h3>
          <p className="text-gray-700">Price: ₱{activity.pricing} {activity.pricingUnit}</p>
          <div className="flex space-x-2 my-2 overflow-auto">
            {activity.images.map((image, index) => (
              <img key={index} src={image} alt={activity.activityName} className="w-16 h-16 rounded-md" />
            ))}
          </div>
          <Input
            fullWidth
            label="Discount (%)"
            placeholder="e.g., 10"
            onChange={(e) => setEditingActivity({ ...activity, discount: e.target.value })}
          />
          <Input
            fullWidth
            label="Expiration Date"
            type="date"
            onChange={(e) => setEditingActivity({ ...activity, expiration: e.target.value })}
          />
          <Button flat auto onPress={() => handleAddDealToActivity(activity.id)} className="mt-4">
            Add Deal to this Activity
          </Button>
        </div>
      ))}
    </div>
  );

  // Render form for creating new deals
  const renderNewDealForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Create New Deal</h3>
      <Input
        fullWidth
        label="Activity Name"
        name="name"
        value={newDeal.name}
        onChange={handleNewDealChange}
      />
      <Input
        fullWidth
        label="Description"
        name="description"
        value={newDeal.description}
        onChange={handleNewDealChange}
      />
      <Input
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={newDeal.price}
        onChange={handleNewDealChange}
        placeholder="₱"
      />
      <Input
        fullWidth
        label="Price Unit"
        name="priceUnit"
        value={newDeal.priceUnit}
        onChange={handleNewDealChange}
        placeholder="e.g., per pax"
      />
      <Input
        fullWidth
        label="Expiration Date"
        type="date"
        name="expiration"
        value={newDeal.expiration}
        onChange={handleNewDealChange}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover mt-2 rounded-md" />
          <Button flat auto color="error" onPress={handleRemoveImage}>
            Remove Image
          </Button>
        </div>
      )}
      <Button flat auto onPress={handleAddNewDeal} className="mt-4">
        Add New Deal
      </Button>
    </div>
  );

  // Render active deals
  const renderActiveDeals = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 overflow-y-auto max-h-[500px] ">
      {activeDeals.map((deal) => (
        <div key={deal.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{deal.name}</h3>
          <p>{deal.description}</p>
          <p>Price: ₱{deal.price} {deal.priceUnit}</p>
          <p>Expiration: {deal.expiration}</p>
          <img src={deal.image} alt={deal.name} className="w-full h-40 object-cover mt-2 rounded-md" />
          <div className="flex space-x-2 mt-4">
            <Button color="warning" flat auto onPress={() => handleOpenEditDeal(deal)}>
              Edit
            </Button>
            <Button color="error" flat auto onPress={() => dispatch(deleteDeal(deal.id))}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render expired deals
  const renderExpiredDeals = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {expiredDeals.map((deal) => (
        <div key={deal.id} className="bg-gray-300 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{deal.name} (Expired)</h3>
          <p>{deal.description}</p>
          <p>Price: ₱{deal.price} {deal.priceUnit}</p>
          <p>Expired on: {deal.expiration}</p>
          <img src={deal.image} alt={deal.name} className="w-full h-40 object-cover mt-2 rounded-md" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 w-full bg-white">
      <h1 className="text-3xl font-bold mb-6">Manage Activity Deals</h1>
      <h2 className="text-2xl font-semibold mb-4">Existing Activities</h2>
      {renderExistingActivities()}
      <h2 className="text-2xl font-semibold my-8">Create New Deal</h2>
      {renderNewDealForm()}
      <h2 className="text-2xl font-semibold my-8">Active Deals</h2>
      {renderActiveDeals()}
      <h2 className="text-2xl font-semibold my-8">Expired Deals</h2>
      {renderExpiredDeals()}

      {/* Modal for Editing Deal */}
      {editingDeal && (
        <Modal open={showDealModal} onClose={() => setShowDealModal(false)}>
          <ModalContent>
            <ModalHeader>
              <h3>Edit Deal</h3>
            </ModalHeader>
            <ModalBody>
              <Input
                fullWidth
                label="Activity Name"
                value={editingDeal.name}
                onChange={(e) => setEditingDeal({ ...editingDeal, name: e.target.value })}
              />
              <Input
                fullWidth
                label="Description"
                value={editingDeal.description}
                onChange={(e) => setEditingDeal({ ...editingDeal, description: e.target.value })}
              />
              <Input
                fullWidth
                label="Price"
                value={editingDeal.price}
                onChange={(e) => setEditingDeal({ ...editingDeal, price: e.target.value })}
              />
              <Input
                fullWidth
                label="Expiration Date"
                type="date"
                value={editingDeal.expiration}
                onChange={(e) => setEditingDeal({ ...editingDeal, expiration: e.target.value })}
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {imagePreview && (
                <div>
                  <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover mt-2 rounded-md" />
                  <Button flat auto color="error" onPress={handleRemoveImage}>
                    Remove Image
                  </Button>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button auto onPress={handleEditDealSubmit}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Modal for Editing Activity */}
      {editingActivity && (
        <Modal open={showActivityModal} onClose={() => setShowActivityModal(false)}>
          <ModalContent>
            <ModalHeader>
              <h3>Edit Activity</h3>
            </ModalHeader>
            <ModalBody>
              <Input
                fullWidth
                label="Discount (%)"
                value={editingActivity.discount}
                onChange={(e) => setEditingActivity({ ...editingActivity, discount: e.target.value })}
              />
              <Input
                fullWidth
                label="Expiration Date"
                type="date"
                value={editingActivity.expiration}
                onChange={(e) => setEditingActivity({ ...editingActivity, expiration: e.target.value })}
              />
            </ModalBody>
            <ModalFooter>
              <Button auto onPress={handleEditActivitySubmit}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ActivityDeals;

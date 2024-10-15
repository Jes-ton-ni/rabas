import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/tabs';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import SuperAdminSidebar from './superadmincomponents/superadminsidebar';
import SearchBar from './superadmincomponents/SearchBar'; // Import the SearchBar component

// Mock Data
const mockData = {
  activities: [
    {
      title: 'Hiking Adventure',
      description: 'Explore scenic mountain trails. Guide and equipment included.',
      price: 1500,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      type: 'Hiking',
    },
    {
      title: 'Snorkeling Tour',
      description: 'Discover the underwater world with a guided snorkeling tour.',
      price: 1200,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 3,
      type: 'Water Sports',
    },
  ],
  accommodations: [
    {
      title: 'Luxury Mountain Cabin',
      description: 'Stay in a cozy cabin with scenic views and modern amenities.',
      price: 5000,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      type: 'Cabins',
    },
    {
      title: 'Beachfront Resort',
      description: 'Relax in a luxury resort right on the beach.',
      price: 8000,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      type: 'Resorts',
    },
  ],
  restaurant: [
    {
      title: 'Mountain View Dining',
      description: 'Experience local cuisine with a view of the mountains.',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 2,
      type: 'Fine Dining',
    },
    {
      title: 'Coastal Seafood Feast',
      description: 'Indulge in fresh seafood dishes by the shore.',
      price: 1500,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      type: 'Buffet',
    },
  ],
  shop: [
    {
      title: 'Local Handicrafts',
      description: 'Shop unique handmade items from local artisans.',
      price: 500,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 3,
      type: 'Local Crafts',
    },
    {
      title: 'Souvenir Shop',
      description: 'Get your souvenirs and take home memories of the trip.',
      price: 700,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 2,
      type: 'Souvenirs',
    },
  ],
};

// Sample Business Listings Data
const businessListings = {
  activitiesAndAttractions: [
    {
      title: 'Beautiful Beach',
      description: 'Relax and enjoy the scenic beach view.',
      price: 2000,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      type: 'Activities',
    },
    {
      title: 'Mountain Adventure',
      description: 'Hike through the mountains and enjoy nature.',
      price: 3000,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      type: 'Attractions',
    },
  ],
  accommodations: [
    {
      title: 'Luxury Hotel',
      description: 'A luxurious stay with world-class facilities.',
      price: 8000,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      type: 'Accommodations',
    },
  ],
  foodPlaces: [
    {
      title: 'Sample Restaurant 1',
      description: 'A popular Filipino restaurant offering traditional dishes.',
      price: 1500,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      type: 'Food',
    },
  ],
  shops: [
    {
      title: 'Sample Souvenir Shop 1',
      description: 'A charming shop offering unique local souvenirs.',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      type: 'Shop',
    },
  ],
};

// Dashboard component for product counts
const Dashboard = ({ productCounts }) => (
  <div className="flex justify-around py-6">
    <div className="bg-red-400 text-white w-72 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-lg">Attractions</p>
      <p className="text-4xl font-bold">{productCounts.activities}</p>
    </div>
    <div className="bg-teal-400 text-white w-72 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-lg">Accommodations</p>
      <p className="text-4xl font-bold">{productCounts.accommodations}</p>
    </div>
    <div className="bg-purple-400 text-white w-72  h-40 flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-lg">Foods</p>
      <p className="text-4xl font-bold">{productCounts.foods}</p>
    </div>
    <div className="bg-pink-400 text-white w-72 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-lg">Total Products</p>
      <p className="text-4xl font-bold">{productCounts.total}</p>
    </div>
  </div>
);

// Dashboard component for business counts
const BusinessDashboard = ({ businessCounts }) => (
  <div className="flex justify-around py-6">
    <div className="bg-blue-400 text-white w-72 h-40 flex flex-col justify-center text-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-lg">Activities & Attractions</p>
      <p className="text-4xl font-bold">{businessCounts.activitiesAndAttractions}</p>
    </div>
    <div className="bg-green-400 text-white w-72 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-lg">Accommodations</p>
      <p className="text-4xl font-bold">{businessCounts.accommodations}</p>
    </div>
    <div className="bg-yellow-400 text-white w-72 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-lg">Food Places</p>
      <p className="text-4xl font-bold">{businessCounts.foodPlaces}</p>
    </div>
    <div className="bg-orange-400 text-white w-72 h-40 flex flex-col justify-center items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <p className="text-lg">Shops</p>
      <p className="text-4xl font-bold">{businessCounts.shops}</p>
    </div>
  </div>
);

const SuperAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [businessSearchTerm, setBusinessSearchTerm] = useState('');
  const [productCounts, setProductCounts] = useState({
    activities: 0,
    accommodations: 0,
    foods: 0,
    total: 0,
  });
  const [businessCounts, setBusinessCounts] = useState({
    activitiesAndAttractions: 0,
    accommodations: 0,
    foodPlaces: 0,
    shops: 0,
  });
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const { isOpen: isBusinessModalOpen, onOpen: onBusinessModalOpen, onClose: onBusinessModalClose } = useDisclosure();

  const [selectedProductFilter, setSelectedProductFilter] = useState('all');
  const [selectedBusinessFilter, setSelectedBusinessFilter] = useState('all');

  useEffect(() => {
    const activitiesCount = mockData.activities.length;
    const accommodationsCount = mockData.accommodations.length;
    const foodsCount = mockData.restaurant.length;
    const shopCount = mockData.shop.length;
    const totalProducts = activitiesCount + accommodationsCount + foodsCount + shopCount;

    setProductCounts({
      activities: activitiesCount,
      accommodations: accommodationsCount,
      foods: foodsCount,
      total: totalProducts,
    });

    const sortedProducts = [
      ...mockData.activities,
      ...mockData.accommodations,
      ...mockData.restaurant,
      ...mockData.shop,
    ].sort((a, b) => b.rating - a.rating);

    setProducts(sortedProducts);

    setBusinessCounts({
      activitiesAndAttractions: businessListings.activitiesAndAttractions.length,
      accommodations: businessListings.accommodations.length,
      foodPlaces: businessListings.foodPlaces.length,
      shops: businessListings.shops.length,
    });
  }, []);

  const filterProducts = (products) => {
    switch (selectedProductFilter) {
      case 'topRated':
        return products.filter(product => product.rating >= 4);
      case 'budgetFriendly':
        return products.filter(product => product.price <= 1500);
      case 'luxury':
        return products.filter(product => product.price >= 5000);
      default:
        return products;
    }
  };

  const filterBusinesses = (businesses) => {
    switch (selectedBusinessFilter) {
      case 'topRated':
        return businesses.filter(business => business.rating >= 4);
      case 'budgetFriendly':
        return businesses.filter(business => business.price <= 1500);
      case 'luxury':
        return businesses.filter(business => business.price >= 5000);
      default:
        return businesses;
    }
  };

  const filteredProducts = filterProducts(
    products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredBusinesses = {
    activitiesAndAttractions: filterBusinesses(
      businessListings.activitiesAndAttractions.filter(
        (business) =>
          business.title.toLowerCase().includes(businessSearchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(businessSearchTerm.toLowerCase())
      )
    ),
    accommodations: filterBusinesses(
      businessListings.accommodations.filter(
        (business) =>
          business.title.toLowerCase().includes(businessSearchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(businessSearchTerm.toLowerCase())
      )
    ),
    foodPlaces: filterBusinesses(
      businessListings.foodPlaces.filter(
        (business) =>
          business.title.toLowerCase().includes(businessSearchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(businessSearchTerm.toLowerCase())
      )
    ),
    shops: filterBusinesses(
      businessListings.shops.filter(
        (business) =>
          business.title.toLowerCase().includes(businessSearchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(businessSearchTerm.toLowerCase())
      )
    ),
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleOpenBusinessModal = (business) => {
    setSelectedBusiness(business);
    onBusinessModalOpen();
  };

  const handleSectionChange = (values) => {
    setSelectedSections(values);
  };

  const getProductRank = (product) => {
    if (!product) return null;
    const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
    return sortedProducts.findIndex((p) => p.title === product.title) + 1;
  };

  const renderProductCards = (productList) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productList.map((product, index) => (
        <Card key={index} className="shadow-lg rounded-lg hover:scale-105 transition-transform">
          <CardBody className="p-4">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="object-cover w-full h-40 rounded-lg mb-2"
            />
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-semibold">₱{product.price}</span>
              <HiOutlineDotsVertical
                className="cursor-pointer"
                onClick={() => handleOpenModal(product)}
              />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  const renderBusinessCards = (businessList) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {businessList.map((business, index) => (
        <Card key={index} className="shadow-lg rounded-lg hover:scale-105 transition-transform">
          <CardBody className="p-4">
            <img
              src={business.imageUrl}
              alt={business.title}
              className="object-cover w-full h-40 rounded-lg mb-2"
            />
            <h3 className="font-bold text-lg">{business.title}</h3>
            <p className="text-gray-700">{business.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-semibold">₱{business.price}</span>
              <HiOutlineDotsVertical
                className="cursor-pointer"
                onClick={() => handleOpenBusinessModal(business)}
              />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SuperAdminSidebar />

      <div className="flex-1 p-6 max-h-screen overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Products and Businesses</h1>

        <Tabs className="mb-6" variant="highlight" color="primary">
          <Tab title="Products List">
            <Dashboard productCounts={productCounts} />
            <div className="mb-4">
              <label htmlFor="productFilter" className="mr-2">Filter Products: </label>
              <select
                id="productFilter"
                value={selectedProductFilter}
                onChange={(e) => setSelectedProductFilter(e.target.value)}
              >
                <option value="all">All Products</option>
                <option value="topRated">Top Rated</option>
                <option value="budgetFriendly">Budget Friendly</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <SearchBar
              placeholder="Search products..."
              onSearch={setSearchTerm}
            />
            <Tabs>
              <Tab title="All Products">
                {renderProductCards(filteredProducts)}
              </Tab>
              <Tab title="Activities">
                {renderProductCards(filteredProducts.filter((product) => product.type === 'Hiking' || product.type === 'Water Sports'))}
              </Tab>
              <Tab title="Accommodations">
                {renderProductCards(filteredProducts.filter((product) => product.type === 'Cabins' || product.type === 'Resorts'))}
              </Tab>
              <Tab title="Restaurant Service">
                {renderProductCards(filteredProducts.filter((product) => product.type === 'Fine Dining' || product.type === 'Buffet'))}
              </Tab>
              <Tab title="Shop">
                {renderProductCards(filteredProducts.filter((product) => product.type === 'Local Crafts' || product.type === 'Souvenirs'))}
              </Tab>
            </Tabs>
          </Tab>

          <Tab title="Business List">
            <BusinessDashboard businessCounts={businessCounts} />
            <div className="mb-4">
              <label htmlFor="businessFilter" className="mr-2">Filter Businesses: </label>
              <select
                id="businessFilter"
                value={selectedBusinessFilter}
                onChange={(e) => setSelectedBusinessFilter(e.target.value)}
              >
                <option value="all">All Businesses</option>
                <option value="topRated">Top Rated</option>
                <option value="budgetFriendly">Budget Friendly</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <SearchBar
              placeholder="Search businesses..."
              onSearch={setBusinessSearchTerm}
            />
            <Tabs>
              <Tab title="Activities and Attractions">
                {renderBusinessCards(filteredBusinesses.activitiesAndAttractions)}
              </Tab>
              <Tab title="Accommodations">
                {renderBusinessCards(filteredBusinesses.accommodations)}
              </Tab>
              <Tab title="Food Places">
                {renderBusinessCards(filteredBusinesses.foodPlaces)}
              </Tab>
              <Tab title="Shops">
                {renderBusinessCards(filteredBusinesses.shops)}
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <h2 className="text-2xl font-bold">{selectedProduct?.title}</h2>
            </ModalHeader>
            <ModalBody>
              <p className="mb-4">{selectedProduct?.description}</p>
              <p className="mb-2 font-semibold">Price: ₱{selectedProduct?.price}</p>
              {selectedProduct && (
                <p className="mb-4">Ranking based on rating: #{getProductRank(selectedProduct)}</p>
              )}
              <CheckboxGroup
                label="Add to Section"
                className="mb-4"
                onChange={handleSectionChange}
                value={selectedSections}
              >
                <Checkbox value="topProducts">Top Products</Checkbox>
                <Checkbox value="featuredProducts">Featured Products</Checkbox>
                <Checkbox value="popularProducts">Popular Products</Checkbox>
                <Checkbox value="budgetFriendly">Budget Friendly</Checkbox>
                <Checkbox value="luxurySpots">Luxury Spots</Checkbox>
                <Checkbox value="ecoFriendly">Eco Friendly Spots</Checkbox>
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={onClose}>
                Close
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isBusinessModalOpen} onClose={onBusinessModalClose}>
          <ModalContent>
            <ModalHeader>
              <h2 className="text-2xl font-bold">{selectedBusiness?.title}</h2>
            </ModalHeader>
            <ModalBody>
              <p className="mb-4">{selectedBusiness?.description}</p>
              <p className="mb-2 font-semibold">Price: ₱{selectedBusiness?.price}</p>
              {selectedBusiness && (
                <p className="mb-4">Ranking based on rating: #{getProductRank(selectedBusiness)}</p>
              )}
              <CheckboxGroup
                label="Add to Section"
                className="mb-4"
                onChange={handleSectionChange}
                value={selectedSections}
              >
                <Checkbox value="popular">Popular</Checkbox>
                <Checkbox value="topRated">Top Rated</Checkbox>
                <Checkbox value="newArrivals">New Arrivals</Checkbox>
                <Checkbox value="bestValue">Best Value</Checkbox>
                <Checkbox value="familyFriendly">Family Friendly</Checkbox>
                <Checkbox value="luxury">Luxury</Checkbox>
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={onBusinessModalClose}>
                Close
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default SuperAdminProducts;

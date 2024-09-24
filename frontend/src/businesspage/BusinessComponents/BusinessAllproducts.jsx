import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter } from '@nextui-org/react';
import {  FaBed, FaUtensils, FaHiking, FaFilter, FaShoppingBag } from 'react-icons/fa';

const sampleProducts = [
    {
        id: 1,
        name: 'Sample Product 1',
        description: 'This is a description for Sample Product 1.',
        price: 100.00,
        perPax: null,
        images: ['https://via.placeholder.com/150'],
        tags: ['Tag1', 'Tag2'],
        category: 'Accommodation',
        features: ['Air-Conditioned', '1 Bedroom', '1 Bathroom']
    },
    {
        id: 2,
        name: 'Sample Product 2',
        description: 'This is a description for Sample Product 2.',
        price: 200.00,
        perPax: 2,
        images: ['https://via.placeholder.com/150'],
        tags: ['Tag3', 'Tag4'],
        category: 'Food',
        features: ['Cuisine: Italian', 'Vegetarian Options']
    },
    {
        id: 3,
        name: 'Sample Product 3',
        description: 'This is a description for Sample Product 3.',
        price: 150.00,
        perPax: 1,
        images: ['https://via.placeholder.com/150'],
        tags: ['Tag5', 'Tag6'],
        category: 'Activity',
        features: ['Duration: 2 hours', 'Guide Included']
    }
];

const BusinessAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        // Simulate fetching products from an API
        setTimeout(() => {
            setProducts(sampleProducts);
        }, 1000);
    }, []);

    const filteredProducts = filter === 'All' ? products : products.filter(product => product.category === filter);

    return (
        <div className="p-4 container">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    {['All', 'Activity', 'Accommodation', 'Food', 'Shop'].map((category) => (
                        <Button
                            key={category}
                            onClick={() => setFilter(category)}
                            startContent={category === 'All' ? <FaFilter /> : category === 'Activity' ? <FaHiking /> : category === 'Accommodation' ? <FaBed /> : category === 'Food' ? <FaUtensils /> : <FaShoppingBag />}
                            className={`${filter === category ? 'bg-color2 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-color2 duration-300 hover:text-white`} // Tailwind styles for active state
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-auto max-h-[900px]">
                {filteredProducts.map(product => (
                    <Card key={product.id} className="w-full max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
                        <CardBody className="p-0">
                            {product.images && product.images.length > 0 && (
                                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                <div className="text-sm text-gray-600 mt-1">{product.description}</div>
                                <p className="mt-2 font-bold text-gray-800">₱{product.price.toFixed(2)}{product.perPax !== null && ` per ${product.perPax} pax`}</p>
                                <ul className="mt-2 text-sm text-gray-600">
                                    {product.features.map((feature, index) => (
                                        <li key={index}>• {feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-between p-4 bg-gray-100">
                            <Button color="primary" size="sm" className='hover:bg-color2 duration-300'>Inquire</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BusinessAllProducts;
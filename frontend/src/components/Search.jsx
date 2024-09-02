import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaWalking, FaBed } from 'react-icons/fa';
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/react';
import { MdOutlineLocalDining } from "react-icons/md";
import { FaShop } from "react-icons/fa6";

const Search = () => {
  const [destination, setDestination] = useState('');
  const [activity, setActivity] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [food, setFood] = useState('');
  const [shop, setShop] = useState('');

  const handleSearch = () => {
    // Handle search logic based on the selected options
    console.log('Selected Destination:', destination);
    console.log('Selected Activity:', activity);
    console.log('Selected Accommodation:', accommodation);
    console.log('Selected Food:', food);
    console.log('Selected Shop:', shop);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-light rounded-md shadow-lg p-4 flex flex-wrap justify-center gap-4">
        
        {/* Destination */}
        <div className="flex items-center space-x-2 flex-1 min-w-[195px]">
          <FaMapMarkerAlt className="text-dark text-md" />
          <Select
            placeholder={destination || "Select Destination"}
            selectedKeys={[destination]}
            onSelectionChange={(value) => setDestination(value)}
          >
            <SelectItem key="Bulusan">Bulusan</SelectItem>
            <SelectItem key="Bulan">Bulan</SelectItem>
            <SelectItem key="Barcelona">Barcelona</SelectItem>
            <SelectItem key="Casiguran">Casiguran</SelectItem>
            <SelectItem key="Castilla">Castilla</SelectItem>
            <SelectItem key="Donsol">Donsol</SelectItem>
            <SelectItem key="Gubat">Gubat</SelectItem>
            <SelectItem key="Irosin">Irosin</SelectItem>
            <SelectItem key="Juban">Juban</SelectItem>
            <SelectItem key="Magallanes">Magallanes</SelectItem>
            <SelectItem key="Matnog">Matnog</SelectItem>
            <SelectItem key="Pilar">Pilar</SelectItem>
            <SelectItem key="Prieto Diaz">Prieto Diaz</SelectItem>
            <SelectItem key="Sta. Magdalena">Sta. Magdalena</SelectItem>
            <SelectItem key="Sorsogon City">Sorsogon City</SelectItem>
          </Select>
        </div>

        {/* Activity */}
        <div className="flex items-center space-x-2 flex-1 min-w-[220px]">
          <FaWalking className="text-dark text-md" />
          <Select
            placeholder={activity || "Select Activity"}
            selectedKeys={[activity]}
            onSelectionChange={(value) => setActivity(value)}
            className="whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <SelectItem key="Diving">Diving</SelectItem>
            <SelectItem key="Camping">Camping</SelectItem>
            <SelectItem key="Hiking">Hiking</SelectItem>
            <SelectItem key="Island Hopping">Island Hopping</SelectItem>
            <SelectItem key="Swimming">Swimming</SelectItem>
            <SelectItem key="Surfing">Surfing</SelectItem>
          </Select>
        </div>

        {/* Accommodation */}
        <div className="flex items-center space-x-2 flex-1 min-w-[220px]">
          <FaBed className="text-dark text-md" />
          <Select
            placeholder={accommodation || "Select Accommodation"}
            selectedKeys={[accommodation]}
            onSelectionChange={(value) => setAccommodation(value)}
          >
            <SelectItem key="Hotel">Hotel</SelectItem>
            <SelectItem key="Inn">Inn</SelectItem>
            <SelectItem key="Lodging">Lodging</SelectItem>
          </Select>
        </div>

        {/* Food */}
        <div className="flex items-center space-x-2 flex-1 min-w-[230px]">
          <MdOutlineLocalDining className="text-dark text-md" />
          <Select
            placeholder={food || "Select Food and Drink"}
            selectedKeys={[food]}
            onSelectionChange={(value) => setFood(value)}
          >
            <SelectItem key="Restaurant">Restaurant</SelectItem>
            <SelectItem key="Bar">Bar</SelectItem>
          </Select>
        </div>

        {/* Shop */}
        <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
          <FaShop className="text-dark text-md" />
          <Select
            placeholder={shop || "Select Shop"}
            selectedKeys={[shop]}
            onSelectionChange={(value) => setShop(value)}
            className="whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <SelectItem key="Souvenir">Souvenir Shop</SelectItem>
          </Select>
        </div>

        {/* Search Button */}
        <div className="ml-4 mt-4 md:mt-0">
          <Button auto onClick={handleSearch} className='bg-color1 text-light hover:bg-color2'>
            <FaSearch />
            <span className="ml-2">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;

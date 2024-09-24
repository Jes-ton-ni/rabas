import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaWalking, FaBed } from 'react-icons/fa';
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/react';
import { MdOutlineLocalDining } from "react-icons/md";
import { FaShop } from "react-icons/fa6";

const Search = () => {
  const [destination, setDestination] = useState(null);
  const [activity, setActivity] = useState(null);
  const [accommodation, setAccommodation] = useState(null);
  const [food, setFood] = useState(null);
  const [shop, setShop] = useState(null);

  const handleSearch = () => {
    // Handle search logic based on the selected options
    console.log('Selected Destination:', destination);
    console.log('Selected Activity:', activity);
    console.log('Selected Accommodation:', accommodation);
    console.log('Selected Food:', food);
    console.log('Selected Shop:', shop);
  };

  // This function will toggle between selecting and deselecting an option
  const handleToggleSelection = (value, currentSelection, setSelection) => {
    if (currentSelection === value) {
      setSelection(null); // Reset to the default (unselected)
    } else {
      setSelection(value); // Otherwise, select the new option
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-light rounded-md shadow-lg p-4 flex flex-wrap justify-center gap-4">
        
        {/* Destination */}
        <div className="flex items-center space-x-2 flex-1 min-w-[195px]">
          <FaMapMarkerAlt className="text-dark text-md" />
          <Select
            placeholder={!destination ? "Select Destination" : destination}
            selectedKeys={destination ? [destination] : []}
            onSelectionChange={(value) => handleToggleSelection(value.currentKey, destination, setDestination)}
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
            placeholder={!activity ? "Select Activity" : activity}
            selectedKeys={activity ? [activity] : []}
            onSelectionChange={(value) => handleToggleSelection(value.currentKey, activity, setActivity)}
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
            placeholder={!accommodation ? "Select Accommodation" : accommodation}
            selectedKeys={accommodation ? [accommodation] : []}
            onSelectionChange={(value) => handleToggleSelection(value.currentKey, accommodation, setAccommodation)}
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
            placeholder={!food ? "Food Place" : food}
            selectedKeys={food ? [food] : []}
            onSelectionChange={(value) => handleToggleSelection(value.currentKey, food, setFood)}
          >
            <SelectItem key="Restaurant">Restaurant</SelectItem>
            <SelectItem key="Bar">Bar</SelectItem>
          </Select>
        </div>

        {/* Shop */}
        <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
          <FaShop className="text-dark text-md" />
          <Select
            placeholder={!shop ? "Select Shop" : shop}
            selectedKeys={shop ? [shop] : []}
            onSelectionChange={(value) => handleToggleSelection(value.currentKey, shop, setShop)}
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

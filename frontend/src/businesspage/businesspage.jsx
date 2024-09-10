import React, { useState } from 'react'
import Nav from '../components/navuser'
import HeroAndGallery from './BusinessComponents/BusinessHero'
import Footer from '@/components/Footer'
import Info from '../businesspage/BusinessComponents/BuseinessInfo.jsx'
import Search from '@/components/Search'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { Button } from '@nextui-org/react'
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { useBusinessContext } from './BusinessComponents/BusinessContext'
import { businessIcons } from './BusinessComponents/businessIcons'

const BusinessPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const { businessData } = useBusinessContext();
  const averageRating = businessData.averageRating || 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<IoStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<IoStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<IoStarOutline key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    // Here you would typically save the state to a backend or local storage
    // For example: saveToBackend(isLiked);
  };

  const renderIcon = (iconName) => {
    const IconComponent = businessIcons.find(icon => icon.name === iconName)?.icon;
    return IconComponent ? <IconComponent className="inline-block mr-2" /> : null;
  };
  
  return (
    <div className='mx-auto min-h-screen bg-light font-sans'>
      <Nav />
      <div className='container p-3 rounded-md mt-[7.2rem] flex justify-center'> 
        <div className=''><Search/></div>
      </div>
     
      <HeroAndGallery />
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap items-center gap-4 py-4'>
          <img className='h-16 sm:h-24' src={businessData.businessLogo} alt="Business Logo" />
          <h1 className='text-xl sm:text-2xl font-medium mr-16'>{businessData.businessName}</h1>
           
          <div className='flex flex-wrap items-center gap-3'>
            <Button className='h-9 px-3 bg-slate-300 hover:text-white hover:bg-color2/90'>
              <div className='text-sm flex items-center gap-2'>
                <IoChatbubbleEllipsesOutline />Message
              </div>
            </Button>
            <Button
              className={`h-9 px-3 ${
                isLiked ? 'bg-color2 text-white' : 'bg-slate-300 hover:text-white hover:bg-color2/90'
              }`}
              onClick={handleLikeClick}
            >
              <div className='text-sm flex items-center gap-2'>
                <AiOutlineLike />
                {isLiked ? 'Liked' : 'Like'}
              </div>
            </Button>
            <div className="flex items-center">
              {renderStars(averageRating)}
              <span className="ml-1 text-sm">{averageRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
          {businessData.socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-sm text-gray-600 hover:text-color2"
            >
              {renderIcon(link.icon)}
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <Info/>
      </div>

      <Footer/>
    </div>
  )
}

export default BusinessPage
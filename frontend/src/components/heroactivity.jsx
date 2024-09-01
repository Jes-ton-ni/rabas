import React from 'react';
import Sorso from '../assets/activity.jpg';

const HeroDestination = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center mx-auto bg-cover bg-center h-[400px] mt-28 "
      style={{
        backgroundImage: `url(${Sorso})`,
      }}
    >
      <div className="absolute inset-0 bg-dark opacity-60"></div>
      
      <div className="relative  flex flex-col items-center ">
        <h1 className="text-light text-5xl mb-4">Create Memorable Experience</h1>
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-light">
            <li><a href="/" className="hover:underline duration-200">Home</a></li>
            <li>/</li>
            <li >Activities</li>
          </ol>
        </nav>
      </div>
      
    </div>
  );
}

export default HeroDestination;

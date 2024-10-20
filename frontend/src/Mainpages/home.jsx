import React from 'react';  
import Nav from '../components/nav';
import Hero from '../components/hero';
import Footer from '../components/Footer';
import Search from '../components/Search';
import { PiChatCircleText } from 'react-icons/pi';



const Home = () => {  
  return (  
    <div className='mx-auto min-h-screen bg-light font-sans '>
      {/** NAVBAR */}
      <div>
        <Nav />
      </div>
      
      {/** HERO */}
      <div>
        <Hero />
      </div>

        {/** Search */}

        <div >
         <Search />
           </div>

      <div className='h-[900px]'></div>

        {/* Floating chat button */}
        <button
          className="fixed bottom-4 right-4 bg-color1 text-white p-4 rounded-full shadow-lg hover:bg-color2 focus:outline-none z-50"
         
        >
          <PiChatCircleText size={30} />
        </button>

      {/** Footer */}
      <Footer />
    </div>  
  );  
};  

export default Home;

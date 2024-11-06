import React, { useState, useEffect } from 'react';  
import Nav from '../components/nav';
import Hero from '../components/hero';
import Footer from '../components/Footer';
import Search from '../components/Search';
import { Spinner } from '@nextui-org/react';
import DestinationSection from './HomePageSections/DestinationSection';
import BusinessSection from './HomePageSections/BusinessSection';
import { motion } from 'framer-motion'; // Import Framer Motion
import PlanTripSection from './HomePageSections/PlanTripSection';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false); // State to show/hide button

     // Title Tab
     useEffect(() => {
      document.title = 'RabaSorsogon | Home';
    }, []);
  

    useEffect(() => {

      // Simulate data fetching
      setTimeout(() => setLoading(false), 1000);

      // Show button when scrolled down
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
      return <Spinner className='flex justify-center items-center h-screen' size='lg' label="Loading..." color="primary" />;
    }

  return (  
    <div className='mx-auto min-h-screen bg-light font-sans '>
      <Nav />
      <Hero />
      <Search/>
      <DestinationSection />
      <BusinessSection/>
      <PlanTripSection/>

      
      {/** Footer */}
      <Footer />

      {showButton && (
        <motion.button
          className="fixed bottom-5 right-2 p-3 rounded-full shadow-lg z-10"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop" }}
          style={{
            background: 'linear-gradient(135deg, #688484  0%, #092635 100%)', // Gradient color
            color: 'white',
          }}
        >
          ↑
        </motion.button>
      )}
    </div>  
  );  
};  

export default Home;

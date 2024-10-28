import React, { useState, useEffect } from 'react';  
import Nav from '../components/nav';
import Hero from '../components/hero';
import Footer from '../components/Footer';
import Search from '../components/Search';
import { Spinner } from '@nextui-org/react';




const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Spinner className='flex justify-center items-center h-screen' size='lg' label="Loading..." color="primary" />;
  }

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
         <Search/>
           </div>

      <div className='h-screen  bg-color2 mb-2'></div>
     

      
      {/** Footer */}
      <Footer />
    </div>  
  );  
};  

export default Home;

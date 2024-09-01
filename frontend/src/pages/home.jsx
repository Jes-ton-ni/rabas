import React from 'react';  
import Nav from '../components/nav';
import Hero from '../components/hero';
import Footer from '../components/Footer';



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

  


      <div className='h-[900px]'></div>

      {/** Footer */}
      <Footer />
    </div>  
  );  
};  

export default Home;

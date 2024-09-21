import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react"; // Importing Button from @nextui-org/react



const sampleDeals = [
  { id: 1, name: 'Deal 1', description: 'Description for deal 1', price: 100, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Deal 2', description: 'Description for deal 2', price: 200, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Deal 3', description: 'Description for deal 3', price: 300, image: 'https://via.placeholder.com/150' },
  // Add more sample deals as needed
];

const sampleFeaturedProducts = [
  { id: 1, name: 'Featured Product 1', description: 'Description for featured product 1', price: 150, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Featured Product 2', description: 'Description for featured product 2', price: 250, image: 'https://via.placeholder.com/150' },
  // Add more sample featured products as needed
];

const BusinessSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // Disable arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleInquire = (deal) => {
    // Define what happens when the button is clicked
    console.log(`Inquiring about: ${deal.name}`);
  };

  return (
    <div className='mx-auto mt-4 container p-4 rounded-xl mb-4 bg-'>
      <h1 className='text-2xl font-semibold'>Deals</h1>
      <div className='mt-8'>
        <Slider {...settings}>
          {sampleDeals.map(deal => (
            <div key={deal.id} className='p-4'>
              <div className='shadow-lg rounded-lg overflow-hidden bg-white'> 
                <img src={deal.image} alt={deal.name} className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>{deal.name}</h3>
                  <p className='text-sm text-gray-600 mt-1'>{deal.description}</p>
                  <div className='flex justify-between'>
                  <p className='mt-2 font-bold text-gray-800'>₱{deal.price.toFixed(2)}</p>
                  <Button color="primary"  className='hover:bg-color2 duration-300' size="sm" onClick={() => handleInquire(deal)}>Inquire</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <h1 className='text-2xl font-semibold mt-8'>Featured Products</h1>
      <div className='mt-8'>
        <Slider {...settings}>
          {sampleFeaturedProducts.map(product => (
            <div key={product.id} className='p-4'>
              <div className='shadow-lg rounded-lg overflow-hidden bg-white'> 
                <img src={product.image} alt={product.name} className='w-full h-48 object-cover' />
                <div className='p-4  '>
                  <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>
                  <p className='text-sm text-gray-600 mt-1'>{product.description}</p>
                  <div className='flex justify-between'>
                  <p className='mt-2 font-bold text-gray-800'>₱{product.price.toFixed(2)}</p>
                  <Button color="primary" className='hover:bg-color2 duration-300' size="sm">Inquire</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BusinessSection;
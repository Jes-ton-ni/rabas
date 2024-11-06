import React from 'react'
import { Card, CardBody } from "@nextui-org/react"
import { Heart, Compass, Utensils, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'


const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700">
            At Rabasorsogon, we're passionate about showcasing the vibrant culture and natural beauty of Sorsogon. 
            Our expert local knowledge and commitment to authentic experiences set us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className='hover:scale-110 duration-400'>
            <CardBody className="text-center ">
              <Compass className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Expert Local Guides</h3>
              <p className="text-gray-600">Our guides know every hidden gem and secret spot in Sorsogon.</p>
            </CardBody>
          </Card>

          <Card className='hover:scale-110 duration-400'>
            <CardBody className="text-center">
              <Utensils className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Authentic Experiences</h3>
              <p className="text-gray-600">Immerse yourself in local culture and savor genuine Sorsogon flavors.</p>
            </CardBody>
          </Card>

          <Card className='hover:scale-110 duration-400'>
            <CardBody className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-gray-600">We tailor each journey to your interests and preferences.</p>
            </CardBody>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Choose Rabasorsogon for an unforgettable journey through the heart of Sorsogon. 
            We're dedicated to unveiling the province's hidden treasures and creating memories that last a lifetime.
          </p>
          <Link to='/about' target='_blank'>
          <button className="bg-color1 hover:bg-color2 hover:translate-x-1 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out">
            Read More
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
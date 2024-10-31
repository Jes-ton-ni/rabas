import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Card, CardBody, Textarea, Button, Avatar } from "@nextui-org/react";
import { businessIcons } from './businessIcons';
import DOMPurify from 'dompurify';
import { updateBusinessData } from '@/redux/businessSlice'; 
import { FaFacebook, FaInstagram, FaPhone, FaWifi } from 'react-icons/fa';


const StarRating = ({ rating, onRatingChange, size = "md" }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const starSize = size === "lg" ? "text-2xl md:text-3xl" : "text-lg md:text-xl";

  

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer ${starSize} ${star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewCard = ({ name, rating, comment, avatar }) => (
  <Card className="w-full">
    <CardBody className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
      <Avatar src={avatar} size="lg" />
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-3">{name}</h3>
          <StarRating rating={rating} onRatingChange={() => {}} />
        </div>
        <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment || '') }} />
      </div>
    </CardBody>
  </Card>
);

const BusinessInfo = () => {
  const businessData = useSelector((state) => state.business);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  if (!businessData) {
    return <div>Loading...</div>;
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      name: "Current User",
      rating,
      comment: review,
      avatar: "https://i.pravatar.cc/150?u=currentuser"
    };
    dispatch(updateBusinessData({ reviews: [newReview, ...(businessData.reviews || [])] }));
    setRating(0);
    setReview("");
  };

  const renderIcon = (iconName) => {
    const IconComponent = businessIcons.find(icon => icon.name === iconName)?.icon;
    return IconComponent ? <IconComponent className="inline-block mr-2" /> : null;
  };

  const sanitizeHtml = (html) => ({
    __html: DOMPurify.sanitize(html)
  });

  return (
    <div className='container mx-auto mt-4 px-4'>
      <Tabs aria-label="Business Information " className='max-w-full overflow-x-auto'>
        <Tab key="about-location" title="About Us">
          <Card>
            <CardBody>
              <div className="flex flex-col lg:flex-row h-auto lg:h-[47em] overflow-y-auto scrollbar-custom gap-8">
                <div className="flex-1 p-4">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">About Our Business</h2>
                  <div className='max-w-full lg:max-w-[40rem] w-full flex flex-col justify-center items-center'>
                    <div className="text-black mb-6 break-words whitespace-normal">
                      <h1 className="text-md font-normal">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos optio,
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                      </h1>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold flex items-center gap-3 mb-2">Contact Information</h3>
                    <ul className="space-y-2">
                      {businessData.contactInfo && businessData.contactInfo.map((info, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {renderIcon(info.icon)}
                          <span>{info.label}: {info.value}</span>
                        </li>
                      ))}
                      <li className='flex items-center gap-2'><FaFacebook /> Business Facebook page</li>
                      <li className='flex items-center gap-2'><FaInstagram /> Business Instagram</li>
                      <li className='flex items-center gap-2'><FaPhone /> 09123456645</li>
                    </ul>
                  </div>
                  <Card>
                    <CardBody>
                      <h3 className="text-xl font-semibold flex items-center gap-3 mb-3">Opening Hours</h3>
                      <ul className="space-y-2">
                        {businessData.openingHours && businessData.openingHours.map((hours, index) => (
                          <li key={index} className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">{hours.day}</span>
                            <span className="text-gray-600">6:00 am - 8:00 pm</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex-1 p-4">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Location</h2>
                  <p className="mb-4 text-gray-600">{businessData.location} Sorsogon City Philippines</p>
                  <div className="relative h-full rounded-xl mb-4">
                    {businessData.mapEmbedUrl ? (
                      <iframe
                        src={businessData.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Business Location Map"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = 'Map could not be loaded. Please try again later.';
                        }}
                      ></iframe>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        Map not available
                      </div>
                    )}
                  </div>
                  <Button color="primary" className="w-full mb-6 hover:bg-color2/90">
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="facilities" title="Facilities & Amenities">
          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-4">Our Facilities & Amenities</h2>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className='h-auto flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg shadow-md'>
                  <p className='font-semibold text-lg mb-2'>Swimming Pool</p>
                  <ul className='space-y-1'>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> Heated pool</li>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> Poolside bar</li>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> Lifeguard on duty</li>
                  </ul>
                </div>
                <div className='h-auto flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg shadow-md'>
                  <p className='font-semibold text-lg mb-2'>Gym</p>
                  <ul className='space-y-1'>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> 24/7 Access</li>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> Personal trainers available</li>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> Modern equipment</li>
                  </ul>
                </div>
                <div className='h-auto flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg shadow-md'>
                  <p className='font-semibold text-lg mb-2'>Conference Rooms</p>
                  <ul className='space-y-1'>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> High-speed internet</li>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> Audio/Visual equipment</li>
                    <li className='font-normal text-sm items-center gap-2 flex'><FaWifi /> Catering services</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="reviews" title="Reviews">
          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-4 mb-8">
                {businessData.reviews && businessData.reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    name={review.name}
                    rating={review.rating}
                    comment={review.comment}
                    avatar={review.avatar}
                  />
                ))}
              </div>
              <Card className="bg-gray-50">
                <CardBody>
                  <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="mb-2 font-semibold flex items-center gap-3">Your Rating</label>
                      <StarRating rating={rating} onRatingChange={setRating} size="lg" />
                    </div>
                    <Textarea
                      label="Your Review"
                      placeholder="Tell us about your experience..."
                      value={review}
                      onValueChange={setReview}
                      minRows={3}
                      className="w-full"
                      required
                    />
                    <Button
                      type="submit"
                      color="primary"
                      disabled={rating === 0 || !review}
                      className="w-full"
                    >
                      Submit Review
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="policies" title="Policies">
          <Card>
            <CardBody>
              <h2 className="text-2xl font-bold mb-4">Our Policies</h2>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className='h-auto flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg shadow-md'>
                  <p className='font-semibold text-lg mb-2'>Cancellation Policy</p>
                  <ul className='pl-5 space-y-1'>
                    <li className='font-normal text-sm list-disc items-center gap-2'>
                      <span className='flex-grow'>Free cancellation up to 24 hours before check-in</span>
                    </li>
                    <li className='font-normal text-sm list-disc items-center gap-2'>
                      <span className='flex-grow'>50% refund for cancellations within 24 hours</span>
                    </li>
                  </ul>
                </div>
                <div className='h-auto flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg shadow-md'>
                  <p className='font-semibold text-lg mb-2'>Pet Policy</p>
                  <ul className='pl-5 space-y-1'>
                    <li className='font-normal text-sm list-disc items-center gap-2'>
                      <span className='flex-grow'>Pets allowed with prior notice</span>
                    </li>
                    <li className='font-normal text-sm list-disc items-center gap-2'>
                      <span className='flex-grow'>Additional cleaning fee may apply</span>
                    </li>
                  </ul>
                </div>
                <div className='h-auto flex flex-col items-center w-full p-4 bg-gray-100 rounded-lg shadow-md'>
                  <p className='font-semibold text-lg mb-2'>Check-in/Check-out</p>
                  <ul className='pl-5 space-y-1'>
                    <li className='font-normal text-sm list-disc items-center gap-2'>
                      <span className='flex-grow'>Check-in: 3:00 PM</span>
                    </li>
                    <li className='font-normal text-sm list-disc items-center gap-2'>
                      <span className='flex-grow'>Check-out: 11:00 AM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default BusinessInfo;

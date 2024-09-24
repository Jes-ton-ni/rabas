import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Card, CardBody, Textarea, Button, Avatar } from "@nextui-org/react";
import { businessIcons } from './businessIcons';
import DOMPurify from 'dompurify';
import { updateBusinessData } from '@/redux/businessSlice'; 

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
          <h3 className="text-lg font-semibold">{name}</h3>
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
      <Tabs aria-label="Business Information">
        <Tab key="about-location" title="About Us">
          <Card>
            <CardBody>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">About Our Business</h2>
                  <div className="text-gray-600 mb-6" dangerouslySetInnerHTML={sanitizeHtml(businessData.aboutUs || '')} />
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                    <ul className="space-y-2">
                      {businessData.contactInfo && businessData.contactInfo.map((info, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {renderIcon(info.icon)}
                          <span>{info.label}: {info.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Card>
                    <CardBody>
                      <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>
                      <ul className="space-y-2">
                        {businessData.openingHours && businessData.openingHours.map((hours, index) => (
                          <li key={index} className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium">{hours.day}</span>
                            <span className="text-gray-600">{hours.open} - {hours.close}</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Location</h2>
                  <p className="mb-4 text-gray-600">{businessData.location}</p>
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-4">
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
              <h2 className="text-2xl font-bold mb-4">Our Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessData.facilities && businessData.facilities.map((facility, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      {renderIcon(facility.icon)}
                      <h3 className="font-semibold">{facility.name}</h3>
                    </div>
                    <div className="text-gray-600" dangerouslySetInnerHTML={sanitizeHtml(facility.description || '')} />
                  </div>
                ))}
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
                      <label className="block mb-2 font-semibold">Your Rating</label>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessData.policies && businessData.policies.map((policy, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{policy.title}</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {policy.items && policy.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default BusinessInfo;
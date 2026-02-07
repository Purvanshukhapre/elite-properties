import React from 'react';
import PropertyList from './PropertyList';

const RentPage = () => {
  return (
    <PropertyList
      initialType="rent"
      title="Luxury Rentals"
      subtitle="Experience world-class living with our curated selection of premium rental properties."
      backgroundImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=900&fit=crop"
    />
  );
};

export default RentPage;
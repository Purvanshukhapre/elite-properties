import React from 'react';
import PropertyList from './PropertyList';

const BuyPage = () => {
  return (
    <PropertyList
      initialType="buy"
      title="Purchase & Acquisition"
      subtitle="Discover your next asset from our exclusive portfolio of properties for sale."
      backgroundImage="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&h=900&fit=crop"
    />
  );
};

export default BuyPage;
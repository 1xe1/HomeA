// src/components/HouseAuctionPost.js
import React from 'react';

const HouseAuctionPost = ({ title, description, auctionTime }) => {
  return (
    <div className="bg-white p-4 my-4 border rounded-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-500">{`Auction Time: ${auctionTime}`}</p>
    </div>
  );
};

export default HouseAuctionPost;

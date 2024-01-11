// ShowHome.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ShowHome = () => {
  // Access the property ID from the URL parameters
  const { propertyID } = useParams();

  return (
    <div>
      <h2>ShowHome</h2>
      <p>Property ID: {propertyID}</p>
      {/* Fetch and display additional details based on propertyID if needed */}
    </div>
  );
};

export default ShowHome;

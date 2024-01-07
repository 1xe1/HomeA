// Main.jsx
import React, { useState, useEffect } from "react";
import { DataHomeB } from "../Api/ApiHomeB";
import { DataHomeP } from "../Api/ApiHomeP";
import { DataHomeU } from "../Api/ApiHomeU";

const Main = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("Fetched data:", data);
        setProperties(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchData = async () => {
    try {
      const [bids, properties, users] = await Promise.all([
        DataHomeB(),
        DataHomeP(),
        DataHomeU(),
      ]);

      // Merge data based on common keys (e.g., PropertyID, UserID)
      const mergedData = properties.map((property) => {
        const correspondingBid = bids.find((bid) => bid.PropertyID === property.PropertyID);
        const correspondingUser = users.find((user) => user.UserID === correspondingBid.UserID);

        return {
          ...property,
          ...correspondingBid,
          ...correspondingUser,
        };
      });

      return mergedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.Username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.BidAmount.toString().includes(searchQuery.toLowerCase()) ||
      property.PropertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.Province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.District.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <div className="p-3 bg-purple-50/40 rounded shadow-md mb-10">
        {/* Search Section */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search...."
            className="p-2 border border-gray-300 rounded flex-1 text-center"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Display Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {filteredProperties.map((property) => (
          <div
          key={property.PropertyID}
          className="bg-purple-50/80 p-5 rounded shadow-md min-h-80 m-2"
          >
            {/* Display Property Card Content */}
            <h3 className="text-xl font-bold">{property.PropertyName}</h3>
            <p>Name: {property.Username}</p>
            <p>Bid Amount: {property.BidAmount}</p>
            <p>Province: {property.Province}</p>
            <p>District: {property.District}</p>
            {property.ImageLink && (
              <img src={property.ImageLink} alt={`Property ${property.PropertyID}`} className="mt-4 w-full h-auto" />
            )}
            {/* Additional Property Details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;

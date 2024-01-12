//Main
import React, { useState, useEffect } from "react";
import { DataHomeB } from "../Api/ApiHomeB";
import { DataHomeP } from "../Api/ApiHomeP";
import { DataHomeU } from "../Api/ApiHomeU";
import ShowHome from "../ShowHome";
import './index.css';
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";



const Main = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bidsPagePropertyID, setBidsPagePropertyID] = useState(null);


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

      const mergedData = properties.map((property) => {
        const correspondingBid = bids.find(
          (bid) => bid.PropertyID === property.PropertyID
        );
        const correspondingUser = users.find(
          (user) => user.UserID === correspondingBid.UserID
        );

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

  const handleBidClick = (property) => {
    setSelectedProperty(property);
    setShowPopup(true);
  };
  const handleBidsButtonClick = () => {
    setBidsPagePropertyID(selectedProperty.PropertyID);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen w-screen overflow-y-auto">
      <div className="container mx-auto p-8 ">
        <div className="p-3 bg-purple-50/40 rounded shadow-md mb-10">
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

        <div className="p-1 flex flex-wrap items-center justify-center">
          {filteredProperties.map((property, index) => (
            <React.Fragment key={`property-${property.PropertyID}-${index}`}>
              <div className="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500/80 rounded-lg w-72 h-96 shadow-lg">
                <svg
                  className="absolute bottom-0 left-0 mb-8"
                  viewBox="0 0 375 283"
                  fill="none"
                  style={{ transform: "scale(1.5)", opacity: 0.1 }}
                >
                  <rect
                    x="159.52"
                    y="175"
                    width="152"
                    height="152"
                    rx="8"
                    transform="rotate(-45 159.52 175)"
                    fill="white"
                  />
                  <rect
                    y="107.48"
                    width="152"
                    height="152"
                    rx="8"
                    transform="rotate(-45 0 107.48)"
                    fill="white"
                  />
                </svg>
                <div className="relative pt-10 px-6 h-60 flex items-center justify-center">
                  {property.ImageLink && (
                    <img
                      src={property.ImageLink}
                      alt={`Property ${property.PropertyID}`}
                      className="relative w-100% h-auto border border-purple-900"
                    />
                  )}
                </div>
                <div className="relative text-white px-6 pb-6 mt-6">
                  <span className="block opacity-75 -mb-1">
                    Name {property.Username}
                  </span>
                  <div className="flex justify-between pt-2 h-10">
                    <span className="block font-semibold text-xl">
                      {property.PropertyName}
                    </span>
                    <div className="" onClick={() => handleBidClick(property)}>
                      <span className="group-hover block bg-white rounded-full text-purple-500 text-xs text-center font-bold px-3 py-2">
                        {`$${Number(property.BidAmount).toFixed(2)}`}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {(index + 1) % 4 === 0 && (
                <div key={`row-separator-${index}`} className="w-full h-8"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        
        {showPopup && selectedProperty && (
          <div className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center" >
            <div className="bg-white p-8 rounded-lg">
            <div className="">
              <FaWindowClose className=" size-9 hover:w-11 h-auto" onClick={handleClosePopup}/>
            </div>
              <h2 className=" text-black pb-2">{selectedProperty.PropertyName}</h2>
              <div className="">
                <img
                  src={selectedProperty.ImageLink}
                  alt={`Property ${selectedProperty.PropertyID}`}
                  className=" w-96 h-auto pb-4"
                />
              </div>
              <p>User: {selectedProperty.Username}</p>
              <p>Province: {selectedProperty.Province}</p>
              <p>District: {selectedProperty.District}</p>
              <p>Description: {selectedProperty.Description}</p>
              <p>Bid Amount: ${Number(selectedProperty.BidAmount).toFixed(2)}</p>
              <div className="pl-14 pt-5">
                <div>
                  Start: {selectedProperty.StartTime}
                </div>
                <div>
                  End: {selectedProperty.EndTime}

                </div>
              </div>
              {/* Add other property details as needed */}
              <Link to={`/showhome/${selectedProperty.PropertyID}`}>
              <button onClick={handleBidsButtonClick}>Bids{selectedProperty.PropertyID}</button>
            </Link>
            </div>
          </div>
        )}
        {bidsPagePropertyID && <ShowHome propertyID={bidsPagePropertyID} />}
      </div>
    </div>
  );
};

export default Main;

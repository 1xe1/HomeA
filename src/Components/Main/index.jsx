import React, { useState, useEffect } from "react";
import { DataMain } from "../Api/ApiMain";
import ShowHome from "../ShowHome";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './index.css';
import { DataHomeP } from "../Api/ApiHomeP";

const Main = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bidsPagePropertyID, setBidsPagePropertyID] = useState(null);
  const [showAddPropertyPopup, setShowAddPropertyPopup] = useState(false);

  const [newProperty, setNewProperty] = useState({
    PropertyName: '',
    Description: '',
    Province: '',
    District: '',
    CurrentBid: 0,
    StartTime: '',
    EndTime: '',
    ImageLink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleAddPropertyClick = () => {
    setShowAddPropertyPopup(true);
  };

  const handleCloseAddPropertyPopup = () => {
    setShowAddPropertyPopup(false);
  };

  const handleAddProperty = async () => {
    try {
      const response = await fetch("http://localhost:8081/HomeA/apiHomeP/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProperty),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Property added successfully");
        console.log("New Property Data:", responseData);
        setShowAddPropertyPopup(false);
        fetchData(); // Refetch data after adding a new property
      } else {
        const responseData = await response.json();
        toast.error("Failed to add property");
        console.error("Error in response:", responseData);
      }
    } catch (error) {
      toast.error("Error adding property");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await DataHomeP();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.Username?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      property.CurrentBid?.toString().includes(searchQuery?.toLowerCase()) ||
      property.PropertyName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      property.Province?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      property.District?.toLowerCase().includes(searchQuery?.toLowerCase())
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
      <div className="container mx-auto p-8 bg-purple-900/40 rounded min-h-screen w-screen overflow-y-auto">
        <div className="flex justify-evenly">
          <div className="bg-purple-50/40 shadow-md p-3 rounded w-60">
            <input
              type="text"
              placeholder="Search...."
              className="p-2 border border-gray-300 rounded flex-1 text-center"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="bg-purple-50/40 shadow-md p-2 rounded w-60">
            <button className="w-full h-full bg-green-500 rounded p-4 hover:bg-green-300 hover:text-lg" onClick={handleAddPropertyClick}>
              เพิ่มการประมูล
            </button>
          </div>
        </div>

        <div className="p-1 flex flex-wrap items-center justify-center">
        {filteredProperties.length === 0 ? (
          <div className="text-center text-white mt-8">
            No matching results found. Showing all properties.
          </div>
        ) : (
          filteredProperties.map((property, index) => (
            <React.Fragment key={`property-${property.PropertyID}-${index}`}>
              <div className="flex-shrink-0 m-2 relative overflow-hidden bg-purple-500/80 rounded-lg w-52 h-80 shadow-lg">
                <svg
                  className="absolute bottom-0 left-0 mb-8"
                  viewBox="0 0 375 283"
                  fill="none"
                  style={{ transform: "scale(1.5)", opacity: 0.1 }}
                >
                  <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                  <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                </svg>
                <div className="relative pt-8 px-4 h-60 flex items-center justify-center">
                  {property.ImageLink && (
                    <img
                      src={property.ImageLink}
                      alt={`Property ${properties.PropertyID}`}
                      className="relative w-100% h-auto border border-purple-900"
                    />
                  )}
                </div>
                <div className="relative text-white px-4 pb-4 mt-4">
                  <span className="block opacity-75 -mb-1">Name {property.Username}</span>
                  <div className="flex justify-between pt-2 h-10">
                    <span className="block font-semibold text-md">{property.PropertyName}</span>
                    <div className="" onClick={() => handleBidClick(property)}>
                      <span className="group-hover block bg-white rounded-full text-purple-500 text-xs text-center font-bold px-3 py-2">
                        {property.CurrentBid ? `$${property.CurrentBid}` : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {(index + 1) % 3 === 0 && <div key={`row-separator-${index}`} className="w-full h-4"></div>}
            </React.Fragment>
          ))
        )}
      </div>

      {showAddPropertyPopup && (
          <div className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full flex flex-col">
              <div className="flex justify-end">
                <FaWindowClose className="hover:text-gray-700 focus:outline-none ml-auto size-10" onClick={handleCloseAddPropertyPopup} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Property</h2>

              {/* Property Registration Form */}
              <form>
                <div className="mb-4">
                  <label htmlFor="propertyName" className="text-gray-800 block font-semibold mb-2">Property Name:</label>
                  <input type="text" id="propertyName" name="PropertyName" onChange={handleInputChange} value={newProperty.PropertyName} className="p-2 border border-gray-300 rounded w-full" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="text-gray-800 block font-semibold mb-2">Description:</label>
                  <textarea id="description" name="Description" onChange={handleInputChange} value={newProperty.Description} className="p-2 border border-gray-300 rounded w-full" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="province" className="text-gray-800 block font-semibold mb-2">Province:</label>
                  <input type="text" id="province" name="Province" onChange={handleInputChange} value={newProperty.Province} className="p-2 border border-gray-300 rounded w-full" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="district" className="text-gray-800 block font-semibold mb-2">District:</label>
                  <input type="text" id="district" name="District" onChange={handleInputChange} value={newProperty.District} className="p-2 border border-gray-300 rounded w-full" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="currentBid" className="text-gray-800 block font-semibold mb-2">Current Bid:</label>
                  <input type="number" id="currentBid" name="CurrentBid" onChange={handleInputChange} value={newProperty.CurrentBid} className="p-2 border border-gray-300 rounded w-full" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="startTime" className="text-gray-800 block font-semibold mb-2">Start Time:</label>
                  <input type="datetime-local" id="startTime" name="StartTime" onChange={handleInputChange} value={newProperty.StartTime} className="p-2 border border-gray-300 rounded w-full" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="endTime" className="text-gray-800 block font-semibold mb-2">End Time:</label>
                  <input type="datetime-local" id="endTime" name="EndTime" onChange={handleInputChange} value={newProperty.EndTime} className="p-2 border border-gray-300 rounded w-full" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="ImageLink" className="text-gray-800 block font-semibold mb-2">ImageLink:</label>
                  <input type="text" id="ImageLink" name="ImageLink" onChange={handleInputChange} value={newProperty.ImageLink} className="p-2 border border-gray-300 rounded w-full" required />
                </div>

                {/* Add more fields as needed */}

                <div className="mt-4">
                  <button type="button" className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700" onClick={handleAddProperty}>
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showPopup && selectedProperty && (
          <div className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full flex flex-col">
              <div className="flex justify-end">
                <FaWindowClose className="hover:text-gray-700 focus:outline-none ml-auto size-10" onClick={handleClosePopup} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedProperty.PropertyName}</h2>
              <div className="mb-4">
                <img src={selectedProperty.ImageLink} alt={`Property ${selectedProperty.PropertyID}`} className="w-full h-auto rounded-lg" />
              </div>
              <div className="text-gray-700">
                {/* ... (Details about the selected property) */}
              </div>
              <div className="mt-4">
                <Link to={`/showhome/${selectedProperty.PropertyID}`}>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700" onClick={handleBidsButtonClick}>
                    View Bids
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {bidsPagePropertyID && <ShowHome propertyID={bidsPagePropertyID} />}
      </div>
    </div>
  );
};

export default Main;
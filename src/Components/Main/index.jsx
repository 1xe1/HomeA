// Import useEffect, useState from React
import React, { useState, useEffect } from "react";
import "./index.css";
import { DataHomeB } from "../Api/ApiHomeB";
import { DataHomeP } from "../Api/ApiHomeP";
import { DataHomeU } from "../Api/ApiHomeU";

const Main = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [biddingHistory, setBiddingHistory] = useState([]);

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

  const calculateTimeLeft = (endTime) => {
    const currentTime = new Date();
    const endDateTime = new Date(endTime);
    const timeDifference = endDateTime - currentTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${days}d ${hours}h ${minutes}m`;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handlePopup = async (property) => {
    setSelectedProperty(property);

    // Fetch bidding history based on PropertyID
    try {
      const biddingHistoryData = await fetchBiddingHistory(property.PropertyID);
      setBiddingHistory(biddingHistoryData);
    } catch (error) {
      console.error("Error fetching bidding history:", error);
    }
  };

  const fetchBiddingHistory = async (propertyID) => {
    try {
      // Replace the following line with actual API call to fetch bidding history
      // const response = await fetch(`/api/bidding-history?propertyID=${propertyID}`);
      // const biddingHistoryData = await response.json();

      // Mock data for testing
      const biddingHistoryData = [
        {
          BidID: 1,
          Username: "User1",
          BidAmount: 150000,
          BidTime: "2023-02-15T12:30:00Z",
        },
        {
          BidID: 2,
          Username: "User2",
          BidAmount: 160000,
          BidTime: "2023-02-16T14:45:00Z",
        },
        // Add more entries as needed
      ];

      return biddingHistoryData;
    } catch (error) {
      console.error("Error fetching bidding history:", error);
      return [];
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-y-auto">
      <div className="container mx-auto p-8 ">
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
        <div className="p-1 flex flex-wrap items-center justify-center">
          {filteredProperties.map((property, index) => (
            <React.Fragment key={property.PropertyID}>
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
                    <div className="">
                      <span
                        className="group-hover block bg-white rounded-full text-purple-500 text-xs text-center font-bold px-3 py-2 leading-none flex items-center "
                        onClick={() => handlePopup(property)}
                      >
                        {`$${Number(property.BidAmount).toFixed(2)}`}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {(index + 1) % 4 === 0 && (
                <div
                  key={`row-separator-${index}`}
                  className="w-full h-8"
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        // Inside the render part of your component
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md w-full rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                {selectedProperty.PropertyName}
              </h2>
              <img
                src={selectedProperty.ImageLink}
                alt={`Property ${selectedProperty.PropertyID}`}
                className="relative w-full h-auto border border-purple-900 mt-4"
              />
              <p>
                <strong>Current Bid:</strong>{" "}
                {selectedProperty.CurrentBid
                  ? `$${Number(selectedProperty.CurrentBid).toFixed(2)}`
                  : "N/A"}
              </p>
              <p>
                <strong>Time Left:</strong>{" "}
                {calculateTimeLeft(selectedProperty.EndTime)}
              </p>
              <p>
                <strong>Scheduled End Date:</strong>{" "}
                {formatDate(selectedProperty.EndTime)}
              </p>
              <h3 className="text-xl font-semibold mt-4">Bidding History:</h3>
              <table className="w-full mt-2">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">User</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {biddingHistory.map((bid) => (
                    <tr key={bid.BidID}>
                      <td className="py-2 px-4 border-b">{bid.Username}</td>
                      <td className="py-2 px-4 border-b">
                        ${bid.BidAmount.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {formatDate(bid.BidTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => setSelectedProperty(null)}
              >
                ปิด
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;

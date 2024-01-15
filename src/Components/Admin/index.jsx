import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataHomeB } from '../Api/ApiHomeB';
import { DataHomeU } from '../Api/ApiHomeU';
import { DataHomeP } from '..//Api/ApiHomeP'
import { FaEdit, FaTrash, FaUsersCog, FaHome } from 'react-icons/fa';
import { RiAuctionFill } from 'react-icons/ri';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';

const Admin = () => {
  const [dataB, setDataB] = useState([]);
  const [dataU, setDataU] = useState([]);
  const [dataP, setDataP] = useState([]);
  const tableRef = useRef();
  const [showBids, setShowBids] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [editedUser, setEditedUser] = useState({
  });
  const [isEditUserFormVisible, setEditUserFormVisible] = useState(false);
  const [editedProperty, setEditedProperty] = useState({});
  const [isEditPropertyFormVisible, setEditPropertyFormVisible] = useState(false);

  const refreshData = async () => {
    try {
      const resultBids = await DataHomeB();
      setDataB(resultBids);

      const resultUsers = await DataHomeU();
      setDataU(resultUsers);

      const resultProperties = await DataHomeP();
      setDataP(resultProperties);

      initializeDataTable();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };
  const fetchData = async () => {
    try {
      const resultBids = await DataHomeB();
      setDataB(resultBids);

      const resultUsers = await DataHomeU();
      setDataU(resultUsers);

      const resultProperties = await DataHomeP();
      setDataP(resultProperties);

      initializeDataTable();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleEditUser = (UserID) => {
    // Set the user to be edited
    const userToEdit = dataU.find((user) => user.UserID === UserID);

    // Set the edited user state
    setEditedUser({
      UserID: userToEdit.UserID,
      Username: userToEdit.Username,
      Password: userToEdit.Password,
      Email: userToEdit.Email,
    });

    // Show the edit user form
    setEditUserFormVisible(true);
  };
  const handleEditProperty = (PropertyID) => {
    // Set the property to be edited
    const propertyToEdit = dataP.find((property) => property.PropertyID === PropertyID);

    // Set the edited property state
    setEditedProperty({
      PropertyID: propertyToEdit.PropertyID,
      PropertyName: propertyToEdit.PropertyName,
      Description: propertyToEdit.Description,
      Province: propertyToEdit.Province,
      District: propertyToEdit.District,
      CurrentBid: propertyToEdit.CurrentBid,
      StartTime: propertyToEdit.StartTime,
      EndTime: propertyToEdit.EndTime,
      ImageLink: propertyToEdit.ImageLink,
    });

    // Show the edit property form
    setEditPropertyFormVisible(true);
  };


  const initializeDataTable = useCallback(() => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    if (dataB.length > 0 || dataU.length > 0 || dataP.length > 0) {
      $(tableRef.current).DataTable();
    }
  }, [dataB, dataU, dataP]);

  useEffect(() => {
    fetchData();
    refreshData();
  }, [showBids, showUsers, showProperties]); // Fetch data whenever the section changes

  useEffect(() => {
    initializeDataTable();
  }, [dataB, dataU, dataP, showBids, showUsers, showProperties, initializeDataTable]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete('http://localhost:8081/HomeA/apiHomeU/', {
        data: { UserID: id },
      });

      if (response.data.status === 'success') {
        toast.success(`Deleting user with ID ${id}`);
        // Update state without refetching data
        setDataU(prevDataU => prevDataU.filter(user => user.UserID !== id));
        // Trigger a refresh
        refreshData();
      } else {
        toast.error(`Error deleting user with ID ${id}: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteProperty = async (PropertyID) => {
    try {
      const response = await axios.delete('http://localhost:8081/HomeA/apiHomeP/', {
        data: { PropertyID: PropertyID },
      });

      if (response.data.status === 'success') {
        toast.success(`Deleting property with ID ${PropertyID}`);
        // Update state without refetching data
        setDataP(prevDataP => prevDataP.filter(property => property.PropertyID !== PropertyID));
        // Trigger a refresh
        refreshData();
      } else {
        toast.error(`Error deleting property with ID ${PropertyID}: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      // Add your logic to update the user data
      // For demonstration, let's assume you have an API endpoint for updating users
      const response = await axios.put(`http://localhost:8081/HomeA/apiHomeU/${editedUser.UserID}`, editedUser);
      console.log('Response:', response.data);
      if (response.data.status === 'success') {
        toast.success(`User with ID ${editedUser.UserID} updated successfully`);
        // Update state without refetching data
        setDataU((prevDataU) =>
          prevDataU.map((user) => (user.UserID === editedUser.UserID ? { ...user, ...editedUser } : user))
        );
        // Close the edit form or modal
        setEditUserFormVisible(false);
        setEditedUser({
          UserID: '',
          Username: '',
          Password: '',
          Email: '',
        });
        // Trigger a refresh
        refreshData();
      } else {
        toast.error(`Error updating user with ID ${editedUser.UserID}: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleUpdateProperty = async () => {
    try {
      // Add your logic to update the property data
      // For demonstration, let's assume you have an API endpoint for updating properties
      const response = await axios.put(`http://localhost:8081/HomeA/apiHomeP/${editedProperty.PropertyID}`, editedProperty);
      console.log('Response:', response.data);
      if (response.data.status === 'success') {
        toast.success(`Property with ID ${editedProperty.PropertyID} updated successfully`);
        // Update state without refetching data
        setDataP((prevDataP) =>
          prevDataP.map((property) => (property.PropertyID === editedProperty.PropertyID ? { ...property, ...editedProperty } : property))
        );
        // Close the edit form or modal
        setEditPropertyFormVisible(false);
        setEditedProperty({
          PropertyID: '',
          PropertyName: '',
          Description: '',
          Province: '',
          District: '',
          CurrentBid: '',
          StartTime: '',
          EndTime: '',
          ImageLink: '',
        });
        // Trigger a refresh
        refreshData();
      } else {
        toast.error(`Error updating property with ID ${editedProperty.PropertyID}: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleCancelUpdateProperty = () => {
    // Close the edit form or modal
    setEditPropertyFormVisible(false);
    // Clear the currently editing property
    setEditedProperty(null);
    // Reset the editedProperty state
    setEditedProperty({
      PropertyID: '',
      PropertyName: '',
      Description: '',
      Province: '',
      District: '',
      CurrentBid: '',
      StartTime: '',
      EndTime: '',
      ImageLink: '',
    });
  };


  const handleCancelUpdate = () => {
    // Close the edit form or modal
    setEditUserFormVisible(false);
    // Clear the currently editing user
    setEditingUser(null);
    // Reset the editedUser state
    setEditedUser({
      UserID: '',
      Username: '',
      Password: '',
      Email: '',
    });
  };


  useEffect(() => {
    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [showBids, showProperties, showUsers]);

  useEffect(() => {
    if (showBids || showUsers || showProperties) {
      if (tableRef.current) {
        $(tableRef.current).DataTable();
      }
    }
  }, [showBids, showUsers, showProperties]);

  return (
    <div className="min-h-screen w-screen overflow-y-auto bg-purple-900/40 flex justify-center pb-5 pt-5">
      <div className="w-10/12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className='flex justify-evenly items-center h-32'>
            {/* <button
              className='h-28 border border-black p-2 rounded-md bg-white hover:bg-gray-200 focus:outline-none'
              onClick={() => { setShowBids(true); setShowProperties(false); setShowUsers(false); }}
            >
              <RiAuctionFill className=' size-16 w-full' /> Bids Data Management
            </button> */}
            <button
              className='h-36 w-52 border border-black p-2 rounded-md bg-white hover:bg-gray-200 focus:outline-none'
              onClick={() => { setShowBids(false); setShowProperties(true); setShowUsers(false); }}
            >
              <FaHome className=' size-16 w-full' /> Properties
            </button>
            <button
              className='h-36 w-52 border border-black p-2 rounded-md bg-white hover:bg-gray-200 focus:outline-none'
              onClick={() => { setShowBids(false); setShowProperties(false); setShowUsers(true); }}
            >
              <FaUsersCog className=' size-16 w-full' /> Users
            </button>
          </div>
          {showBids && (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">Bid Data Management</h1>
              <div className="overflow-x-auto">
                <table

                  ref={tableRef}
                  className="table-auto w-full border border-collapse border-black/10"
                >
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3">Bid ID</th>
                      <th className="p-3">Property ID</th>
                      <th className="p-3">User ID</th>
                      <th className="p-3">Bid Amount</th>
                      <th className="p-3">Bid Time</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataB.map(row => (
                      <tr key={row.BidID}>
                        <td className="p-3">{row.BidID}</td>
                        <td className="p-3">{row.PropertyID}</td>
                        <td className="p-3">{row.UserID}</td>
                        <td className="p-3">{row.BidAmount}</td>
                        <td className="p-3">{row.BidTime}</td>
                        <td className="p-3 flex">
                          <button
                            className=" text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(row.BidID)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(row.BidID)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Other sections go here */}
          {showProperties && (
            // Display properties data here
            <>
              <h1 className="text-2xl font-bold text-center mb-6">จัดการข้อมูลบ้าน</h1>
              <div className="overflow-x-auto">
                <table
                  key={showBids || showUsers || showProperties}
                  ref={tableRef}
                  className="table-auto w-full border border-collapse border-black/10"
                >
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3">Property ID</th>
                      <th className="p-3">Property Name</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Province</th>
                      <th className="p-3">District</th>
                      <th className="p-3">Current Bid</th>
                      <th className="p-3">Start Time</th>
                      <th className="p-3">End Time</th>
                      <th className="p-3">Image Link</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataP.map(row => (
                      <tr key={row.PropertyID}>
                        <td className="p-3">{row.PropertyID}</td>
                        <td className="p-3">{row.PropertyName}</td>
                        <td className="p-3">{row.Description}</td>
                        <td className="p-3">{row.Province}</td>
                        <td className="p-3">{row.District}</td>
                        <td className="p-3">{row.CurrentBid}</td>
                        <td className="p-3">{row.StartTime}</td>
                        <td className="p-3">{row.EndTime}</td>
                        <td className="p-3 overflow-hidden whitespace-nowrap overflow-ellipsis">
                          <div className="w-10">{row.ImageLink}</div>
                        </td>

                        <td className="p-3 flex justify-evenly">
                          <button
                            className=" text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditProperty(row.PropertyID)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteProperty(row.PropertyID)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isEditPropertyFormVisible && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50  flex items-center justify-center ">
                  <div className='w-10/10'>
                  <div className="bg-white p-6 rounded-lg ">
                    <h1 className="text-2xl font-bold mb-4">แก้ไข</h1>
                    <form>
                      <div className="mb-4">
                        <label htmlFor="propertyName" className="block text-sm font-medium text-gray-600">
                          Property Name
                        </label>
                        <input
                          type="text"
                          id="propertyName"
                          name="propertyName"
                          value={editedProperty.PropertyName}
                          onChange={(e) => setEditedProperty({ ...editedProperty, PropertyName: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={editedProperty.Description}
                          onChange={(e) => setEditedProperty({ ...editedProperty, Description: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="province" className="block text-sm font-medium text-gray-600">
                          Province
                        </label>
                        <input
                          type="text"
                          id="province"
                          name="province"
                          value={editedProperty.Province}
                          onChange={(e) => setEditedProperty({ ...editedProperty, Province: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="district" className="block text-sm font-medium text-gray-600">
                          District
                        </label>
                        <input
                          type="text"
                          id="district"
                          name="district"
                          value={editedProperty.District}
                          onChange={(e) => setEditedProperty({ ...editedProperty, District: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="currentBid" className="block text-sm font-medium text-gray-600">
                          Current Bid
                        </label>
                        <input
                          type="text"
                          id="currentBid"
                          name="currentBid"
                          value={editedProperty.CurrentBid}
                          onChange={(e) => setEditedProperty({ ...editedProperty, CurrentBid: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-600">
                          Start Time
                        </label>
                        <input
                          type="datetime-local"
                          id="startTime"
                          name="startTime"
                          value={editedProperty.StartTime}
                          onChange={(e) => setEditedProperty({ ...editedProperty, StartTime: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-600">
                          End Time
                        </label>
                        <input
                          type="datetime-local"
                          id="endTime"
                          name="endTime"
                          value={editedProperty.EndTime}
                          onChange={(e) => setEditedProperty({ ...editedProperty, EndTime: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="imageLink" className="block text-sm font-medium text-gray-600">
                          Image Link
                        </label>
                        <input
                          type="text"
                          id="imageLink"
                          name="imageLink"
                          value={editedProperty.ImageLink}
                          onChange={(e) => setEditedProperty({ ...editedProperty, ImageLink: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      {/* Add similar fields for the remaining columns */}
                      {/* ... */}
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
                          onClick={handleCancelUpdateProperty}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleUpdateProperty}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                </div>
              )}



            </>
          )}

          {showUsers && (
            // Display users data here
            <>
              <h1 className="text-2xl font-bold text-center mb-6">จัดการข้อมูล User</h1>
              <div className="overflow-x-auto">
                <table
                  key={showBids || showUsers || showProperties}
                  ref={tableRef}
                  className="table-auto w-full border border-collapse border-black/10"
                >
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3">User ID</th>
                      <th className="p-3">Username</th>
                      <th className="p-3">Password</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Permission</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataU.map(row => (
                      <tr key={row.UserID}>
                        <td className="p-3">{row.UserID}</td>
                        <td className="p-3">{row.Username}</td>
                        <td className="p-3">{row.Password}</td>
                        <td className="p-3">{row.Email}</td>
                        <td className="p-3">{row.permission}</td>
                        <td className="p-3 flex justify-evenly">
                          <button
                            className=" text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditUser(row.UserID)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteUser(row.UserID)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isEditUserFormVisible && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Edit User</h1>
                    <form>
                      <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={editedUser.Username}
                          onChange={(e) => setEditedUser({ ...editedUser, Username: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={editedUser.Password}
                          onChange={(e) => setEditedUser({ ...editedUser, Password: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editedUser.Email}
                          onChange={(e) => setEditedUser({ ...editedUser, Email: e.target.value })}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                      <div className="flex justify-evenly">
                        <div>
                          <button
                          type="button"

                          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none" onClick={handleCancelUpdate}
                        >
                          Cancel
                        </button>
                        <button
                          type="button" onClick={handleUpdateUser} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                          Update
                        </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}


          <div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
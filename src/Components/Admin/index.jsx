import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataHomeB } from '../Api/ApiHomeB';
import { FaEdit, FaTrash, FaUsersCog, FaHome } from 'react-icons/fa';
import { RiAuctionFill } from 'react-icons/ri';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net';

const Admin = () => {
  const [data, setData] = useState([]);
  const tableRef = useRef();
  const [showBids, setShowBids] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  

  const initializeDataTable = useCallback(() => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }
    $(tableRef.current).DataTable();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DataHomeB();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      initializeDataTable();
    }
  }, [data, initializeDataTable]);

  const handleEdit = (bidID) => {
    toast.success(`Editing bid with ID ${bidID}`);
  };

  const handleDelete = (bidID) => {
    toast.error(`Deleting bid with ID ${bidID}`);
  };

  useEffect(() => {
    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [showBids, showProperties, showUsers]);
  useEffect(() => {
    if (showBids) {
      if (tableRef.current) {
        $(tableRef.current).DataTable();
      }
    }
  }, [showBids]);

  return (
    
    <div className="min-h-screen w-screen overflow-y-auto bg-purple-100/80 flex justify-center pb-5 pt-5">
      
      <div className="w-10/12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className='flex justify-evenly items-center h-32'>
            <button
              className='h-28 border border-black p-2 rounded-md bg-white hover:bg-gray-200 focus:outline-none'
              onClick={() => { setShowBids(true); setShowProperties(false); setShowUsers(false); }}
            >
              <RiAuctionFill className=' size-16 w-full' /> Bids Data Management
            </button>
            <button
              className='h-28 border border-black p-2 rounded-md bg-white hover:bg-gray-200 focus:outline-none'
              onClick={() => { setShowBids(false); setShowProperties(true); setShowUsers(false); }}
            >
              <FaHome className=' size-16 w-full' /> Properties Data Management
            </button>
            <button
              className='h-28 border border-black p-2 rounded-md bg-white hover:bg-gray-200 focus:outline-none'
              onClick={() => { setShowBids(false); setShowProperties(false); setShowUsers(true); }}
            >
              <FaUsersCog className=' size-16 w-full' /> Users Data Management
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
                    {data.map(row => (
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
            </>
          )}

          {showUsers && (
            // Display users data here
            <>
            </>
          )}

          <div>
          <ToastContainer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
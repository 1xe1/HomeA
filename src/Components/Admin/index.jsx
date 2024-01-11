import React, { useState, useEffect, useRef } from 'react';
import { DataHomeB } from '../Api/ApiHomeB';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';

const Admin = () => {
  const [data, setData] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const result = await DataHomeB();
        setData(result);

        // Initialize DataTable after data is loaded
        $(tableRef.current).DataTable();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    
    
    <div className="min-h-screen w-screen overflow-y-auto">
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Bid Data Management</h1>

        {/* Render the table */}
        <table ref={tableRef} className="table-auto w-full">
          <thead>
            <tr>
              <th>Bid ID</th>
              <th>Property ID</th>
              <th>User ID</th>
              <th>Bid Amount</th>
              <th>Bid Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.BidID}>
                <td>{row.BidID}</td>
                <td>{row.PropertyID}</td>
                <td>{row.UserID}</td>
                <td>{row.BidAmount}</td>
                <td>{row.BidTime}</td>
                <td>
                  <button className="mr-2 text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

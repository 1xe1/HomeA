import React from 'react';
import { Link } from 'react-router-dom';

// Import your logo image
import logoImage from '../../assets/bg.png';

const Navbar = () => {
  return (
    <nav className="bg-purple-500/20 p-10">
      <div className="container mx-auto flex justify-center items-center">
        <div className="space-x-60 flex items-center"> {/* Center the content horizontally */}
          <Link
            to="/Main"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/PersonalUser"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Personal User
          </Link>
          <Link to="">
            <img
              src={logoImage}
              alt="logo"
              className="w-auto h-20 rounded-lg"
            />
          </Link>
          <Link
            to="/Admin"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Admin
          </Link>

          <Link
            to="/Login"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Login
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Import your logo image
import logoImage from '../../assets/bg.png';

const Navbar = ({ loggedIn, onLogout, username }) => {
  const location = useLocation();

  const isAdminPage = location.pathname === '/Admin';
  const isMainPage = location.pathname === '/Main';

  const handleLogout = () => {
    if (isAdminPage || isMainPage) {
      // Add condition for other pages if needed
      window.location.href = '/login';
    } else {
      onLogout();
    }
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="bg-purple-500/20 p-5">
      <div className="container mx-auto flex justify-center items-center">
        <div className="space-x-60 flex items-center ">
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
          <Link to="Main">
            <img
              src={logoImage}
              alt="logo"
              className="w-auto h-20 rounded-lg"
            />
          </Link>
          {loggedIn ? (
            <>
              {/* Add more links as needed */}
              <Link
                to="/Admin"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Admin
              </Link>
              <div className="relative" onMouseLeave={closeDropdown}>
                <div
                  onMouseEnter={toggleDropdown}
                  className="text-white cursor-pointer hover:text-gray-300 transition duration-300"
                >

                  {username}
                </div>

                {dropdownVisible && (
                  <div className="absolute top-full left-0 mt-2 bg-white p-2 rounded shadow">
                    <div
                      onClick={handleLogout}
                      className="cursor-pointer hover:text-gray-600 transition duration-300"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import PersernalUser from './Components/PersernalUser';
import Admin from './Components/Admin';
import CheckLogin from './Components/Login';
import ShowHome from './Components/ShowHome';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './assets/bg.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (user) => {
    try {
      // Your login logic here

      // Assuming successful login, set the user
      setUsername(user);
      setLoggedIn(true);

      navigate("/Main");
    } catch (error) {
      console.error("Error during login:", error);
      // setLoginError("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    // Add logic for handling logout, e.g., clearing the user session
    setLoggedIn(false);
    setUsername("");

    // Redirect to the login page after logout
  };

  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={appStyle}>
      <ToastContainer />
      <Navbar loggedIn={loggedIn} username={username} onLogout={handleLogout} />
      <Routes>
        {/* Use a route for the login page */}
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/Main" />
            ) : (
              <CheckLogin onLogin={handleLogin} loginError={loginError} />
            )
          }
        ></Route>
        <Route
          path="/Main"
          element={
            loggedIn ? <Main username={username} /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/Main"
          element={loggedIn ? <Main /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Admin"
          element={loggedIn ? <Admin /> : <Navigate to="/Login" />}
        />
        <Route
          path="/PersonalUser"
          element={loggedIn ? <PersernalUser /> : <Navigate to="/Login" />}
        />
        <Route
          path="/ShowHome/:propertyID"
          element={loggedIn ? <ShowHome /> : <Navigate to="/Login" />}
        />
        <Route path="/Login" element={<CheckLogin setLoggedIn={setLoggedIn} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import PersernalUser from './Components/PersernalUser';
import Admin from './Components/Admin';
import Login from './Components/Login';

// Import your background image
import backgroundImage from './assets/bg.png';

function App() {
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={appStyle}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/PersernalUser" element={<PersernalUser />} />
      </Routes>
    </div>
  );
}

export default App;

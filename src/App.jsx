import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import PersernalUser from './Components/PersernalUser';
import Admin from './Components/Admin';
import Login from './Components/Login';
import ShowHome from './Components/ShowHome'
import Footer from './Components/Footer';

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
        <Route path="/PersonalUser" element={<PersernalUser />} />
        <Route path="/ShowHome/:propertyID" component={ShowHome} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

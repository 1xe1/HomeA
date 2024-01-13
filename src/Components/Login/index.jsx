import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './index.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(
        "http://localhost:8081/HomeA/apiLogin/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData).toString(),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        const { Username, Email, Permission } = data;
  
        // Assuming successful login, set the user
        if (typeof onLogin === "function") {
          // Assuming successful login, set the user
          onLogin(formData.email);
        }
  
        // Save user data in localStorage for later reference
        localStorage.setItem("username", Username);
        localStorage.setItem("email", Email);
        localStorage.setItem("permission", Permission);
  
        // Display a welcome notification with Username
        toast.success(`Welcome, ${Username}!`);
  
        // Check if the user is admin before navigating to the dashboard
        if (Permission === 1) {
          navigate("/admin"); // Assuming an admin route
        } else {
          // Redirect to the user dashboard
          navigate("/main");
        }
      } else {
        // Handle login error
        toast.error("Please check your password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  const handleRegister = () => {
    // Implement your registration logic or navigation to the registration page
  };

  
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="">Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <label>
                <a href="#">Forgot password?</a>
              </label>
            </div>
  <button type="submit">Log in</button>
            <div className="register">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={handleRegister}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

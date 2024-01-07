import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataHomeU } from '../Api/ApiHomeU';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      // Assuming the API requires email and password for authentication
      const userData = await DataHomeU(email, password);

      // Assuming the API returns a success flag or user data on successful login
      if (userData.success) {
        console.log("Login successful");
        setError("");

        // Navigate to the main page
        navigate('/main'); // Replace '/main' with the actual route to your main page
      } else {
        console.log("Login failed");
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Error during login");
    }
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Log in</button>
            <div className="register">
              <p>
                Don't have an account? <a href="#">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

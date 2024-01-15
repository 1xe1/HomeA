import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onLogin, loginError }) => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8081/HomeA/apiCheckLogin/",
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
        const { Username } = data; 

        // Assuming successful login, set the user
        onLogin(formData.Email);

        // Display a welcome notification with FirstName and LastName
        toast.success(`Welcome, ${Username}!`);

        // Redirect to the dashboard
        navigate("/Main");
      } else {
        // Handle login error
        toast.error("Please check your Password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = () => {
    // Add your registration logic here
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="Email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="Password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="text-sm text-gray-600 hover:underline focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
            >
              Register
            </button>
          </div>
        </form>
        {loginError && <p className="mt-4 text-red-500">{loginError}</p>}
      </div>
    </div>
  );
};

export default Login;
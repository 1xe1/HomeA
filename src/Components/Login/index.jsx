import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:8081/HomeA/apiLogin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Update content type to JSON
        },
        body: JSON.stringify(formData), // Stringify the body to JSON
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        const { FirstName, LastName } = data; // Assuming the server returns these fields

        // Assuming successful login, set the user
        onLogin(formData.email);

        // Display a welcome notification with FirstName and LastName
        toast.success(`Welcome, ${FirstName} ${LastName}!`);

        // Redirect to the dashboard
        navigate("/sale");
      } else {
        // Handle server errors or invalid credentials
        const errorData = await response.json(); // Parse error response

        // Check if the response contains an error message
        const errorMessage =
          errorData && errorData.message
            ? errorData.message
            : "Please check your credentials.";

        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);

      // Handle network errors or unexpected issues
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const handleRegister = () => {
    // Add your registration logic here
    navigate("/register");
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

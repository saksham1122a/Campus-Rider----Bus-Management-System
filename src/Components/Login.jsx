import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Stylesheets/Auth.css";
import SuccessPopup from "./SuccessPopup";
import { useAuth } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // Use AuthContext to handle login with user data
        handleLogin(data.token, data.user || data);

        setShowSuccessPopup(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">

          <div className="auth-left">
            <div className="auth-header">
              <h2>WELCOME BACK!</h2>
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button type="submit" className="auth-btn">
                Sign In
              </button>
            </form>
          </div>

          <div className="auth-right">
            <div className="image-placeholder">
              <img src="/src/assets/bus.png" alt="Campus Bus" />
            </div>
          </div>

        </div>
      </div>

      <SuccessPopup 
        message="Login successful! Welcome back to Campus Rider."
        isVisible={showSuccessPopup}
        onClose={handlePopupClose}
      />
    </>
  );
};

export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Stylesheets/Auth.css";
import SuccessPopup from "./SuccessPopup";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    busNumber: ""
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
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
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
    navigate("/login");
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">

          <div className="auth-left">
            <div className="auth-header">
              <h2>CREATE ACCOUNT</h2>
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password"
                  name="password"
                  placeholder="Create password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Bus Number</label>
                <input 
                  type="text"
                  name="busNumber"
                  placeholder="BUS-001"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="auth-btn">
                Sign Up
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
        message="Your account has been created successfully! You can now login with your credentials."
        isVisible={showSuccessPopup}
        onClose={handlePopupClose}
      />
    </>
  );
};

export default Signup;
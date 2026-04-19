import React from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/Auth.css";
const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <h2>CREATE ACCOUNT</h2>
          <p>Already have an account? <Link to="/login">Login</Link></p>

          <form>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />

            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" />

            <label>Password</label>
            <input type="password" placeholder="••••••••" />

            <button className="auth-btn">Sign Up</button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <div className="image-placeholder">
            <img src="/src/assets/bus.png" alt="Campus Bus" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
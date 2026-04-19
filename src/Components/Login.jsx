import React from "react";
import "../Stylesheets/Auth.css";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <h2>WELCOME BACK!</h2>
          <p>Don't have an account? <span>Sign up</span></p>

          <form>
            <label>Username</label>
            <input type="email" placeholder="example@gmail.com" />

            <label>Password</label>
            <input type="password" placeholder="••••••••" />

            <div className="auth-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <span className="link">Forgot password?</span>
            </div>

            <button className="auth-btn">Sign In</button>
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

export default Login;
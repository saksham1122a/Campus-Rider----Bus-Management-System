import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../App";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #021B2B, #0A3A4A, #0F5C6E)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(79, 195, 247, 0.3)',
          borderTop: '3px solid #4FC3F7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If not authenticated -> redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated -> allow access
  return children;
};

export default ProtectedRoute;
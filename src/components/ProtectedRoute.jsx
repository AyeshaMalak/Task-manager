// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();

  // Jab tak authentication check ho raha hai
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Agar login nahi hai, redirect to /login
  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Agar login hai, actual page dikhao
  return children;
};

export default ProtectedRoute;

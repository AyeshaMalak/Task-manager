// src/pages/Signup.jsx
import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
import { Navigate, Link } from 'react-router-dom';

const Signup = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      setErrorMessage('');

      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        console.error('Signup error:', error.message);
        setErrorMessage(error.message);
        setIsSigningUp(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password (6 characters minimum)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            disabled={isSigningUp}
          >
            {isSigningUp ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

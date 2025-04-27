
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');

      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error('Login error:', error.message);
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');

      try {
        await doSignInWithGoogle();
      } catch (error) {
        console.error('Google Sign-in error:', error.message);
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full overflow-hidden">
        
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-purple-300 text-white py-3 rounded-md font-semibold hover:bg-purple-600 transition duration-300"
              disabled={isSigningIn}
            >
              {isSigningIn ? 'Signing in...' : 'Login'}
            </button>
          </form>

          {/* <button
            onClick={onGoogleSignIn}
            className="w-full mt-4 bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition duration-300"
            disabled={isSigningIn}
          >
            {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
          </button> */}

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

     
        <div className="hidden md:block md:w-1/2">
          <img
            src="img1.gif"
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;

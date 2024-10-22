import React, { useState } from 'react';
import loginImage from '../../Images/signup.jpg'; // Ensure the image path is correct
import { FaGoogle } from 'react-icons/fa'; // Importing Google Icon
import axios from 'axios'; // Axios for API calls
import { useNavigate, Link } from 'react-router-dom'; // For navigation after login and linking to signup
import { toast, ToastContainer } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to manage button state
  const navigate = useNavigate(); // For navigation
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/users/auth/google';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password }, {
        withCredentials: true, // To include cookies in the request
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Login successful');
        // Optionally store token or any user info in localStorage or cookies
        // localStorage.setItem('token', response.data.token);
        
        // Redirect user to the dashboard or home page
        navigate('/');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-screen h-screen justify-center bg-gray-100 no-scrollbar">
      <ToastContainer /> {/* Toast notifications */}
      {/* Right Section - Form */}
      <div className="w-1/2  flex items-center justify-center overflow-y-auto"
       style={{ height: '93%' }}>
        <div className="max-w-lg w-full p-4">
          <div className="mb-6 text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-lg text-gray-600">Log in to continue exploring AI agents</p>
          </div>

          {/* Continue with Google button */}
          <div>
            <button     onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-semibold flex justify-center items-center space-x-2 transition duration-300 shadow-sm">
              <FaGoogle className="text-red-500" />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* OR separator */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-400 text-gray-900 shadow-sm"
                type="email"
                placeholder="you@example.com"
                style={{ textIndent: '5px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-400 text-gray-900 shadow-sm"
                type="password"
                placeholder="••••••••"
                style={{ textIndent: '5px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
            </div>

            {/* Login Button */}
            <div className="mt-6">
              <button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-bold transition duration-300 shadow-lg"
                type="submit"
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          {/* New User Sign Up Section */}
          <div className="mt-6 text-center">
            
            <Link
              to="/signup"
              className="text-pink-500 hover:underline font-bold"
            >
              New User ?      Sign Up.
            </Link>
          </div>
        </div>
      </div>

      {/* Left Section - Image */}
      <div className="w-1/2 flex items-center justify-center h-full">
        <img
          src={loginImage}
          className=" object-contain mb-16"
          style={{ height: '90%' }} // Ensure the image does not exceed 90% of the height
          alt="Login Illustration"
        />
      </div>
    </div>
  );
};

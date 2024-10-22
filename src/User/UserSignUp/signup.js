import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import signupimage from '../../Images/signup.jpg'; // Ensure the image path is correct
import { FaGoogle } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export const Signup = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Show a loading message
      toast.info('Signing up...');

      // Make a POST request to the backend
      const response = await axios.post('http://localhost:5000/api/users/signup', formData,
        {
          withCredentials: true, // Enable credentials
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 201) {
        toast.dismiss();
        toast.success('Signup successful!'); // Show success message
      } else {
        toast.dismiss();
        toast.error(response.data.message || 'Signup failed!'); // Show error message
      }
    } catch (error) {
      toast.dismiss();
      console.error('Signup error:', error);
      toast.error('Error occurred during signup!');
    }
  };

  return (
    <div className="flex max-w-screen h-screen justify-center bg-gray-100 no-scrollbar">
      {/* Left Section - Image */}
      <div className="w-1/2 flex items-center justify-center h-full">
        <img
          src={signupimage}
          className="object-contain mb-16"
          style={{ height: '90%' }} 
          alt="Signup Illustration"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 flex items-center justify-center overflow-y-auto" style={{ height: '93%' }}>
        <div className="max-w-lg w-full p-4">
          <div className="mb-6 text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Namasté</h1>
            <p className="text-lg text-gray-600">Create your account to explore AI agents</p>
            
          </div>
          

          {/* Continue with Google button */}
          <div>
            <button className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-semibold flex justify-center items-center space-x-2 transition duration-300 shadow-sm">
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
            {/* First Name and Last Name in one row */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-400 text-gray-900 shadow-sm"
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{ textIndent: '5px' }}
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-400 text-gray-900 shadow-sm"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{ textIndent: '5px' }}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className='flex space-x-4'>

            
            <div className='w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-400 text-gray-900 shadow-sm"
                type="email"
                name="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleChange}
                
                style={{ textIndent: '5px' }}
                
                required
              />
            </div>

            {/* Phone Number */}
            <div className='w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-400 text-gray-900 shadow-sm"
                type="tel"
                name="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleChange}
                style={{ textIndent: '5px' }}
                required
              />
            </div>
</div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-gray-400 text-gray-900 shadow-sm"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={{ textIndent: '5px' }}
                required
              />
            </div>

            {/* Register Button with margin */}
            <div className="mt-6">
              <button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-bold transition duration-300 shadow-lg"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="mt-6 text-center">
            
            <Link
              to="/login"
              className="text-pink-500 hover:underline font-bold"
            >
              Already have an account?
            </Link>
          </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

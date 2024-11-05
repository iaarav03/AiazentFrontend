import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../../Images/login.jpg.jpg';

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    isAdmin: false, // Optional field for admin registration
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.info('Signing up...');
      const response = await axios.post('http://localhost:5000/api/users/signup', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        toast.success('Signup successful!');
        const user = response.data.user;
        if (user.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error(response.data.message || 'Signup failed!');
      }
    } catch (error) {
      toast.error('Error occurred during signup!');
    }
  };

  return (
    <div
      className=" bg-center h-screen overflow-y-auto"
      style={{
        backgroundImage: `url(${login})`,
        transform: 'scaleX(-1)',
      }}
    >
      <div
        className="flex transform scale-x-[-1] "
      >
     
        <div className="w-1/2 flex  items-center justify-center bg-opacity-55 max-h-screen mt-24 no-scollbar">
          <div className="w-full max-w-md px-8 py-10">
            <h1 className="text-4xl font-bold text-[rgb(73,125,168)] mb-4">Create Your Account</h1>
            <p className="text-lg text-gray-600 mb-6">Join us and explore AI agents.</p>

            {/* Google Signup Button */}
            <button
              className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-semibold flex justify-center items-center space-x-2 transition duration-300 shadow-sm mb-4"
            >
              <FaGoogle className="text-red-500" />
              <span>Continue with Google</span>
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="border-b w-1/4"></div>
              <span className="mx-4 text-gray-400">OR</span>
              <div className="border-b w-1/4"></div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(73,125,168)] outline-none"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(73,125,168)] outline-none"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(73,125,168)] outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(73,125,168)] outline-none"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(73,125,168)] outline-none"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="isAdmin"
                  id="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">Register as Admin</label>
              </div>

              <button
                className="w-full bg-[rgb(73,125,168)] text-white py-3 rounded-lg font-bold transition duration-300 shadow-lg"
                type="submit"
              >
                Sign Up
              </button>
            </form>

            {/* Already have an account */}
            <div className="mt-6 text-center">
              <Link to="/login" className="text-[rgb(73,125,168)] hover:underline">
                Already have an account? Log in.
              </Link>
            </div>
          </div>
        </div>

        {/* Right side welcome message */}
        <div className="w-1/2 relative  flex items-center justify-center">
          <div className="relative z-10 text-center text-primaryBlue2 px-8 mb-40">
            <h1 className="text-5xl font-bold mb-4">Welcome to AiAzent!</h1>
            <p className="text-lg max-w-md">
              Discover the power of AI with us. Sign up to explore and create AI agents
              that help solve real-world challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

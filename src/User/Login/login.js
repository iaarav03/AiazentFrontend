import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../../Images/login.jpg.jpg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/users/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.status === 200) {
        const user = response.data.user;
        toast.success('Login successful');
        if (user.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
   
      {/* Left side with background image and welcome text */}
      <div
        className="w-1/2 flex flex-col items-center justify-center text-center p-8 text-primaryBlue2"
        style={{
          backgroundImage: `url(${login})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg max-w-md">
          We’re glad to see you again! Log in to manage AI agents, explore new updates, 
          and make the most out of your experience with us.
        </p>
      </div>

      {/* Right side with login form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
  <div className="w-full max-w-md px-8 py-10">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
    <p className="text-sm text-gray-500 mb-6">
      Welcome back! Please login to your account.
    </p>

    <button
      onClick={handleGoogleLogin}
      className="w-full bg-[rgb(73,125,168)] text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[rgb(60,105,140)] transition duration-200 mb-4"
    >
      <FaGoogle />
      <span>Continue with Google</span>
    </button>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-600">User Name</label>
        <input
          type="email"
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(73,125,168)] outline-none"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Password</label>
        <input
          type="password"
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(73,125,168)] outline-none"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center text-gray-600">
          <input type="checkbox" className="mr-2" />
          Remember Me
        </label>
        <Link to="/forgot-password" className="text-sm text-[rgb(73,125,168)] hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className={`w-full mt-6 bg-[rgb(73,125,168)] text-white py-3 rounded-lg font-semibold hover:bg-[rgb(60,105,140)] transition duration-200 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>

    <div className="mt-6 text-center">
      <span className="text-gray-600">New User? </span>
      <Link to="/signup" className="text-[rgb(73,125,168)] hover:underline">
        Signup
      </Link>
    </div>
  </div>
</div>

    </div>
  );
};

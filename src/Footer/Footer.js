import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Ensure only one ToastContainer is used in App.jsx
import 'react-toastify/dist/ReactToastify.css';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/newsletter/subscribe', { email });
      toast.success(response.data.message || 'Subscribed successfully!');
      setEmail(''); // Clear the input field after successful subscription
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Subscription failed. Please try again.';
      toast.error(errorMessage);
      console.error('Subscription error:', error);
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Newsletter Subscription */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold">Stay Updated</h2>
            <p className="mt-2 text-gray-400">Join our newsletter for the latest updates and offers.</p>
            <form onSubmit={handleSubscription} className="flex mt-5 w-full max-w-md">
            <div className="flex items-center justify-center px-3 bg-primaryBlue2">
              <FaEnvelope size={20} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primaryBlue2"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primaryBlue2 text-white font-medium hover:bg-blue-600 transition duration-300"
            >
              Subscribe
            </button>
          </form>
          </div>
          
        </div>

        {/* Footer Links */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Our Story
                </a>
              </li>
              
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
             
              {/* <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Pricing
                </a>
              </li> */}
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                 Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">1234 Street Name, City, State 56789</li>
              <li className="text-gray-400">Email: info@somecompany.com</li>
              <li className="text-gray-400">Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-12 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaGithub size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FaDribbble size={24} />
          </a>
        </div>

        {/* Footer Note */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} AiAzent, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

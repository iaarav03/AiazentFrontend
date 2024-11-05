// src/Components/Navbar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white fixed w-full top-0 z-50 shadow-lg">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-6 py-4 mx-auto">
          {/* Website Name */}
          <Link
            to="/"
            className="text-4xl font-extrabold bg-clip-text text-transparent bg-primaryBlue2 tracking-wide hover:scale-105 transition-transform duration-300 flex items-center"
          >
            <FaRobot className="mr-2" />
            AiAzent
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/allagent"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              Category
            </Link>
            <Link
              to="/agentform"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              New Agents
            </Link>
            <Link
              to="/map"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              Tree Map
            </Link>
            <Link
              to="/blogs"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Sign-In Button */}
          <Link
            to="/login"
            className="hidden lg:inline-block bg-primaryBlue2 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Sign In
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="lg:hidden text-gray-500 focus:outline-none p-2"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              // Close Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden" id="mobile-menu">
            <ul className="flex flex-col p-4 space-y-4 bg-white shadow-md">
              <li>
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allagent"
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  to="/agentform"
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
                >
                  New Agents
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
                >
                  Tree Map
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="bg-primaryBlue2 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-center"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Padding to prevent content from being hidden behind the navbar */}
      <div className="mt-16"></div>
    </>
  );
};

export default Navbar;

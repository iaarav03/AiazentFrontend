import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white fixed w-full top-0 z-50 shadow-lg">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-6 py-4 mx-auto">
          {/* Website Name */}
          <Link
            to="/"
            className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-blue-500 tracking-wide hover:scale-105 transition-transform duration-300"
          >
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
              to="#"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              Features
            </Link>
            <Link
              to="#"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              Team
            </Link>
            <Link
              to="#"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Sign-In Button */}
          <Link
            to="/login"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Sign In
          </Link>

          {/* Mobile Menu Button */}
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="lg:hidden text-gray-500 focus:outline-none p-2"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden" id="mobile-menu">
          <ul className="flex flex-col p-4 space-y-4 bg-gray-50 shadow-md">
            <li>
              <Link
                to="/"
                className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allagent"
                className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                to="/agentform"
                className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
              >
                New Agents
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block text-lg font-medium text-gray-700 hover:text-blue-600 hover:underline transition duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Padding to prevent content from being hidden behind the navbar */}
      <div className="mt-16"></div>
    </>
  );
};

export default Navbar;

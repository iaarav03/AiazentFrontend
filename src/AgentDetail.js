import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the agent ID from the URL
import axios from 'axios';
import { motion } from 'framer-motion'; // Framer motion for animation
import { Link } from 'react-router-dom';
import { FaRegThumbsUp, FaShareAlt, FaDollarSign, FaIndustry, FaKey, FaStar } from 'react-icons/fa'; // Icons
import { Tooltip } from 'react-tooltip'; // Tooltip for icons

export const AgentDetail = () => {
  const { id } = useParams(); // Extract the agent ID from the URL
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/agents/${id}`); // API call to get agent details
        setAgent(response.data);
      } catch (error) {
        console.error('Error fetching agent details:', error);
      }
    };
    fetchAgent();
  }, [id]);

  // Set default values if not provided in the data
  if (!agent) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      {/* Top Section - Main Agent Info */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Section - Logo and Basic Details */}
        <div className="flex items-center">
          <img
            src={agent.logo || 'https://via.placeholder.com/100'} // Default placeholder if no logo
            alt={agent.name}
            className="h-24 w-24 rounded-full object-cover shadow-lg"
          />
          <div className="ml-6">
            <h1 className="text-4xl font-bold text-primaryBlue">{agent.name || 'Unknown Agent'}</h1>
            <div className="mt-2 flex space-x-2">
              {/* Display Category and Industry */}
              <motion.span
                className="bg-gray-100 px-2 py-1 rounded text-sm text-primaryBlue hover:bg-blue-100 transition"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FaIndustry className="inline-block mr-1" /> {agent.category || 'Uncategorized'}
              </motion.span>
              <motion.span
                className="bg-gray-100 px-2 py-1 rounded text-sm text-primaryBlue hover:bg-blue-100 transition"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <FaKey className="inline-block mr-1" /> {agent.industry || 'Unknown Industry'}
              </motion.span>
            </div>
            <p className="text-gray-500 mt-1">
              Tried by: <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{agent.triedBy || 0}</motion.span>
            </p>
          </div>
        </div>

        {/* Right Section - Try Now and Share Button */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to={agent.websiteUrl}>
          <button className="bg-primaryBlue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-all">
            Try it now
          </button>
          </Link>
          <Tooltip content="Share this agent">
            <button className="text-primaryBlue border border-primaryBlue px-3 py-2 rounded-lg hover:bg-blue-100 transition">
              <FaShareAlt />
            </button>
          </Tooltip>
        </motion.div>
      </motion.div>

      {/* Secondary Section - Reviews, Votes, Integration, Price */}
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Review Ratings */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-700">
            <FaStar className="inline-block mr-1 text-yellow-500" /> Review Ratings
          </h3>
          <p>{agent.reviewRatings ? `${agent.reviewRatings}/5` : 'No reviews yet'}</p>
        </motion.div>

        {/* This Month Votes */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-700">This month votes</h3>
          <button className="bg-transparent text-primaryBlue border border-primaryBlue px-4 py-2 rounded-lg hover:bg-blue-100 transition-all">
            + Vote
          </button>
        </motion.div>

        {/* Integration Support */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-700">
            <FaKey className="inline-block mr-1 text-green-500" /> Integration Support
          </h3>
          <p>{agent.integrationSupport || 'None'}</p>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-700">
            <FaDollarSign className="inline-block mr-1 text-green-500" /> Price
          </h3>
          <p>{agent.price || 'Not available'}</p>
        </motion.div>
      </div>

      {/* Key Features and Use Cases */}
      <div className='max-w-4xl mx-auto bg-slate-50'>
        <div className="mt-10 ">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-primaryBlue">Key Features</h2>
          <ul className="list-disc ml-6 mt-2">
            {agent.keyFeatures && agent.keyFeatures.length > 0 ? (
              agent.keyFeatures.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))
            ) : (
              <li className="text-gray-500">No key features available.</li>
            )}
          </ul>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-primaryBlue">Use Cases</h2>
          <ul className="list-disc ml-6 mt-2">
            {agent.useCases && agent.useCases.length > 0 ? (
              agent.useCases.map((useCase, index) => (
                <li key={index} className="text-gray-700">{useCase}</li>
              ))
            ) : (
              <li className="text-gray-500">No use cases available.</li>
            )}
          </ul>
        </motion.div>
      </div>
       <div className="mt-10">
        <h2 className="text-2xl font-semibold text-primaryBlue">Pricing & Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p><strong>Access Model:</strong> {agent.accessModel || 'N/A'}</p>
            <p><strong>Pricing Model:</strong> {agent.pricingModel || 'N/A'}</p>
            <p><strong>Price:</strong> {agent.price || 'N/A'}</p>
            <p><strong>Individual Plan:</strong> {agent.individualPlan || 'Not available'}</p>
            <p><strong>Enterprise Plan:</strong> {agent.enterprisePlan || 'Not available'}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p><strong>Free Trial:</strong> {agent.freeTrial ? 'Yes' : 'No'}</p>
            <p><strong>Subscription Model:</strong> {agent.subscriptionModel || 'Not available'}</p>
            <p><strong>Refund Policy:</strong> {agent.refundPolicy || 'No refund policy'}</p>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="text-2xl font-semibold text-primaryBlue">Video Demo</h2>
        {agent.videoUrl ? (
          <div className="mt-4">
            <iframe
              width="560"
              height="315"
              src={agent.videoUrl}
              title="Video Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No video demo available.</p>
        )}
      </motion.div>

      {/* Bottom Section - Like and Hiring Status */}
      <motion.div
        className="mt-6 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <button className="bg-primaryBlue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-all flex items-center">
          <FaRegThumbsUp className="mr-2" /> Like
        </button>
        {agent.isHiring && (
          <div className="text-green-600 font-semibold flex items-center">
            <FaRegThumbsUp className="mr-2" /> We’re Hiring!
          </div>
        )}
      </motion.div>
      </div>
      

      {/* Pricing & Plans */}
     

      {/* Video Demo */}
    
    </div>
  );
};

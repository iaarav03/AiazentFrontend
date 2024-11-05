// src/Components/AgentDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaRegThumbsUp, 
  FaShareAlt, 
  FaDollarSign, 
  FaRegBookmark, 
  FaIndustry, 
  FaKey 
} from 'react-icons/fa';
import agent_bg from './Images/agent_bg.jpg';
import agent2_bg from './Images/agent3.jpg';


export const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [similarAgents, setSimilarAgents] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [saveCounts, setSaveCounts] = useState({});

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/agents/similar/${id}`);
        console.log(response.data);
        setAgent(response.data.agent);
        setSimilarAgents(response.data.bestMatches);
        const initialLikes = {};
        const initialSaves = {};
       
          initialLikes[response.data.agent._id] = response.data.agent.likes || 0;
          initialSaves[response.data.agent._id] = response.data.agent.savedByCount || 0;
        
        console.log(initialSaves);
        setLikeCounts(initialLikes);
        setSaveCounts(initialSaves);
      } catch (error) {
        console.error('Error fetching agent details:', error);
      }
    };
    fetchAgentDetails();
  }, [id]);

  const handleWishlist = async (event, agentId) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error('You need to log in to save agents!');
        return;
      }

  
      const url = `http://localhost:5000/api/users/wishlist/${agentId}`;
      const method = 'post';

      const response = await axios({
        method,
        url,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(`Agent Added to wishlist!`);
        setSaveCounts((prevSaveCounts) => ({
          ...prevSaveCounts,
          [agentId]: response.data.agent.savedByCount,
        }));
      }
      if (response.status === 201) {
        toast.success(`Agent Removed from wishlist!`);
       
        setSaveCounts((prevSaveCounts) => ({
          ...prevSaveCounts,
          [agentId]: response.data.agent.savedByCount,
        }));
      }
      
    } catch (error) {
      toast.error('An error occurred while updating the wishlist.');
      console.error('Error updating wishlist:', error);
    }
  };

  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-gray-50">
      <ToastContainer />
      
      {/* Banner Section */}
      <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden mb-6">
        <img
          src={agent_bg}
          alt={`${agent.name} Banner`}
          className="w-full h-full object-cover"
        />
        {/* Overlay Agent Info */}
        <div className="absolute bottom-0 left-0 p-4 md:p-6 bg-gradient-to-t from-black via-transparent to-transparent w-full">
          <div className="flex items-center">
            <img
              src={agent.logo || 'https://via.placeholder.com/100'}
              alt={agent.name}
              className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="ml-4 md:ml-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold">{agent.name || 'Unknown Agent'}</h1>
              <p className="text-md md:text-xl mt-2">{agent.shortDescription || 'No short description available.'}</p>
              <div className="mt-2 flex flex-wrap items-center space-x-2">
                <span className="flex items-center bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full text-sm md:text-base">
                  <FaIndustry className="mr-1" /> {agent.category || 'Uncategorized'}
                </span>
                <span className="flex items-center bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full text-sm md:text-base">
                  <FaKey className="mr-1" /> {agent.industry || 'Unknown Industry'}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <p className="text-gray-300">Tried by: {agent.triedBy || 0}</p>
                <button
                  className="flex items-center text-white bg-primaryBlue2 hover:bg-blue-700 transition-all ml-4 px-4 py-2 rounded-full shadow-md"
                  onClick={(event) => handleWishlist(event, agent._id)}
                  aria-label="Save Agent to Wishlist"
                >
                  <FaRegBookmark className="mr-2" size={20} />
                  <span className="text-lg">{saveCounts[agent._id] || 0}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex justify-end space-x-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link to={agent.websiteUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-primaryBlue2 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md">
            Try it now
          </button>
        </Link>
        <button className="text-primaryBlue2 border border-primaryBlue2 px-4 py-2 rounded-lg hover:bg-primaryBlue2 hover:text-white transition flex items-center">
          <FaShareAlt className="mr-2" />
          Share
        </button>
      </motion.div>

      {/* Main Content - Description, Key Features, and Use Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-primaryBlue2 mb-4">Description</h2>
          <p className="text-gray-800 mb-6">{agent.description || 'No detailed description available.'}</p>

          <h2 className="text-2xl font-semibold text-primaryBlue2 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-left space-y-2">
            {agent.keyFeatures?.length ? (
              agent.keyFeatures.map((feature, index) => (
                <li key={index} className="text-gray-800">{feature}</li>
              ))
            ) : (
              <li className="text-gray-500">No key features available.</li>
            )}
          </ul>

          <h2 className="text-2xl font-semibold text-primaryBlue2 mt-8 mb-4">Use Cases</h2>
          <ul className="list-disc list-inside text-left space-y-2">
            {agent.useCases?.length ? (
              agent.useCases.map((useCase, index) => (
                <li key={index} className="text-gray-800">{useCase}</li>
              ))
            ) : (
              <li className="text-gray-500">No use cases available.</li>
            )}
          </ul>
        </div>

        {/* Right Column - Similar Agents */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-primaryBlue2 mb-4">Similar Agents</h2>
          <div className="space-y-4">
            {similarAgents.length ? (
              similarAgents.map((similarAgent) => (
                <Link
                  to={`/agent/${similarAgent._id}`}
                  key={similarAgent._id}
                  className="flex items-center bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition-all"
                >
                  <img
                    src={similarAgent.logo || 'https://via.placeholder.com/50'}
                    alt={similarAgent.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-primaryBlue">{similarAgent.name}</h3>
                    <p className="text-gray-500 text-sm">{similarAgent.category}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No similar agents found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

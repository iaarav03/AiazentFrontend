import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTags } from 'react-icons/fa'; // Font Awesome for icons
import { AiOutlineLink } from 'react-icons/ai'; // Another icon for links
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Card = ({ propmodel, propprice, propcategory, propindustry }) => {
  const [agents, setAgents] = useState([]);

  // Fetch agents from the backend API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents/all'); // Update with your actual API URL
        setAgents(response.data || []); // Ensure data is an array, fallback to empty array
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  // Group agents by category
  const groupAgentsByCategory = () => {
    return agents.reduce((categories, agent) => {
      const category = agent.category || 'Uncategorized'; // Handle missing category

      if ((agent.category !== propcategory) && (propcategory !== 'Category') && (propcategory !== '')) return categories;
      if (!categories[category]) {
        categories[category] = [];
      }

      categories[category].push(agent);
      return categories;
    }, {});
  };

  const categorizedAgents = groupAgentsByCategory();

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { type: 'spring', stiffness: 300 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div className="max-w-6xl w-full mx-auto p-6 mt-10" initial="hidden" animate="visible" variants={containerVariants}>
      {Object.keys(categorizedAgents).map((category, categoryIndex) => (
        <motion.div key={categoryIndex} className="mb-12">
          {/* Category Header */}
          <motion.div
            className="mb-4 flex items-center space-x-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-400">
              Explore {category}
            </h1>
            <motion.div className="bg-gradient-to-r from-indigo-500 to-blue-400 h-1 w-20 animate-pulse"></motion.div>
          </motion.div>
          <motion.p
            className="text-gray-500 text-lg italic mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Discover top agents in the {category} space, crafted for your needs.
          </motion.p>

          {/* Divider */}
          <hr className="border-t bg-gray-300 my-4" />

          {/* Cards List (Scrollable Container for Agents) */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categorizedAgents[category].slice(0, 6).map((agent, agentIndex) => (

              ((propprice === '' || propprice === 'Pricing') || (agent.pricingModel === propprice)) &&
              ((propindustry === '' || propindustry === 'Industry') || (agent.industry === propindustry)) &&
              ((propmodel === '' || propmodel === 'Model') || (agent.accessModel === propmodel)) && (
                <Link to={`agent/${agent._id}`} key={agent._id}>
                  <motion.div
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    whileHover="hover"
                    whileTap="tap"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <motion.img
                          src={agent.logo || 'https://www.svgrepo.com/show/499962/music.svg'}
                          className="h-14 w-14 rounded-full object-cover border border-primaryBlue"
                          alt={agent.name}
                          initial={{ rotate: 0 }}
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg text-primaryBlue hover:text-gray-500 transition-colors duration-200">{agent.name}</h2>
                        <p className="text-sm text-gray-400 flex items-center space-x-1">
                          <AiOutlineLink /> <span>{agent.pricingModel}</span>
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600">
                      {agent.shortDescription || 'No description provided.'}
                    </p>

                    <motion.div className="flex flex-wrap gap-2 mt-4">
                      {agent.tags && agent.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          className="bg-primaryBlue2 text-white text-xs px-3 py-1 rounded-full shadow flex items-center space-x-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaTags /> <span>{tag}</span>
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </Link>
              )
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaRegBookmark } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const AgentCard = ({ agent, likeCount, saveCount, handleLike, handleWishlist, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Trigger when 20% of the card is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Link to={`/agent/${agent._id}`}>
        <div className="p-4 rounded-lg flex items-start group transition-all duration-300 agent-card">
          <div className="flex-shrink-0">
            <img
              src={agent.logo || 'https://via.placeholder.com/50'}
              alt={agent.name}
              className="h-14 w-14 rounded-full object-cover"
            />
          </div>
          <div className="ml-4 flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-primaryBlue group-hover:text-blue-900 transition-colors duration-300">
                {agent.name}
              </h3>
              <span className="text-sm text-gray-500">{agent.price}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{agent.shortDescription || 'No description available.'}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {agent.tags && agent.tags.length > 0 ? (
                agent.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">No tags available</span>
              )}
            </div>
            <div className="flex items-center mt-4">
              <button
                className="flex items-center text-primaryBlue hover:text-blue-900 transition-all"
                onClick={(event) => handleLike(event, agent._id)}
              >
                <FaThumbsUp className="mr-2" /> {likeCount}
              </button>
              <button
                className="flex items-center text-primaryBlue hover:text-blue-900 transition-all ml-4"
                onClick={(event) => handleWishlist(event, agent._id)}
              >
                <FaRegBookmark className="mr-2" /> {saveCount}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AgentCard;

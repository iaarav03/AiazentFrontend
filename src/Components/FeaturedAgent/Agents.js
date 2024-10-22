import React from 'react';
import { motion } from 'framer-motion';

// Text animation for the title
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

// Card animation with `whileInView` trigger
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};

export const Agents = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title with animation */}
        <motion.h2
          className="text-4xl font-bold text-primaryBlue text-center mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% is visible
          variants={textVariants}
        >
          Featured AI Agents
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% is visible
          variants={textVariants}
        >
          Discover our top picks for this week
        </motion.p>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* First Card */}
          <motion.div
            className="bg-primaryBlue text-white p-6 rounded-lg flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the card is visible
            variants={cardVariants}
            whileHover={{ scale: 1.05 }} // Subtle hover effect
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">CustomerFinderBot</h3>
              <p className="text-sm uppercase tracking-wider mb-4">Personal Assistant</p>
              <p className="text-lg mb-4">
                Discover your customers in seconds with social media AI.
              </p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-3xl font-bold">7.20%</p>
              <a
                href="#"
                className="bg-white text-primaryBlue rounded-full p-2 hover:bg-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Second Card */}
          <motion.div
            className="bg-gray-200 text-primaryBlue p-6 rounded-lg flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the card is visible
            variants={cardVariants}
            whileHover={{ scale: 1.05 }} // Subtle hover effect
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">SEObotAI</h3>
              <p className="text-sm uppercase tracking-wider mb-4">Digital Workers</p>
              <p className="text-lg mb-4">AI-powered SEO automation platform.</p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-3xl font-bold">14.20%</p>
              <a
                href="#"
                className="bg-primaryBlue text-white rounded-full p-2 hover:bg-blue-900 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Third Card */}
          <motion.div
            className="bg-white text-primaryBlue p-6 rounded-lg flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the card is visible
            variants={cardVariants}
            whileHover={{ scale: 1.05 }} // Subtle hover effect
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">FocusAI</h3>
              <p className="text-sm uppercase tracking-wider mb-4">Strategy</p>
              <p className="text-lg mb-4">Get focused life planning, roadmap or guide.</p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-3xl font-bold">11.20%</p>
              <a
                href="#"
                className="bg-primaryBlue text-white rounded-full p-2 hover:bg-blue-900 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Fourth Card */}
          <motion.div
            className="bg-blue-100 text-primaryBlue p-6 rounded-lg flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the card is visible
            variants={cardVariants}
            whileHover={{ scale: 1.05 }} // Subtle hover effect
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Fixed IncomeAI</h3>
              <p className="text-sm uppercase tracking-wider mb-4">Fixed Income</p>
              <p className="text-lg mb-4">Get multiple benefits, and lump sum options.</p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-3xl font-bold">8.20%</p>
              <a
                href="#"
                className="bg-primaryBlue text-white rounded-full p-2 hover:bg-blue-900 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

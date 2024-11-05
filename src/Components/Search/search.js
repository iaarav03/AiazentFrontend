// Search.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Search = ({ setModel, setPrice, setCategory, setIndustry, isCardSectionInView }) => {
  const [isSticky, setIsSticky] = useState(false);
  const filterRef = useRef(null);
  const placeholderRef = useRef(null);

  // Animation variants for filter elements
  const filterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (filterRef.current && placeholderRef.current) {
            const filterTop = placeholderRef.current.getBoundingClientRect().top;
            if (filterTop <= 70 && isCardSectionInView) {
              if (!isSticky) {
                setIsSticky(true);
                // Set the placeholder height to prevent layout shift
                placeholderRef.current.style.height = `${filterRef.current.offsetHeight}px`;
              }
            } else {
              if (isSticky) {
                setIsSticky(false);
                // Reset the placeholder height
                placeholderRef.current.style.height = '0px';
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCardSectionInView, isSticky]);

  return (
    <div className="">
      {/* Placeholder to maintain layout when fixed */}
      <div ref={placeholderRef}></div>
      <div
        ref={filterRef}
        className={`transition-all duration-300 w-full z-40 ${
          isSticky && isCardSectionInView
            ? "fixed top-[70px] left-0 right-0 shadow-lg "
            : "relative bg-white"
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <motion.div
            className="w-full"
            variants={filterVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center space-x-4 flex-wrap">
              {/* Access Model Select */}
              <motion.select
                onChange={(e) => setModel(e.target.value)}
                className="text-gray-900 bg-gray-100 text-sm border border-gray-300 rounded-lg px-10 py-3 focus:outline-none hover:shadow-md transition-shadow duration-300"
                whileHover="hover"
              >
                <option value="">Access Model</option>
                <option value="Open Source">Open Source</option>
                <option value="Closed Source">Closed Source</option>
                <option value="API">API</option>
              </motion.select>

              {/* Pricing Select */}
              <motion.select
                onChange={(e) => setPrice(e.target.value)}
                className="text-gray-900 bg-gray-100 text-sm border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:shadow-md transition-shadow duration-300"
                whileHover="hover"
              >
                <option value="">Pricing</option>
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </motion.select>

              {/* Category Select */}
              <motion.select
                onChange={(e) => setCategory(e.target.value)}
                className="text-gray-900 bg-gray-100 text-sm border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:shadow-md transition-shadow duration-300"
                whileHover="hover"
              >
                <option value="">Category</option>
                <option value="Personal Assistant">Personal Assistant</option>
                <option value="Productivity">Productivity</option>
                <option value="Content Creation">Content Creation</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Coding">Coding</option>
                <option value="Research">Research</option>
                <option value="Translation">Translation</option>
                <option value="Workflow">Workflow</option>
                <option value="Digital Workers">Digital Workers</option>
                <option value="AI Agents Builder">AI Agents Builder</option>
                <option value="Other">Other</option>
              </motion.select>

              {/* Industry Select */}
              <motion.select
                onChange={(e) => setIndustry(e.target.value)}
                className="text-gray-900 bg-gray-100 text-sm border border-gray-300 rounded-lg px-10 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:shadow-md transition-shadow duration-300"
                whileHover="hover"
              >
                <option value="">Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Marketing">Marketing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Legal">Legal</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Energy & Utilities">Energy & Utilities</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Travel & Hospitality">Travel & Hospitality</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Other">Other</option>
              </motion.select>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Search;

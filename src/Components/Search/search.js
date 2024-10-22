import React from "react";
import { motion } from "framer-motion";

// Animation variants for background elements
const bgVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 0.2, scale: 1, transition: { duration: 2 } },
};

const Search = ({ setModel, setPrice, setCategory, setIndustry }) => {
  return (
//     <div className="relative w-full flex flex-col items-center justify-center py-16 bg-gray-50 overflow-hidden">
//       {/* Subtle Background Elements for Visual Interest */}
//       <motion.div
//   className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 opacity-10 transform skew-x-6"
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 0.3 }}
//   transition={{ duration: 2 }}
// />
// <motion.div
//   className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-purple-300 to-indigo-400 opacity-10 transform -skew-x-6"
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 0.3 }}
//   transition={{ duration: 2, delay: 1 }}
// />


//       {/* Stylish Heading */}
//       <motion.h1
//         className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-6"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Discover Your Perfect AI Match
//       </motion.h1>

//       <motion.p
//         className="text-gray-700 text-lg mb-10"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1.5 }}
//       >
//         Filter by access model, pricing, category, or industry to find exactly what you need.
//       </motion.p>

//       {/* Filters Section */}
//       <motion.form
//         className="max-w-7xl mx-auto p-6 flex items-center space-x-4 flex-wrap justify-between"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 2 }}
//       >
//         {/* Filters Dropdown: Access Model */}
//         <select
//           id="accessModel"
//           onChange={(e) => setModel(e.target.value)}
//           className="text-gray-900 bg-gray-100 text-sm border border-gray-300 rounded-lg px-8 py-3 focus:outline-none hover:shadow-md transition-shadow duration-300"
//         >
//           <option value="">Access Model</option>
//           <option value="Open Source">Open Source</option>
//           <option value="Closed Source">Closed Source</option>
//           <option value="API">API</option>
//         </select>

//         {/* Filters Dropdown: Pricing Model */}
//         <select
//           id="pricingModel"
//           onChange={(e) => setPrice(e.target.value)}
//           className="text-gray-900 bg-gray-100 text-sm border border-gray-300 rounded-lg px-8 py-3 focus:outline-none hover:shadow-md transition-shadow duration-300"
//         >
//           <option value="">Pricing</option>
//           <option value="Free">Free</option>
//           <option value="Freemium">Freemium</option>
//           <option value="Paid">Paid</option>
//         </select>

//         {/* Filters Dropdown: Category */}
//         <select
//           id="category"
//           onChange={(e) => setCategory(e.target.value)}
//           className="text-gray-900 bg-gray-100 text-sm border border-gray-300 rounded-lg px-8 py-3 focus:outline-none hover:shadow-md transition-shadow duration-300"
//         >
//           <option value="">Category</option>
//           <option value="Personal Assistant">Personal Assistant</option>
//           <option value="Productivity">Productivity</option>
//           <option value="Content Creation">Content Creation</option>
//           <option value="Data Analysis">Data Analysis</option>
//           <option value="Customer Service">Customer Service</option>
//           <option value="Coding">Coding</option>
//           <option value="Research">Research</option>
//           <option value="Translation">Translation</option>
//           <option value="Workflow">Workflow</option>
//           <option value="Digital Workers">Digital Workers</option>
//           <option value="AI Agents Builder">AI Agents Builder</option>
//           <option value="Other">Other</option>
//         </select>

//         {/* Filters Dropdown: Industry */}
//         <select
//           id="industry"
//           onChange={(e) => setIndustry(e.target.value)}
//           className="text-gray-900 bg-gray-100 text-sm border border-gray-300 rounded-lg px-8 py-3 focus:outline-none hover:shadow-md transition-shadow duration-300"
//         >
//           <option value="">Industry</option>
//           <option value="Technology">Technology</option>
//           <option value="Finance">Finance</option>
//           <option value="Healthcare">Healthcare</option>
//           <option value="Education">Education</option>
//           <option value="E-commerce">E-commerce</option>
//           <option value="Marketing">Marketing</option>
//           <option value="Entertainment">Entertainment</option>
//           <option value="Manufacturing">Manufacturing</option>
//           <option value="Legal">Legal</option>
//           <option value="Human Resources">Human Resources</option>
//           <option value="Energy & Utilities">Energy & Utilities</option>
//           <option value="Real Estate">Real Estate</option>
//           <option value="Travel & Hospitality">Travel & Hospitality</option>
//           <option value="Agriculture">Agriculture</option>
//           <option value="Other">Other</option>
//         </select>
//       </motion.form>
//     </div>
<>
</>
  );
};

export default Search;

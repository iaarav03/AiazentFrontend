import React, { useState } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup, IoIosClose } from "react-icons/io";
import { FaFilter, FaUserAlt, FaIndustry, FaDollarSign, FaKey } from "react-icons/fa"; // Font Awesome Icons

export const Filter = ({ onFilterChange }) => {
  const [isCatgOpen, setIsCatgOpen] = useState(true);
  const [isIdstOpen, setIsIdstOpen] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(true);
  const [isPricesOpen, setIsPricesOpen] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Toggle for filter panel
  const [category, setCategory] = useState('Category');
  const [industry, setIndustry] = useState("Industry");
  const [pricingModel, setPricingModel] = useState("Pricing");
  const [accessModel, setAccessModel] = useState("Access");

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  // Reset functions for each filter
  const resetCategory = () => {
    setCategory('Category');
    onFilterChange({ category: 'Category', industry, pricingModel, accessModel });
  };
  const resetIndustry = () => {
    setIndustry('Industry');
    onFilterChange({ category, industry: 'Industry', pricingModel, accessModel });
  };
  const resetPricing = () => {
    setPricingModel('Pricing');
    onFilterChange({ category, industry, pricingModel: 'Pricing', accessModel });
  };
  const resetAccess = () => {
    setAccessModel('Access');
    onFilterChange({ category, industry, pricingModel, accessModel: 'Access' });
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    onFilterChange({ category: selectedCategory, industry, pricingModel, accessModel });
  };

  const handleIndustryChange = (selectedIndustry) => {
    setIndustry(selectedIndustry);
    onFilterChange({ category, industry: selectedIndustry, pricingModel, accessModel });
  };

  const handlePricingChange = (selectedPricing) => {
    setPricingModel(selectedPricing);
    onFilterChange({ category, industry, pricingModel: selectedPricing, accessModel });
  };

  const handleAccessChange = (selectedAccess) => {
    setAccessModel(selectedAccess);
    onFilterChange({ category, industry, pricingModel, accessModel: selectedAccess });
  };

  return (
    <div className="relative ">
      {/* Filter Toggle Icon */}
      <div
        className="fixed  left-6 z-50 p-3 cursor-pointer text-primaryBlue hover:text-blue-700 transition-all duration-300"
        onClick={toggleFilter}
      >
        <FaFilter size={30} />
      </div>

      {/* Filter Panel */}
      <div
        className={`fixed left-0  h-full w-72 bg-white shadow-xl transform overflow-y-auto no-scrollbar ${
          isFilterOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out p-6 z-40`}
      >
        <div className="flex flex-col space-y-6 mt-6">
          
          {/* Categories Section */}
          <div className="mt-4 flex flex-row justify-between items-center cursor-pointer hover:text-primaryBlue transition-all duration-300">
            <h1 className="text-xl font-semibold flex items-center space-x-2">
              <FaUserAlt className="text-primaryBlue" />
              <span>Categories</span>
            </h1>
            <div onClick={() => setIsCatgOpen(!isCatgOpen)}>
              {isCatgOpen ? <IoIosArrowDropup size={24} /> : <IoIosArrowDropdown size={24} />}
            </div>
          </div>
          {isCatgOpen && (
            <div className="mt-2 max-h-28 overflow-y-auto">
              <ul>
                {['Personal Assistant', 'Productivity', 'Content Creation', 'Coding'].map((cat) => (
                  <li key={cat} className="flex items-center space-x-2 py-1 cursor-pointer">
                    <span
                      className={`${
                        category === cat ? 'text-primaryBlue font-bold' : 'hover:text-blue-600'
                      } transition-colors duration-300`}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </span>
                    {category === cat && (
                      <IoIosClose
                        className="text-primaryBlue cursor-pointer"
                        onClick={resetCategory}
                        size={24}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <hr />

          {/* Industries Section */}
          <div className="flex flex-row justify-between items-center cursor-pointer hover:text-primaryBlue transition-all duration-300">
            <h1 className="text-xl font-semibold flex items-center space-x-2">
              <FaIndustry className="text-primaryBlue" />
              <span>Industries</span>
            </h1>
            <div onClick={() => setIsIdstOpen(!isIdstOpen)}>
              {isIdstOpen ? <IoIosArrowDropup size={24} /> : <IoIosArrowDropdown size={24} />}
            </div>
          </div>
          {isIdstOpen && (
            <div className="mt-2 max-h-28 overflow-y-auto">
              <ul className="text-gray-600 pl-4">
                {['Technology', 'Finance', 'Healthcare'].map((ind) => (
                  <li key={ind} className="flex items-center space-x-2 py-1">
                    <span
                      className={`cursor-pointer ${
                        industry === ind ? 'text-primaryBlue font-bold' : 'hover:text-blue-600'
                      } transition-colors duration-300`}
                      onClick={() => handleIndustryChange(ind)}
                    >
                      {ind}
                    </span>
                    {industry === ind && (
                      <IoIosClose
                        className="text-primaryBlue cursor-pointer"
                        onClick={resetIndustry}
                        size={24}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <hr />

          {/* Pricing Model Section */}
          <div className="flex flex-row justify-between items-center cursor-pointer hover:text-primaryBlue transition-all duration-300">
            <h1 className="text-xl font-semibold flex items-center space-x-2">
              <FaDollarSign className="text-primaryBlue" />
              <span>Pricing Model</span>
            </h1>
            <div onClick={() => setIsPricesOpen(!isPricesOpen)}>
              {isPricesOpen ? <IoIosArrowDropup size={24} /> : <IoIosArrowDropdown size={24} />}
            </div>
          </div>
          {isPricesOpen && (
            <div className="mt-2 max-h-28 overflow-y-auto">
              <ul className="text-gray-600 pl-4">
                {['Free', 'Freemium', 'Paid'].map((price) => (
                  <li key={price} className="flex items-center space-x-2 py-1">
                    <span
                      className={`cursor-pointer ${
                        pricingModel === price ? 'text-primaryBlue font-bold' : 'hover:text-blue-600'
                      } transition-colors duration-300`}
                      onClick={() => handlePricingChange(price)}
                    >
                      {price}
                    </span>
                    {pricingModel === price && (
                      <IoIosClose
                        className="text-primaryBlue cursor-pointer"
                        onClick={resetPricing}
                        size={24}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <hr />

          {/* Access Model Section */}
          <div className="flex flex-row justify-between items-center cursor-pointer hover:text-primaryBlue transition-all duration-300">
            <h1 className="text-xl font-semibold flex items-center space-x-2">
              <FaKey className="text-primaryBlue" />
              <span>Access Model</span>
            </h1>
            <div onClick={() => setIsModelOpen(!isModelOpen)}>
              {isModelOpen ? <IoIosArrowDropup size={24} /> : <IoIosArrowDropdown size={24} />}
            </div>
          </div>
          {isModelOpen && (
            <div className="mt-2 max-h-28 overflow-y-auto">
              <ul className="text-gray-600 pl-4">
                {['Open Source', 'Closed Source', 'API'].map((access) => (
                  <li key={access} className="flex items-center space-x-2 py-1">
                    <span
                      className={`cursor-pointer ${
                        accessModel === access ? 'text-primaryBlue font-bold' : 'hover:text-blue-600'
                      } transition-colors duration-300`}
                      onClick={() => handleAccessChange(access)}
                    >
                      {access}
                    </span>
                    {accessModel === access && (
                      <IoIosClose
                        className="text-primaryBlue cursor-pointer"
                        onClick={resetAccess}
                        size={24}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

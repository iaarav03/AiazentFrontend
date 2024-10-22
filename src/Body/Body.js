
import React, { useState } from "react";
import { motion } from "framer-motion";
import Search from "../Components/Search/search";
import { Card } from "../Components/AgentsCtgCard.js/Card";
import { Agents } from "../Components/FeaturedAgent/Agents";
import CreateAgentForm from "../Components/NewAgentForm/Agentform";
import { Signup } from "../User/UserSignUp/signup";
import { Login } from "../User/Login/login";
import SearchComponent from "./PromptSearch/Search";

const Body = () => {
  const [word, setWord] = useState(null);
  const [model, setModel] = useState("Model");
  const [pricing, setPricing] = useState("Pricing");
  const [category, setCategory] = useState('Category');
  const [industry, setIndustry] = useState("Industry");

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main heading with enhanced animation */}
          <motion.h1
            className="text-6xl font-extrabold tracking-tight text-primaryBlue drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Transform{" "}
            <motion.span
              className="text-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.2 }}
            >
              your business{" "}
            </motion.span>
            with AiAzent
          </motion.h1>

          {/* Subheading with subtle animation */}
          <motion.p
            className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Leverage the power of AI to automate processes, boost productivity, and unlock new possibilities for growth.
          </motion.p>

          {/* Call to action button */}
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <button className="bg-gradient-to-r from-primaryBlue to-blue-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300">
              Get Started with AiAzent
            </button>
          </motion.div>

          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-xl -z-10 transform translate-x-12 translate-y-16"></div>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-300 opacity-20 blur-lg -z-10 transform -translate-x-12 translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-200 opacity-20 blur-lg -z-10 transform translate-x-20 -translate-y-24"></div>
        </div>
      </div>

      {/* Featured Agents Section */}
      <div className="bg-gray-100 py-20">
        <Agents />
      </div>

      {/* Prompt Search Section */}
      <SearchComponent />

      {/* Filter/Search Component */}
      <Search
        word={word}
        setWord={setWord}
        setModel={setModel}
        setPrice={setPricing}
        setCategory={setCategory}
        setIndustry={setIndustry}
      />

      {/* Card component */}
      <Card
        propmodel={model}
        propprice={pricing}
        propcategory={category}
        propindustry={industry}
      />
       {/* <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 1, ease: "backInOut" } }}
        className="absolute bottom-10 left-1/3 w-48 h-40 bg-blue-500 rounded-full filter blur-xl opacity-20"
      /> */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 1, ease: "backInOut", delay: 0.3 } }}
        className="absolute top-5 right-1/4 w-32 h-32 bg-purple-600 rounded-full filter blur-lg opacity-20"
      />
    </>
  );
};

export default Body;

// src/Components/Background.js

import React from 'react';
import { motion } from 'framer-motion';

const blobVariants = {
  initial: {
    opacity: 0.3,
    scale: 1,
  },
  animate: {
    opacity: 0.5,
    scale: 1.1,
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

const Background = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Blob 1 */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primaryBlue rounded-full blur-3xl"
        variants={blobVariants}
        initial="initial"
        animate="animate"
      ></motion.div>

      {/* Blob 2 */}
      <motion.div
        className="absolute bottom-10 right-20 w-80 h-80 bg-primaryBlue2 rounded-full blur-2xl"
        variants={blobVariants}
        initial="initial"
        animate="animate"
      ></motion.div>

      {/* Blob 3 */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-60 h-60 bg-primaryBlue rounded-full blur-3xl"
        variants={blobVariants}
        initial="initial"
        animate="animate"
      ></motion.div>
    </div>
  );
};

export default Background;

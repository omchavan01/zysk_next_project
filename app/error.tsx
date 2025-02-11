"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-gray-100 max-w-7xl mx-auto h-screen flex justify-center items-start px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-lg transition-all mt-20">
        <motion.h1
          className="text-2xl font-bold text-center text-light-orange mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Something went wrong!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex justify-center items-center"
        >
          <button
            className="text-white text-center bg-light-orange px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-200"
            onClick={reset}
          >
            Try again
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Error;

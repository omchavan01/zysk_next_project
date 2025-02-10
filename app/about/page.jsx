"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import FeaturesCards from "../components/common/FeaturesCards";
import { features, stats } from "../components/About/data";

const About = () => {

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* About Web Pundit */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          About The Web Pundit
        </h1>
        <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto">
          We are passionate about creating exceptional digital experiences that
          help businesses thrive in the modern world.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
        {features.map((card, index) => (
          <FeaturesCards
            key={index}
            {...card}
            className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          />
        ))}
      </div>

      {/* Mission */}
      <motion.div
        className="bg-light-orange text-white rounded-lg p-12 text-center mb-16"
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg max-w-3xl mx-auto">
          To empower businesses with innovative web solutions that drive growth
          and create meaningful connections with their audience.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
            whileInView="whileInView"
          >
            <div className="text-4xl font-bold text-light-orange mb-2">
              <CountUp
                end={stat.number}
                suffix={stat.suffix || "+"}
                duration={2.5}
                enableScrollSpy
                scrollSpyOnce
              />
            </div>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;

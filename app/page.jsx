"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FeaturesCards from "./components/common/FeaturesCards";
import { features, services } from "./components/Home/data";

const fadeInAnimationValues = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <div className="bg-white max-w-7xl w-full mx-auto md:px-2">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center md:my-24 my-16">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 px-2 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          whileInView={{ opacity: 1 }}
        >
          DESIGNING WEBSITES THAT
          <br className="hidden md:block" />
          &nbsp;TELL YOUR STORY
        </motion.h1>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
          whileInView={{ opacity: 1 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl px-2 md:px-0">
            <span className="text-light-orange">ACHIEVE BUSINESS</span> GROWTH
            WITH THE STRENGTH
            <br />
            OF OUR WEB SERVICE
          </h2>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
              ease: "easeInOut",
            }}
            whileInView={{ opacity: 1 }}
          >
            <Link href="/about" prefetch={true}>
              <button className="mt-8 px-8 py-3 border-2 border-light-orange text-light-orange rounded-full hover:bg-light-orange hover:text-white transition-colors duration-200">
                <span>SEE HOW</span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="md:py-20 py-12 bg-gray-50 px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          {...fadeInAnimationValues}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
          viewport={{ once: true }}
        >
          Our Web Development Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FeaturesCards
              key={index}
              {...service}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          {...fadeInAnimationValues}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          Why Choose Web Pundit?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeaturesCards key={index} {...feature} className="text-center" />
          ))}
        </div>
      </section>

      {/* Get started Section */}
      <section className="w-full bg-light-orange">
        <div className="max-w-7xl px-4 py-20 text-center text-white">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            {...fadeInAnimationValues}
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            className="mb-8"
            {...fadeInAnimationValues}
            transition={{ delay: 0.2 }}
          >
            Let&apos;s create something amazing together. Get in touch with us
            today.
          </motion.p>
          <motion.div {...fadeInAnimationValues} transition={{ delay: 0.3 }}>
            <Link
              href="/contact"
              className="bg-white text-light-orange px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Background Animation */}
      <motion.div
        className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
};

export default Home;

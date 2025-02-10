"use client";

import { easeIn, motion } from "framer-motion";
import { Code, Palette, Globe, Zap, Users, MessageSquare } from "lucide-react";
import Link from "next/link";
import FeaturesCards from "./components/FeaturesCards";

export default function Home() {
  const services = [
    {
      icon: <Code className="md:w-12 md:h-12 w-8 h-8" />,
      title: "Custom Development",
      description:
        "Tailored solutions that perfectly match your business needs",
    },
    {
      icon: <Palette className="md:w-12 md:h-12 w-8 h-8" />,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that users love to interact with",
    },
    {
      icon: <Globe className="md:w-12 md:h-12 w-8 h-8" />,
      title: "Web Applications",
      description: "Powerful, scalable apps that drive business growth",
    },
  ];

  const features = [
    {
      icon: <Zap className="md:w-16 md:h-16 w-10 h-10 mx-auto" />,
      title: "Lightning Fast",
      description: "Optimized performance for the best user experience",
    },
    {
      icon: <Users className="md:w-16 md:h-16 w-10 h-10 mx-auto" />,
      title: "Client-Focused",
      description: "Your success is our top priority",
    },
    {
      icon: <MessageSquare className="md:w-16 md:h-16 w-10 h-10 mx-auto" />,
      title: "24/7 Support",
      description: "Always here when you need us",
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-white max-w-7xl w-full mx-auto md:px-2">
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
            <span className="text-[#E85C3F]">ACHIEVE BUSINESS</span> GROWTH WITH
            THE STRENGTH
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
              <button className="mt-8 px-8 py-3 border-2 border-[#E85C3F] text-[#E85C3F] rounded-full hover:bg-[#E85C3F] hover:text-white transition-colors duration-200">
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
          {...fadeIn}
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
          {...fadeIn}
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
      <section className="w-full bg-[#E85C3F]">
        <div className="max-w-7xl px-4 py-20 text-center text-white">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            {...fadeIn}
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p className="mb-8" {...fadeIn} transition={{ delay: 0.2 }}>
            Let&apos;s create something amazing together. Get in touch with us
            today.
          </motion.p>
          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <Link
              href="/contact"
              className="bg-white text-[#E85C3F] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
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
    </main>
  );
}

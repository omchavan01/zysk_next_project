"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    try {
      setLoading(true);
      await axios.post(
        "https://script.google.com/macros/s/AKfycbxfjKkTTdkNHM5QQ6skXcy9-4AUUl7TNACIjZkL1E2x44evnD2StmGqEtsT6AgPbKJ8/exec",
        formData,
      );
      toast.success("Contact Details sent !!");
      setLoading(false);
    } catch (error) {
      toast.error("Retry: Sending failed !!");
      setLoading(false);
    }
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto md:py-20 py-16 px-4">
      <motion.div
        className="text-center md:mb-16 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[#E85C3F] font-semibold">CONTACT</span>
        <h1 className="text-4xl font-bold mt-2">Get in Touch</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg px-8 shadow-sm order-1 md:order-2"
        >
          <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your name"
                autoComplete="off"
                className={`w-full px-4 py-3 rounded-lg border hover:border-[#e96533] focus:border-2 focus:border-[#E85C3F] ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-[#E85C3F] outline-none`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message:
                      "Minimum length of the name should be atleast 3 characters",
                  },
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email address"
                autoComplete="off"
                className={`w-full px-4 py-3 rounded-lg border hover:border-[#e96533] focus:border-2 focus:border-[#E85C3F] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-[#E85C3F] outline-none`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <textarea
                placeholder="Write your message..."
                autoComplete="off"
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border hover:border-[#e96533] focus:border-2 focus:border-[#E85C3F] ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } focus:ring-[#E85C3F] outline-none`}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 20,
                    message:
                      "Minimum length of the message should be atleast 20 characters",
                  },
                })}
              />
              {errors.message && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>
            <motion.button
              type="submit"
              className="w-full bg-[#E85C3F] text-white py-3 rounded-lg font-medium hover:bg-[#d54e34] transition outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? <BeatLoader color="#fff" size={10} /> : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="flex flex-col justify-start items-center order-2 md:order-1 md:mt-0 mt-12 px-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col justify-center gap-10">
            <div className="md:text-2xl text-xl">
              We&apos;re here to answer any question you may have.
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#E85C3F] p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg">
                  Our Address
                </h3>
                <p className="text-gray-600 lg:text-lg text-sm">
                  4th Floor, 1865, 5th Cross Rd, Vijayanagar 2nd stage,
                </p>
                <p className="text-gray-600 lg:text-lg text-sm">
                  Hampi Nagar 2nd Stage, RPC Layout,
                </p>
                <p className="text-gray-600 lg:text-lg text-sm">
                  Vijayanagar, Bengaluru, Karnataka 560040
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#E85C3F] p-3 rounded-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg">Contact</h3>
                <p className="text-gray-600">Mobile: 07829063920</p>
                <p className="text-gray-600">Mail: sales@zysk.tech</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#E85C3F] p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1">
                  Working hours
                </h3>
                <p className="text-gray-600 lg:text-lg text-sm">
                  Monday - Friday: 10:00 - 07:00
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

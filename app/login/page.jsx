"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from "axios";
import { showToast } from "../lib/toastUtils";
import { BeatLoader } from "react-spinners";

// Social auth providers
const socialAuthProviders = [
  { name: "Google", icon: "/images/google.png" },
  { name: "GitHub", icon: "/images/github.png" },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Make a request to the proxy API
      const response = await axios.post("/api/proxy", {
        username: data.username,
        password: data.password,
      });

      // If response has access token
      if (response?.data?.accessToken) {
        const token = response?.data?.accessToken;
        const userResponse = await axios.get("https://dummyjson.com/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Clear session and local storage
        sessionStorage.clear();
        localStorage.clear();

        // Store user details in session storage
        const details = {
          token: token,
          username: userResponse?.data?.username,
          password: userResponse?.data?.password,
          image: userResponse?.data?.image,
        };
        // Sign in using credentials in NextAuth
        signIn("credentials", {
          isToken: true,
          data: JSON.stringify(details),
          redirect: true,
          callbackUrl: "/",
        });
        setLoading(false);
      }
    } catch (error) {
      showToast("error", "Login failed!", 2000);
      setLoading(false);
    }
    reset();
  };

  const OAuthSignIn = async (provider) => {
    try {
      setLoading(true);
      await signIn(provider, { callbackUrl: "/" });
      setLoading(false);
    } catch (error) {
      showToast("error", "Login failed!", 2000);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 my-28">
      {/* Credentials Providers Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white shadow-lg transition-all"
      >
        <motion.h1
          className="text-3xl font-bold text-center text-light-orange mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Log in
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-light-orange transition-all duration-200`}
              placeholder="Enter your username"
              autoComplete="off"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-light-orange transition-all duration-200`}
                placeholder="Enter your password"
                autoComplete="off"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-light-orange text-white rounded-lg font-medium hover:bg-dark-orange transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <BeatLoader color="#fff" size={10} /> : "Log In"}
          </motion.button>
        </motion.form>

        {/* Oauth Providers Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-500 mb-4">Or continue with</p>
          <div className="flex justify-center gap-4">
            {socialAuthProviders.map((social, index) => (
              <motion.button
                key={social.name}
                className="p-3 rounded-full border border-gray-300 hover:border-1 hover:border-light-orange transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => {
                  OAuthSignIn(social.name.toLowerCase().toString());
                }}
              >
                <span className="sr-only">Sign in with {social.name}</span>
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={25}
                  height={25}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;

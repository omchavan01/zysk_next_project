"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { routeValues } from "./data";

interface routeProps {
  path: string;
  label: string;
}

interface sessionValues {
  user?: {
    username?: string;
    email?: string;
    image?: string;
  };
}

const Navbar: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { data: session, status } = useSession() as {
    data: sessionValues | null;
    status: string;
  };
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated" && !localStorage.getItem("loginSuccess")) {
      toast.success("Logged In !!", {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#121212",
          color: "#fff",
          fontFamily: "sans-serif",
          position: "relative",
          top: "80px",
          right: "20px",
        },
      });
      localStorage.setItem("loginSuccess", "true");
    }
  }, [status]);

  const sessionValues: sessionValues = session || {};

  const handleSignOut = async () => {
    setIsSignOutOpen(false);
    localStorage.removeItem("loginSuccess");
    toast.success("Logged Out !!", {
      duration: 3500,
      style: {
        borderRadius: "10px",
        background: "#121212",
        color: "#fff",
        fontFamily: "sans-serif",
        position: "relative",
        top: "80px",
        right: "20px",
      },
    });
    await signOut({ callbackUrl: "/" });
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  if (!isHydrated) {
    return (
      <nav className="h-20 bg-white flex items-center justify-center"></nav>
    );
  }

  return (
    <nav className="border-b bg-white max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-row gap-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-light-orange"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="The Web Pundit Logo"
            width={140}
            height={60}
            className="h-10 md:h-12 w-auto"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {routeValues.map((route: routeProps, idx: number) => (
          <Link
            key={idx}
            href={route.path}
            className="relative px-3 py-2 group"
          >
            <span
              className={`text-lg ${
                pathname === route?.path ? "text-light-orange" : "text-gray-600"
              } group-hover:text-light-orange transition-colors duration-200`}
            >
              {route?.label}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-light-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
          </Link>
        ))}
      </div>

      {/* Authenticated User - Show Profile Picture */}
      {status === "authenticated" ? (
        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden"
              onClick={() => setIsSignOutOpen(!isSignOutOpen)}
            >
              <Image
                src={"/images/default_profile_photo.png"}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>

            {/* Sign Out Dropdown */}
            {isSignOutOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl py-3 border border-gray-100"
              >
                {/* Profile Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.1 },
                  }}
                  className="flex items-center space-x-4 px-4 py-3"
                >
                  <div className="relative group">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-light-orange ring-offset-2 transition-all duration-300">
                      <Image
                        src={
                          sessionValues.user?.image ||
                          "/images/default_profile_photo.png"
                        }
                        alt="Profile Picture"
                        width={48}
                        height={48}
                        className="rounded-full hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg font-semibold text-gray-800"
                    >
                      {sessionValues.user?.username}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm text-gray-500"
                    >
                      {sessionValues.user?.email}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Cancel and Signout Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.5 },
                  }}
                  className="pt-2 mt-2 border-t border-gray-100 flex justify-between pl-20 pr-10"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-1 text-light-orange font-bold hover:border-b-2 hover:border-light-orange transition-colors duration-200"
                    onClick={() => setIsSignOutOpen(!isSignOutOpen)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-1 text-light-orange font-bold hover:border-b-2 hover:border-light-orange transition-colors duration-200"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      ) : status === "loading" ? (
        <ClipLoader color="#E85C3F" />
      ) : (
        /* Show Login Button */
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link
            href="/login"
            className="border-2 text-gray-600 border-light-orange px-6 py-2 rounded-full hover:bg-light-orange hover:text-white transition-colors duration-200"
          >
            LOGIN
          </Link>
        </motion.div>
      )}

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-20 left-0 w-full bg-white border-b shadow-lg z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="flex flex-col items-center space-y-4 py-6">
              {routeValues.map((route: routeProps, idx: number) => (
                <Link
                  key={idx}
                  href={route.path}
                  className={`text-lg font-medium ${
                    pathname === route?.path
                      ? "text-light-orange"
                      : "text-gray-600"
                  } hover:text-light-orange transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

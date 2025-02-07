"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Blogs", href: "/blogs" },
      ],
    },
    {
      title: "Help Center",
      links: [
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/company/zysktech/",
        },
        { name: "Instagram", href: "https://www.instagram.com/zysktech/" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "https://zysk.tech/privacy-policy/" },
        {
          name: "Terms & Conditions",
          href: "https://zysk.tech/terms-conditions/",
        },
      ],
    },
  ];

  return (
    <footer className="bg-[#eee] max-w-7xl mx-auto text-center pb-2">
      <motion.div
        className="grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Address and Logo */}
        <motion.section
          className="flex flex-col gap-4 md:items-start items-center md:mb-0 mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="The Web Pundit Logo"
              width={140}
              height={60}
              className="h-14 md:h-20 w-auto"
            />
          </Link>
          <div className="text-sm text-gray-600 flex flex-col md:items-start items-center">
            <p>4th Floor, 1865, 5th Cross Rd, Vijayanagar 2nd stage,</p>
            <p>Hampi Nagar 2nd Stage, RPC Layout,</p>
            <p>Vijayanagar, Bengaluru, Karnataka 560040</p>
          </div>
        </motion.section>

        {/* Links */}
        <motion.section
          className="flex flex-row md:gap-16 gap-8 justify-center text-sm"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <h2 className="mb-6 font-semibold text-gray-900 uppercase dark:text-white">
                {section.title}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {section.links.map((link, i) => (
                  <motion.li
                    key={i}
                    className="mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      target={link.href.startsWith("https") ? "_blank" : "_self"}
                      className="py-1 hover:border-b-2 hover:border-b-[#E85C3F] transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.section>
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-300">
          © 2025 <Link href="#">Zysk Technologies™</Link>. All Rights Reserved.
        </span>
      </motion.div>
    </footer>
  );
}

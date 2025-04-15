"use client"
import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Memoized link component to prevent unnecessary re-renders
const FooterLink = memo(({ children, href, delay }) => (
  <motion.li
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    <a className="hover:underline transition" href={href}>{children}</a>
  </motion.li>
));

FooterLink.displayName = 'FooterLink';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }} // Reduced from 0.6
    >
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <motion.div
          className="w-4/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }} // Optimized timing
        >
          <div className="w-18 md:w-12 relative">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
              alt="logo"
              width={48}
              height={48}
            />
          </div>
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </motion.div>

        <motion.div
          className="w-1/2 flex items-center justify-start md:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }} // Optimized timing
        >
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <FooterLink href="#" delay={0.3}>Home</FooterLink>
              <FooterLink href="#" delay={0.4}>About us</FooterLink>
              <FooterLink href="#" delay={0.5}>Contact us</FooterLink>
              <FooterLink href="#" delay={0.6}>Privacy policy</FooterLink>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="w-1/2 flex items-start justify-start md:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }} // Optimized timing
        >
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                +1-234-567-890
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                contact@greatstack.dev
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default memo(Footer);
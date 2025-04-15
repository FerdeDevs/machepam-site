'use client'
import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Image from 'next/image';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form handling functions remain the same
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with reduced timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 2000); // Reduced from 3000ms
    }, 1000); // Reduced from 1500ms
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-24 pb-16">
        {/* Header Section - Optimized animation duration */}
        <motion.div 
          className="w-full flex flex-col items-end mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} // Reduced from 0.6
        >
          <p className="text-2xl font-medium">Contactez-nous</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </motion.div>

        {/* Contact Info Cards - Optimized animations */}
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} // Reduced from 0.7
        >
          {/* Cards content remains the same */}
          {/* ... */}
        </motion.div>

        {/* Contact Form and Map Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form content remains the same */}
          {/* ... */}
          
          {/* Map - Optimized with loading="lazy" */}
          <motion.div
            className="rounded-lg overflow-hidden h-[400px] lg:h-auto"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }} // Reduced from 0.7
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342144!2d2.3002659156744847!3d48.87067100866258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xcbb47407434935db!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="MachePam Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
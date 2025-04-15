'use client'
import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-24 pb-16">
        {/* Header Section */}
        <motion.div 
          className="w-full flex flex-col items-end mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-2xl font-medium">À propos de nous</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <div className="relative h-[400px] md:h-full w-full overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Notre équipe" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <motion.div 
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-white text-xl font-medium">Notre passion</h3>
                <p className="text-white/80 mt-2">Créer des expériences d'achat exceptionnelles depuis 2023</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-medium text-gray-800">Notre histoire</h2>
            <p className="text-gray-600">
              Fondée en 2023, MachePam est née d'une vision simple : rendre le shopping en ligne plus accessible, 
              plus intuitif et plus agréable. Notre équipe passionnée travaille sans relâche pour offrir une 
              expérience d'achat exceptionnelle à nos clients.
            </p>
            <p className="text-gray-600">
              Nous croyons que chaque produit raconte une histoire et que chaque achat devrait être une expérience 
              mémorable. C'est pourquoi nous sélectionnons soigneusement chaque article de notre catalogue pour 
              garantir qualité et satisfaction.
            </p>

            <motion.div 
              className="grid grid-cols-2 gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="bg-gray-50 p-4 rounded-lg"
                whileInView={{
                  scale: [0.9, 1.05, 1],
                  transition: { duration: 0.5 }
                }}
              >
                <motion.h3 
                  className="text-xl font-medium text-orange-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CountUp end={100} suffix="+" duration={2.5} />
                </motion.h3>
                <p className="text-gray-600 text-sm mt-1">Produits de qualité</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 p-4 rounded-lg"
                whileInView={{
                  scale: [0.9, 1.05, 1],
                  transition: { duration: 0.5, delay: 0.1 }
                }}
              >
                <motion.h3 
                  className="text-xl font-medium text-orange-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <CountUp end={24} suffix="/7" duration={1.5} />
                </motion.h3>
                <p className="text-gray-600 text-sm mt-1">Support client</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 p-4 rounded-lg"
                whileInView={{
                  scale: [0.9, 1.05, 1],
                  transition: { duration: 0.5, delay: 0.2 }
                }}
              >
                <motion.h3 
                  className="text-xl font-medium text-orange-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CountUp end={5000} suffix="+" duration={2.5} />
                </motion.h3>
                <p className="text-gray-600 text-sm mt-1">Clients satisfaits</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 p-4 rounded-lg"
                whileInView={{
                  scale: [0.9, 1.05, 1],
                  transition: { duration: 0.5, delay: 0.3 }
                }}
              >
                <motion.h3 
                  className="text-xl font-medium text-orange-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CountUp end={15} suffix="+" duration={1.5} />
                </motion.h3>
                <p className="text-gray-600 text-sm mt-1">Pays desservis</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>


        {/* CTA Section */}
        <motion.div 
          className="w-full mt-20 bg-gray-50 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Rejoignez notre aventure</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Découvrez notre sélection de produits exceptionnels et profitez d'une expérience d'achat unique.
          </p>
          <button 
            onClick={() => router.push('/all-products')}
            className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 text-sm transition-colors"
          >
            Découvrir nos produits
          </button>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
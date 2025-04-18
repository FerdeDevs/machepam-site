'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Vérifier si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }
    
    // Simuler le processus d'inscription
    setTimeout(() => {
      setIsLoading(false);
      // Rediriger vers la page de connexion après inscription réussie
      router.push('/login');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Éléments décoratifs d'arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-14 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        </div>
        
        <motion.div 
          className="p-8 rounded-xl border border-white max-w-2xl w-full relative z-10 backdrop-blur-2xl bg-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-2xl font-semibold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Inscription
            </motion.h1>
            <motion.p 
              className="text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Créez votre compte MachePam
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Nom et prénom sur la même ligne */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="text-sm pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Prénom"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="text-sm pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Nom"
                  />
                </div>
              </div>
            </div>

            {/* Email sur une ligne séparée */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="text-sm pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            {/* Téléphone et sexe sur la même ligne */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <div className="relative">
                  <PhoneInput
                    country={'ht'}
                    value={formData.phone}
                    onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      id: 'phone',
                      style: { borderRadius: '9999px', width: '100%' }
                    }}
                    containerClass="w-full"
                    inputClass="text-sm py-2 w-full bg-gray-50 border border-gray-300 focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    buttonClass="border border-gray-300 bg-gray-50"
                    buttonStyle={{ borderRadius: '9999px 0 0 9999px' }}
                    dropdownClass="bg-white"
                    containerStyle={{ borderRadius: '9999px', width: '100%' }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Sexe
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="text-sm px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                >
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
              </div>
            </div>

            {/* Mot de passe et confirmation sur la même ligne */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="text-sm pl-10 pr-12 py-2 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="text-sm pl-10 pr-12 py-2 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'S\'inscrire'}
              </button>
            </div>
          </motion.form>

          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte?{' '}
              <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                Connectez-vous
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
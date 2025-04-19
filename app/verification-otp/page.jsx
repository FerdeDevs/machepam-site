'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { KeyRound, RefreshCw } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const VerificationOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  // Handle OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle key events for backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    pastedOtp.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const lastFilledIndex = newOtp.findIndex(val => val === '') - 1;
    const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : 5;
    document.getElementById(`otp-${focusIndex}`).focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast.error('Veuillez entrer un code OTP complet');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // const response = await fetch(`http://localhost:5000/api/users/client/verify`, {
      const response = await fetch(`https://machepam.onrender.com/api/users/client/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          otp: otpValue  // Changed from otpCode to otpValue
        }),
      });

      if (response.ok) {
        toast.success('Vérification réussie !');
        router.push('/login');
      } else {
        const data = await response.json();
        toast.error(data.message || 'OTP invalide ou expiré');
      }
    } catch (error) {
      toast.error('Erreur de connexion au serveur');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    setCountdown(30);
    
    try {
      // Replace with your API endpoint for resending OTP
      const response = await fetch(`http://localhost:5000/api/users/client/resend-otp`, {
      // const response = await fetch(`https://machepam.onrender.com/api/users/client/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Add any required data like email or phone
        body: JSON.stringify({ /* email or phone */ }),
      });

      if (response.ok) {
        toast.success('Nouveau code OTP envoyé !');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Échec de l\'envoi du code OTP');
      }
    } catch (error) {
      toast.error('Erreur de connexion au serveur');
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-14 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        </div>
        
        <motion.div 
          className="p-8 rounded-xl border border-white max-w-md w-full relative z-10 backdrop-blur-2xl bg-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-orange-100 p-3 rounded-full">
                <KeyRound size={32} className="text-orange-600" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-2xl font-semibold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Vérification OTP
            </motion.h1>
            <motion.p 
              className="text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Veuillez entrer le code à 6 chiffres envoyé à <span className='text-orange-600'>{email}</span> 
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  required
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                />
              ))}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Vérification...' : 'Vérifier'}
            </motion.button>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <p className="text-sm text-gray-600 mb-2">Vous n'avez pas reçu de code?</p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendDisabled}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center justify-center mx-auto disabled:text-gray-400"
              >
                <RefreshCw size={16} className={`mr-1 ${resendDisabled ? 'animate-spin' : ''}`} />
                {resendDisabled 
                  ? `Réessayer dans ${countdown}s` 
                  : 'Renvoyer le code OTP'}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
};

export default VerificationOTP;
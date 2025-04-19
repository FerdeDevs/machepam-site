"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Key,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Check,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { toast } from "react-toastify";

const ChangePasswordPage = () => {
  const router = useRouter();

  // Étape actuelle du processus
  const [step, setStep] = useState(1);

  // État de l'email et validation
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  // État du code OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // État du mot de passe
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // États de l'interface
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  // Valider l'email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  // Valider la force du mot de passe
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Au moins 8 caractères
    if (password.length >= 8) strength += 1;

    // Au moins une lettre majuscule
    if (/[A-Z]/.test(password)) strength += 1;

    // Au moins une lettre minuscule
    if (/[a-z]/.test(password)) strength += 1;

    // Au moins un chiffre
    if (/[0-9]/.test(password)) strength += 1;

    // Au moins un caractère spécial
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  }, [password]);

  // Gestion du compte à rebours pour l'envoi du code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  // Fonction pour soumettre l'email (étape 1)
  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      toast.error("Veuillez entrer une adresse e-mail valide");
      return;
    }

    setIsLoading(true);

    try {
      // Remplacer par votre appel API pour envoyer l'email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(`Code de vérification envoyé à ${email}`);
      setResendDisabled(true);
      setCountdown(30);
      setStep(2);
    } catch (error) {
      toast.error("Erreur lors de l'envoi du code de vérification");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour gérer la modification du code OTP
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus sur l'input suivant s'il existe
    if (element.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Gérer la touche retour arrière pour l'OTP
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Gérer le collage d'un code OTP
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    pastedOtp.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus sur le dernier champ rempli ou le dernier
    const lastFilledIndex = newOtp.findIndex((val) => val === "") - 1;
    const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : 5;
    document.getElementById(`otp-${focusIndex}`).focus();
  };

  // Fonction pour vérifier le code OTP (étape 2)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Veuillez entrer le code à 6 chiffres complet");
      return;
    }

    setIsLoading(true);

    try {
      // Remplacer par votre appel API pour vérifier l'OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setOtpVerified(true);
      toast.success("Code vérifié avec succès");
      setStep(3);
    } catch (error) {
      toast.error("Code de vérification invalide");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour renvoyer le code OTP
  const handleResendOtp = async () => {
    setResendDisabled(true);
    setCountdown(30);

    try {
      // Remplacer par votre appel API pour renvoyer l'OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Nouveau code envoyé");
    } catch (error) {
      toast.error("Erreur lors de l'envoi du code");
    }
  };

  // Fonction pour définir le nouveau mot de passe (étape 3)
  const handleSetNewPassword = async (e) => {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    // Vérifier la force du mot de passe
    if (passwordStrength < 3) {
      toast.error("Veuillez choisir un mot de passe plus fort");
      return;
    }

    setIsLoading(true);

    try {
      // Remplacer par votre appel API pour changer le mot de passe
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Mot de passe modifié avec succès!");

      // Rediriger vers la page de connexion après un court délai
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toast.error("Erreur lors de la modification du mot de passe");
    } finally {
      setIsLoading(false);
    }
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
          className="p-8 rounded-xl border border-white max-w-md w-full relative z-10 backdrop-blur-2xl bg-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Indicateur d'étape */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>

            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${
                  stepNumber < step
                    ? "bg-green-500 text-white"
                    : stepNumber === step
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {stepNumber < step ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Étape 1: Entrer l'email */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <motion.h1
                    className="text-2xl font-semibold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Changer votre mot de passe
                  </motion.h1>
                  <motion.p
                    className="text-gray-600 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Entrez votre adresse e-mail pour recevoir un code de
                    vérification
                  </motion.p>
                </div>

                <form onSubmit={handleSubmitEmail} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Adresse e-mail
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-600 focus:border-orange-600 outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!isEmailValid || isLoading}
                      className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-full  text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Continuer
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center text-sm">
                    <Link
                      href="/login"
                      className="text-orange-600 hover:text-orange-600"
                    >
                      Retour à la connexion
                    </Link>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Étape 2: Entrer le code de vérification */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <motion.h1
                    className="text-2xl font-semibold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Vérification
                  </motion.h1>
                  <motion.p
                    className="text-gray-600 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Entrez le code à 6 chiffres envoyé à{" "}
                    <span className="text-orange-600 font-medium">{email}</span>
                  </motion.p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                      Code de vérification
                    </label>

                    <div className="flex justify-center space-x-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onPaste={index === 0 ? handleOtpPaste : undefined}
                          className="w-10 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring focus:ring-orange-600 focus:border-orange-600 outline-none transition-all"
                          required
                        />
                      ))}
                    </div>

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendDisabled}
                        className="text-orange-600 hover:text-orange-600 text-sm font-medium flex items-center mx-auto disabled:text-gray-400"
                      >
                        <RefreshCw className="mr-1 h-3 w-3" />
                        {resendDisabled
                          ? `Renvoyer dans ${countdown}s`
                          : "Renvoyer le code"}
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-full  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Retour
                    </button>

                    <button
                      type="submit"
                      disabled={otp.join("").length !== 6 || isLoading}
                      className="flex-1 flex justify-center items-center py-2.5 px-4 border border-transparent rounded-full  text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Vérification...
                        </>
                      ) : (
                        <>
                          Vérifier
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Étape 3: Définir le nouveau mot de passe */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <motion.h1
                    className="text-2xl font-semibold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Nouveau mot de passe
                  </motion.h1>
                  <motion.p
                    className="text-gray-600 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Créez un nouveau mot de passe sécurisé
                  </motion.p>
                </div>

                <form onSubmit={handleSetNewPassword} className="space-y-6">
                  <div>
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nouveau mot de passe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="new-password"
                        name="new-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 py-2.5 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-600 focus:border-orange-600 outline-none transition-all"
                        placeholder="Minimum 8 caractères"
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

                    {/* Indicateur de force du mot de passe */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex space-x-1 h-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-full flex-1 rounded-full ${
                                passwordStrength >= level
                                  ? level <= 2
                                    ? "bg-red-500"
                                    : level <= 3
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  : "bg-gray-200"
                              }`}
                            ></div>
                          ))}
                        </div>
                        <p className="text-xs mt-1 text-gray-500">
                          {passwordStrength <= 2
                            ? "Mot de passe faible"
                            : passwordStrength <= 3
                              ? "Mot de passe moyen"
                              : "Mot de passe fort"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`pl-10 pr-10 py-2.5 w-full bg-gray-50 border rounded-full focus:ring focus:ring-orange-600 outline-none transition-all ${
                          confirmPassword && password !== confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Confirmation du mot de passe"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        Les mots de passe ne correspondent pas
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-full  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Retour
                    </button>

                    <button
                      type="submit"
                      disabled={
                        !password ||
                        !confirmPassword ||
                        password !== confirmPassword ||
                        passwordStrength < 3 ||
                        isLoading
                      }
                      className="flex-1 flex justify-center items-center py-2.5 px-4 border border-transparent rounded-full  text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Enregistrement...
                        </>
                      ) : (
                        "Enregistrer"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Keyframes pour l'animation de fond */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default ChangePasswordPage;

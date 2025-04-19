"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
} from "lucide-react";
import Navbar from "@/components/navbar";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ProfilePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("/user.png");
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "50937123456",
    gender: user?.gender || "male",
    birthDate: user?.birthDate || "1990-01-01",
    department: user?.department || "Ouest",
    city: user?.city || "Port-au-Prince",
    street: user?.street || "Rue Capois",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to update profile would go here
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      toast.success("Profil mis à jour avec succès!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Échec de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  // Address Modal Component
  const AddressModal = () => {
    if (!showAddressModal) return null;

    return (
      <div className="fixed inset-0 bg-white/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              Informations d'adresse
            </h2>
            <button
              onClick={() => setShowAddressModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Département
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:ring focus:ring-orange-200 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:ring focus:ring-orange-200 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rue/Quartier
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:ring focus:ring-orange-200 disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowAddressModal(false)}
              className="w-full px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
            >
              Terminé
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
            {/* Profile Card - Spans 1 column on mobile, 1 column on desktop */}
            <motion.div
              className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="relative mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-100"
                />
                <label className="absolute bottom-0 right-0 bg-orange-600 p-2 rounded-full cursor-pointer hover:bg-orange-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </motion.div>
              <h1 className="text-xl font-semibold text-gray-800 text-center">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                {formData.email}
              </p>
              <motion.button
                className={`w-full px-4 py-2 rounded-full text-sm font-medium ${isEditing ? "bg-gray-200 text-gray-600" : "bg-orange-600 text-white"} flex items-center justify-center`}
                onClick={() => setIsEditing(!isEditing)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Personal Info Card - Spans 2 columns on desktop */}
            <motion.div
              className="md:col-span-2 bg-white rounded-xl border border-gray-100 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                Informations personnelles
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="text-sm px-4 py-2.5 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="text-sm px-4 py-2.5 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="text-sm px-4 py-2.5 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <div className="group">
                      <PhoneInput
                        country={"ht"}
                        value={formData.phone}
                        onChange={(phone) =>
                          setFormData((prev) => ({ ...prev, phone }))
                        }
                        inputProps={{
                          name: "phone",
                          required: true,
                          id: "phone",
                          style: { borderRadius: "9999px", width: "100%" },
                        }}
                        containerClass="w-full"
                        inputClass="text-sm py-2 w-full bg-gray-50 border border-gray-300 focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        buttonClass="border border-gray-300 bg-gray-50"
                        buttonStyle={{ borderRadius: "9999px 0 0 9999px" }}
                        dropdownClass="bg-white"
                        containerStyle={{
                          borderRadius: "9999px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Genre
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="text-sm px-4 py-2.5 w-full bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100"
                    >
                      <option value="male">Homme</option>
                      <option value="female">Femme</option>
                      <option value="other">Autre</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de naissance
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-full focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-all disabled:bg-gray-100"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex justify-between items-center"
                >
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(true)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-xl bg-gray-50/50 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    Gérer l'adresse
                  </button>

                  {isEditing && (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center px-6 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
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
                          Mise à jour...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Enregistrer
                        </>
                      )}
                    </motion.button>
                  )}
                </motion.div>
              </form>
            </motion.div>

            {/* Security Card */}
            <motion.div
              className="bg-white rounded-xl border border-gray-100 p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-orange-500" />
                Sécurité
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Protégez votre compte avec une authentification forte
              </p>
              <button
                onClick={() => router.push("/change-password")}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
              >
                Changer le mot de passe
              </button>
            </motion.div>

            {/* Account Stats Card */}
            <motion.div
              className="md:col-span-2 bg-gradient-to-br from-orange-100/70 to-orange-200 rounded-xl border border-gray-100 p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Activité du compte
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Commandes</p>
                  <p className="text-2xl font-semibold text-gray-800">12</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Avis</p>
                  <p className="text-2xl font-semibold text-gray-800">5</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Favoris</p>
                  <p className="text-2xl font-semibold text-gray-800">8</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Points</p>
                  <p className="text-2xl font-semibold text-gray-800">240</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Address Modal */}
      <AddressModal />
    </>
  );
};

export default ProfilePage;

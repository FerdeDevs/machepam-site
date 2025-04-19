'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Camera, Mail, Phone, MapPin, User, Calendar, Building, Briefcase, Save, X } from 'lucide-react';
import Navbar from '@/components/navbar';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ProfilePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-avatar.png');
  const [showAddressModal, setShowAddressModal] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || 'male',
    birthDate: user?.birthDate || '',
    department: user?.department || '',
    city: user?.city || '',
    street: user?.street || '',
    occupation: user?.occupation || '',
    company: user?.company || '',
    bio: user?.bio || ''
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call to update profile would go here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Address Modal Component
  const AddressModal = () => {
    if (!showAddressModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">Address Information</h2>
            <button 
              onClick={() => setShowAddressModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street/Neighborhood</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowAddressModal(false)}
              className="w-full px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
            >
              Done
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
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-100"
                />
                <label className="absolute bottom-0 right-0 bg-orange-600 p-2 rounded-full cursor-pointer hover:bg-orange-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </motion.div>
              
              <div className="flex-1 text-center sm:text-left">
                <motion.h1 
                  className="text-2xl font-semibold text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {formData.firstName} {formData.lastName}
                </motion.h1>
                <motion.p 
                  className="text-gray-500 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {formData.occupation} {formData.company && `at ${formData.company}`}
                </motion.p>
              </div>

              <motion.button
                className={`px-4 py-2 rounded-full text-sm font-medium ${isEditing ? 'bg-gray-200 text-gray-600' : 'bg-orange-600 text-white'}`}
                onClick={() => setIsEditing(!isEditing)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </motion.button>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm p-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Category 1: Personal Information */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-medium text-gray-800">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <PhoneInput
                    country={'ht'}
                    value={formData.phone}
                    onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                    disabled={!isEditing}
                    containerClass="w-full"
                    inputClass="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                  />
                </div>
              </div>
              
              {/* Category 2: Address Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  Manage Address Information
                </button>
              </div>
            </motion.div>

            {/* Category 3: Professional Information */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-lg font-medium text-gray-800">Professional Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-full border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl border focus:ring focus:ring-orange-200 disabled:bg-gray-50"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
      
      {/* Address Modal */}
      <AddressModal />
    </>
  );
};

export default ProfilePage;
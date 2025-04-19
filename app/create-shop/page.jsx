"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Upload,
  Store,
  MapPin,
  Info,
  X,
  Plus,
  Tag,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { toast } from "react-toastify";

// Catégories disponibles
const availableCategories = [
  { id: "electronics", name: "Électronique" },
  { id: "clothing", name: "Vêtements" },
  { id: "home-decor", name: "Décoration" },
  { id: "beauty", name: "Beauté & Bien-être" },
  { id: "sports", name: "Sports & Loisirs" },
  { id: "books", name: "Livres & Médias" },
  { id: "food", name: "Alimentation" },
  { id: "jewelry", name: "Bijoux & Accessoires" },
  { id: "art", name: "Art & Artisanat" },
  { id: "toys", name: "Jouets & Jeux" },
  { id: "pets", name: "Animalerie" },
  { id: "garden", name: "Jardin & Extérieur" },
];

const CreateShopPage = () => {
  const router = useRouter();
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Haiti",
    },
    categories: [],
    logoUrl: null,
    bannerUrl: null,
  });

  // Prévisualisations des images
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // Erreurs de validation
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => {
      const categories = [...prev.categories];

      if (categories.includes(categoryId)) {
        return {
          ...prev,
          categories: categories.filter((id) => id !== categoryId),
        };
      } else {
        return {
          ...prev,
          categories: [...categories, categoryId],
        };
      }
    });

    // Effacer l'erreur de catégorie
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: null }));
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "logo") {
        setLogoPreview(reader.result);
        setFormData((prev) => ({ ...prev, logoUrl: file }));
      } else {
        setBannerPreview(reader.result);
        setFormData((prev) => ({ ...prev, bannerUrl: file }));
      }
    };
    reader.readAsDataURL(file);

    // Effacer l'erreur pour ce champ
    if (errors[type === "logo" ? "logoUrl" : "bannerUrl"]) {
      setErrors((prev) => ({
        ...prev,
        [type === "logo" ? "logoUrl" : "bannerUrl"]: null,
      }));
    }
  };

  const removeImage = (type) => {
    if (type === "logo") {
      setLogoPreview(null);
      setFormData((prev) => ({ ...prev, logoUrl: null }));
    } else {
      setBannerPreview(null);
      setFormData((prev) => ({ ...prev, bannerUrl: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Le nom de la boutique est requis";
    } else if (formData.shopName.length < 3) {
      newErrors.shopName = "Le nom doit contenir au moins 3 caractères";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    } else if (formData.description.length < 20) {
      newErrors.description =
        "La description doit contenir au moins 20 caractères";
    }

    if (!formData.address.street.trim()) {
      newErrors["address.street"] = "L'adresse est requise";
    }

    if (!formData.address.city.trim()) {
      newErrors["address.city"] = "La ville est requise";
    }

    if (!formData.categories.length) {
      newErrors.categories = "Sélectionnez au moins une catégorie";
    }

    if (!formData.logoUrl) {
      newErrors.logoUrl = "Le logo est requis";
    }

    if (!formData.bannerUrl) {
      newErrors.bannerUrl = "L'image de bannière est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Code pour envoyer les données au serveur
      // const formDataToSend = new FormData();
      // formDataToSend.append('shopName', formData.shopName);
      // formDataToSend.append('description', formData.description);
      // formDataToSend.append('address', JSON.stringify(formData.address));
      // formDataToSend.append('categories', JSON.stringify(formData.categories));
      // formDataToSend.append('logo', formData.logoUrl);
      // formDataToSend.append('banner', formData.bannerUrl);

      // const response = await fetch('/api/shops/create', {
      //   method: 'POST',
      //   body: formDataToSend
      // });

      // if (!response.ok) throw new Error('Erreur lors de la création de la boutique');

      toast.success("Votre boutique a été créée avec succès!");

      // Rediriger vers la page de la boutique ou le tableau de bord
      router.push("/shop-dashboard");
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Éléments décoratifs d'arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-14 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        </div>
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.h1
              className="text-3xl font-semibold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Créer votre boutique
            </motion.h1>
            <motion.p
              className="mt-2 text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Lancez votre activité sur MachePam et commencez à vendre vos
              produits en quelques minutes.
            </motion.p>
          </div>

          <motion.div
            className="bg-white/50 border border-gray-100 rounded-xl backdrop-blur-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="px-6 py-8 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-800 flex items-center">
                <Store className="w-5 h-5 mr-2 text-orange-500" />
                Informations de la boutique
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-8">
              {/* Nom de la boutique */}
              <div>
                <label
                  htmlFor="shopName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nom de la boutique <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-colors ${errors.shopName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="ex: Boutique Créole"
                />
                {errors.shopName && (
                  <p className="mt-1 text-sm text-red-500">{errors.shopName}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description de la boutique{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-colors ${errors.description ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Décrivez votre boutique, vos produits et votre mission..."
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/500 caractères
                </p>
              </div>

              {/* Adresse */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  Adresse de la boutique
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Rue/Quartier <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-colors ${errors["address.street"] ? "border-red-500" : "border-gray-300"}`}
                      placeholder="ex: 123 Rue des Artisans"
                    />
                    {errors["address.street"] && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors["address.street"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-colors ${errors["address.city"] ? "border-red-500" : "border-gray-300"}`}
                      placeholder="ex: Port-au-Prince"
                    />
                    {errors["address.city"] && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors["address.city"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Département/État
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-colors"
                      placeholder="ex: Ouest"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Code postal
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-colors"
                      placeholder="ex: HT6110"
                    />
                  </div>
                </div>
              </div>

              {/* Catégories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégories de produits <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  Sélectionnez les catégories de produits que vous souhaitez
                  vendre
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`px-3 py-2 border rounded-lg cursor-pointer transition-all flex items-center ${
                        formData.categories.includes(category.id)
                          ? "bg-orange-50 border-orange-500 text-orange-700"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {formData.categories.includes(category.id) ? (
                        <Check className="w-4 h-4 mr-2 text-orange-500" />
                      ) : (
                        <Tag className="w-4 h-4 mr-2 text-gray-400" />
                      )}
                      <span className="text-sm">{category.name}</span>
                    </motion.div>
                  ))}
                </div>

                {errors.categories && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.categories}
                  </p>
                )}
              </div>

              {/* Logo et bannière */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo de la boutique <span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      logoPreview
                        ? "border-orange-300"
                        : errors.logoUrl
                          ? "border-red-300"
                          : "border-gray-300"
                    }`}
                  >
                    {logoPreview ? (
                      <div className="relative">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="mx-auto h-40 w-40 object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage("logo")}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => logoInputRef.current.click()}
                        className="cursor-pointer py-8"
                      >
                        <Upload className="w-10 h-10 mx-auto text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Cliquez pour télécharger votre logo
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          PNG, JPG, GIF jusqu'à 5MB
                        </p>
                      </div>
                    )}

                    <input
                      ref={logoInputRef}
                      type="file"
                      onChange={(e) => handleImageUpload(e, "logo")}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {errors.logoUrl && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.logoUrl}
                    </p>
                  )}
                </div>

                {/* Bannière */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image de bannière <span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      bannerPreview
                        ? "border-orange-300"
                        : errors.bannerUrl
                          ? "border-red-300"
                          : "border-gray-300"
                    }`}
                  >
                    {bannerPreview ? (
                      <div className="relative">
                        <img
                          src={bannerPreview}
                          alt="Banner preview"
                          className="mx-auto h-40 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage("banner")}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => bannerInputRef.current.click()}
                        className="cursor-pointer py-8"
                      >
                        <ImageIcon className="w-10 h-10 mx-auto text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Cliquez pour télécharger une bannière
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Recommandé: 1200 x 300 pixels
                        </p>
                      </div>
                    )}

                    <input
                      ref={bannerInputRef}
                      type="file"
                      onChange={(e) => handleImageUpload(e, "banner")}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {errors.bannerUrl && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.bannerUrl}
                    </p>
                  )}
                </div>
              </div>

              {/* Note d'information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Informations importantes
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Votre boutique sera soumise à vérification avant
                          d'être publiée
                        </li>
                        <li>
                          Vous pourrez modifier ces informations ultérieurement
                        </li>
                        <li>
                          Pour plus d'informations, consultez nos{" "}
                          <a
                            href="/seller-guidelines"
                            className="underline hover:text-blue-800"
                          >
                            directives pour les vendeurs
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Annuler
                </button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
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
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Store className="w-4 h-4 mr-2" />
                      Créer ma boutique
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default CreateShopPage;

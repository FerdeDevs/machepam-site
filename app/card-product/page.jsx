"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Store,
  Tag,
  ArrowRight,
  Info,
  TrendingUp,
  Star,
  Minus,
  Plus,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CardProduct = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);

  // Utilisez des données fictives si certaines propriétés sont manquantes
  const {
    _id = "1",
    name = "Produit sans nom",
    price = 0,
    offerPrice,
    description = "Aucune description disponible",
    images = [],
    shop = { name: "Boutique", id: "1" },
    stock = 0,
    rating = 4.5,
    ratingCount = 12,
    categories = [],
    additionalInfo = {},
  } = product || {};

  // Calculer la réduction en pourcentage si offerPrice est disponible
  const discount =
    offerPrice && price ? Math.round(((price - offerPrice) / price) * 100) : 0;

  // Gérer l'augmentation/diminution de la quantité
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  // Gérer l'ajout au panier
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Intégrer ici la logique d'ajout au panier
    console.log(`Ajouté au panier: ${name}, Quantité: ${quantity}`);

    // Afficher un toast ou une notification
  };

  // Gérer l'ajout aux favoris
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Intégrer ici la logique d'ajout aux favoris
    console.log(`Ajouté aux favoris: ${name}`);

    // Afficher un toast ou une notification
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/product/${_id}`} className="block">
        {/* Badge de promotion si réduction */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              -{discount}%
            </div>
          </div>
        )}

        {/* Badge "En Stock" ou "Rupture de stock" */}
        <div className="absolute top-3 right-3 z-10">
          {stock > 0 ? (
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 inline-block"></span>
              En stock
            </div>
          ) : (
            <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
              Rupture
            </div>
          )}
        </div>

        {/* Image principale */}
        <div className="relative h-48 md:h-64 w-full bg-gray-100 overflow-hidden">
          {images.length > 0 ? (
            <>
              <Image
                src={images[0]}
                alt={name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Image secondaire qui apparaît au survol (si disponible) */}
              {images.length > 1 && (
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                >
                  <Image
                    src={images[1]}
                    alt={`${name} - vue alternative`}
                    fill
                    className="object-contain"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Tag className="w-12 h-12" />
            </div>
          )}
        </div>

        {/* Informations sur le produit */}
        <div className="p-4">
          {/* Nom de la boutique */}
          <div className="flex items-center mb-2">
            <Store className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
            <span className="text-xs text-gray-500 hover:text-orange-600 transition-colors">
              {shop.name}
            </span>
          </div>

          {/* Nom du produit */}
          <h3 className="text-gray-800 font-medium text-sm sm:text-base mb-1 line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>

          {/* Prix */}
          <div className="flex items-center gap-2 mb-2">
            {offerPrice ? (
              <>
                <span className="text-lg font-semibold text-orange-600">
                  ${offerPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-800">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Évaluation */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.floor(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : star <= Math.floor(rating) + 0.5
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({ratingCount})</span>
          </div>

          {/* Description courte */}
          <p className="text-gray-600 text-xs line-clamp-2 mb-3 min-h-[2rem]">
            {description}
          </p>

          {/* Stock */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">
              {stock > 0 ? `${stock} unités disponibles` : "Non disponible"}
            </span>

            {stock > 0 && stock < 10 && (
              <span className="text-xs text-orange-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Ventes rapides
              </span>
            )}
          </div>

          {/* Boutons d'action (apparaissent au survol sur desktop) */}
          <div
            className={`flex space-x-2 ${isHovered ? "opacity-100" : "opacity-100 sm:opacity-0"} transition-opacity`}
          >
            {/* Sélecteur de quantité */}
            {stock > 0 && (
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    decreaseQuantity();
                  }}
                  className="p-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-2 text-sm">{quantity}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    increaseQuantity();
                  }}
                  className="p-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bouton Ajouter au panier */}
            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium flex items-center justify-center ${
                stock > 0
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              } transition-colors`}
            >
              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
              Ajouter
            </button>

            {/* Bouton Favoris */}
            <button
              onClick={handleAddToWishlist}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* Panneau d'informations supplémentaires (s'ouvre en cliquant sur "Plus d'infos") */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20 shadow-md transition-all transform ${
          showMore ? "translate-y-0" : "translate-y-full"
        }`}
        initial={{ translateY: "100%" }}
        animate={{ translateY: showMore ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          onClick={() => setShowMore(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h4 className="font-medium text-gray-800 mb-2">
          Informations supplémentaires
        </h4>

        <div className="space-y-2 text-sm">
          {/* Spécifications techniques */}
          {additionalInfo && Object.keys(additionalInfo).length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(additionalInfo).map(([key, value]) => (
                <div key={key} className="col-span-2 sm:col-span-1">
                  <span className="text-gray-500">{key}: </span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Aucune information supplémentaire disponible
            </p>
          )}

          {/* Catégories */}
          {categories && categories.length > 0 && (
            <div className="pt-2">
              <p className="text-gray-600 text-xs mb-1">Catégories:</p>
              <div className="flex flex-wrap gap-1">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Garantie/politique de retour si disponible */}
          <div className="flex items-start pt-2">
            <Shield className="w-4 h-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              Garantie de remboursement de 30 jours. Politique de retour sans
              complication.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bouton "Plus d'infos" */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowMore(!showMore);
        }}
        className="absolute bottom-0 left-0 right-0 text-xs flex items-center justify-center py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
      >
        {showMore ? (
          <>
            Moins d'infos
            <ArrowRight className="w-3 h-3 ml-1 transform rotate-90" />
          </>
        ) : (
          <>
            Plus d'infos
            <ArrowRight className="w-3 h-3 ml-1 transform -rotate-90" />
          </>
        )}
      </button>
    </motion.div>
  );
};

export default CardProduct;

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Info,
  Check,
  Award,
  HelpCircle,
  Download,
  Search,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const SellerGuidelinesPage = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [searchQuery, setSearchQuery] = useState("");

  // Fonctions d'aide pour le filtrage et la navigation
  const filterSection = (section) => {
    if (!searchQuery) return true;

    // Rechercher dans le titre et le contenu
    const titleMatch = section.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const contentMatch = section.content.some(
      (item) =>
        (typeof item === "string" &&
          item.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.text &&
          item.text.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    return titleMatch || contentMatch;
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Structure des sections de directives
  const guidelineSections = [
    {
      id: "intro",
      title: "Introduction",
      icon: <Info className="w-5 h-5" />,
      content: [
        "Bienvenue dans les directives pour vendeurs de MachePam. Ce document établit les règles et les bonnes pratiques pour assurer une expérience positive pour tous les utilisateurs de notre plateforme.",
        "En créant une boutique sur MachePam, vous acceptez de vous conformer à l'ensemble de ces directives. Le non-respect de ces règles peut entraîner la suspension temporaire ou permanente de votre boutique.",
      ],
    },
    {
      id: "eligibility",
      title: "Conditions d'éligibilité",
      icon: <Shield className="w-5 h-5" />,
      content: [
        "Pour devenir vendeur sur MachePam, vous devez remplir les conditions suivantes :",
        {
          type: "list",
          items: [
            "Être âgé d'au moins 18 ans",
            "Posséder une pièce d'identité valide",
            "Disposer d'un compte bancaire ou mobile money actif",
            "Résider dans un pays où MachePam opère",
            "Fournir des informations précises et véridiques",
          ],
        },
      ],
    },
    {
      id: "products",
      title: "Produits autorisés et interdits",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: [
        "MachePam se réserve le droit de refuser tout produit qui ne respecte pas nos politiques ou la législation en vigueur.",
        {
          type: "subsection",
          title: "Produits interdits",
          text: "Les catégories suivantes de produits sont strictement interdites sur notre plateforme :",
          items: [
            "Produits illégaux ou contrefaits",
            "Armes, munitions et explosifs",
            "Drogues et substances contrôlées",
            "Médicaments sur ordonnance",
            "Produits à caractère pornographique",
            "Animaux vivants",
            "Produits piratés (musique, films, logiciels)",
            "Produits volés",
            "Produits dangereux ou toxiques",
            "Services financiers non autorisés",
          ],
        },
        {
          type: "subsection",
          title: "Produits à restrictions",
          text: "Les produits suivants sont soumis à des restrictions et nécessitent une vérification supplémentaire :",
          items: [
            "Produits alimentaires (certification d'hygiène requise)",
            "Produits cosmétiques (liste d'ingrédients obligatoire)",
            "Produits pour enfants (conformité aux normes de sécurité)",
            "Appareils électroniques (certification requise)",
            "Produits d'occasion (état clairement indiqué)",
          ],
        },
      ],
    },
    {
      id: "listing",
      title: "Règles de référencement",
      icon: <Search className="w-5 h-5" />,
      content: [
        "Pour garantir une expérience optimale aux acheteurs, vos annonces doivent respecter les règles suivantes :",
        {
          type: "list",
          items: [
            "Décrire précisément les produits (dimensions, matériaux, fonctionnalités)",
            "Utiliser des images de haute qualité et représentatives du produit réel",
            "Indiquer clairement les prix, y compris les taxes applicables",
            "Mentionner les délais de livraison estimés",
            "Spécifier les conditions de retour et de remboursement",
            "Ne pas utiliser de mots-clés trompeurs ou sans rapport avec le produit",
          ],
        },
      ],
    },
    {
      id: "quality",
      title: "Standards de qualité",
      icon: <Award className="w-5 h-5" />,
      content: [
        "MachePam s'engage à offrir une expérience d'achat de qualité. En tant que vendeur, vous devez maintenir les standards suivants :",
        {
          type: "list",
          items: [
            "Expédier les produits dans les délais annoncés",
            "Assurer un emballage adéquat pour éviter les dommages",
            "Répondre aux messages des clients dans un délai de 24 heures",
            "Maintenir un taux de satisfaction client d'au moins 4.0/5",
            "Traiter les retours et remboursements conformément à votre politique",
            "Résoudre les litiges de manière professionnelle",
          ],
        },
      ],
    },
    {
      id: "fees",
      title: "Commissions et frais",
      icon: <Download className="w-5 h-5" />,
      content: [
        "MachePam applique les frais suivants sur les ventes réalisées via notre plateforme :",
        {
          type: "table",
          headers: ["Type de frais", "Montant", "Détails"],
          rows: [
            [
              "Commission standard",
              "8%",
              "Calculée sur le montant total de la vente, taxes incluses",
            ],
            [
              "Commission réduite",
              "5%",
              "Pour les vendeurs Premium ayant plus de 100 ventes par mois",
            ],
            [
              "Frais de traitement de paiement",
              "2.5% + $0.30",
              "Par transaction",
            ],
            [
              "Frais de mise en avant",
              "Variable",
              "Optionnel, pour promouvoir vos produits",
            ],
            [
              "Frais d'abonnement vendeur Premium",
              "$19.99/mois",
              "Optionnel, offre des avantages supplémentaires",
            ],
          ],
        },
        "Les paiements sont versés aux vendeurs tous les 14 jours, après déduction des commissions et frais applicables.",
      ],
    },
    {
      id: "intellectual",
      title: "Propriété intellectuelle",
      icon: <Shield className="w-5 h-5" />,
      content: [
        "La protection de la propriété intellectuelle est essentielle sur MachePam :",
        {
          type: "list",
          items: [
            "Vous devez être propriétaire des droits sur tous les produits que vous vendez",
            "Les marques déposées et droits d'auteur doivent être respectés",
            "Tout signalement de violation sera traité conformément à notre procédure de notification",
            "Les violations répétées entraîneront la suspension du compte vendeur",
            "MachePam se réserve le droit de retirer toute annonce suspecte sans préavis",
          ],
        },
      ],
    },
    {
      id: "shipping",
      title: "Expédition et livraison",
      icon: <Check className="w-5 h-5" />,
      content: [
        "Les vendeurs sont responsables de l'expédition des produits commandés :",
        {
          type: "list",
          items: [
            "Proposer des options d'expédition adaptées à vos produits",
            "Définir des zones géographiques de livraison précises",
            "Indiquer clairement les délais et coûts d'expédition",
            "Fournir un numéro de suivi pour toutes les commandes",
            "Expédier les produits dans un délai de 2 jours ouvrables après réception du paiement",
          ],
        },
        "MachePam recommande l'utilisation de nos partenaires logistiques pour bénéficier de tarifs préférentiels.",
      ],
    },
    {
      id: "account",
      title: "Gestion du compte",
      icon: <HelpCircle className="w-5 h-5" />,
      content: [
        "Pour maintenir un compte vendeur en bonne santé sur MachePam :",
        {
          type: "list",
          items: [
            "Mettre à jour régulièrement vos informations de profil",
            "Maintenir votre inventaire à jour pour éviter les ruptures de stock",
            "Consulter quotidiennement vos commandes et messages",
            "Surveiller vos évaluations et prendre en compte les retours clients",
            "Informer MachePam de toute indisponibilité temporaire",
            "Utiliser uniquement votre compte vendeur pour vos activités professionnelles",
          ],
        },
      ],
    },
    {
      id: "compliance",
      title: "Conformité légale",
      icon: <Shield className="w-5 h-5" />,
      content: [
        "En tant que vendeur, vous êtes tenu de respecter toutes les lois et réglementations applicables :",
        {
          type: "list",
          items: [
            "Collecter et déclarer les taxes appropriées selon votre juridiction",
            "Respecter les lois sur la protection des consommateurs",
            "Se conformer aux réglementations spécifiques à certains produits",
            "Protéger les données personnelles des clients",
            "Fournir des factures conformes aux exigences légales",
            "Disposer des licences et permis nécessaires à votre activité",
          ],
        },
      ],
    },
    {
      id: "sanctions",
      title: "Sanctions et pénalités",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: [
        "Le non-respect des présentes directives peut entraîner les mesures suivantes :",
        {
          type: "table",
          headers: ["Infraction", "Sanction possible"],
          rows: [
            ["Produits interdits", "Suppression de l'annonce et avertissement"],
            [
              "Informations trompeuses",
              "Modification obligatoire et réduction de visibilité",
            ],
            [
              "Retards d'expédition répétés",
              "Suspension temporaire des nouvelles ventes",
            ],
            [
              "Mauvaise qualité de service",
              "Rétrogradation dans les résultats de recherche",
            ],
            [
              "Violation de propriété intellectuelle",
              "Suppression des annonces concernées",
            ],
            [
              "Fraude ou activité illégale",
              "Suspension permanente et signalement aux autorités",
            ],
            [
              "Non-paiement des commissions",
              "Suspension du compte jusqu'à régularisation",
            ],
          ],
        },
        "MachePam se réserve le droit de modifier les sanctions en fonction de la gravité et de la fréquence des infractions.",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
  <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-semibold text-gray-800">
              Directives pour les vendeurs
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Ces règles et directives sont conçues pour assurer une expérience
              commerciale positive et équitable pour tous les utilisateurs de
              MachePam. Consultez-les régulièrement car elles peuvent être mises
              à jour.
            </p>
          </motion.div>

          {/* Barre de recherche */}
          <div className="mb-8">
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Rechercher dans les directives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Navigation latérale - version desktop */}
            <motion.div
              className="hidden lg:block w-64 shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="sticky top-24 bg-white/50 backdrop-blur-2xl rounded-xl p-4 border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3 px-3">
                  Table des matières
                </h3>
                <nav className="space-y-1">
                  {guidelineSections.filter(filterSection).map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-orange-50 text-orange-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      <span>{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Contenu principal */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Navigation de section - version mobile */}
              <div className="lg:hidden mb-6 overflow-x-auto">
                <div className="flex space-x-2 pb-3">
                  {guidelineSections.filter(filterSection).map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap flex-shrink-0 ${
                        activeSection === section.id
                          ? "bg-orange-50 text-orange-700 border border-orange-200"
                          : "text-gray-600 bg-white border border-gray-200"
                      }`}
                    >
                      <span className="mr-1.5">{section.icon}</span>
                      <span>{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sections de contenu */}
              <div className="space-y-10">
                {guidelineSections.filter(filterSection).map((section) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    className="bg-white/50 backdrop-blur-2xl rounded-xl p-6 border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                      <span className="mr-2 text-orange-500">
                        {section.icon}
                      </span>
                      {section.title}
                    </h2>

                    <div className="space-y-4 text-gray-600">
                      {section.content.map((item, idx) => {
                        if (typeof item === "string") {
                          return <p key={idx}>{item}</p>;
                        } else if (item.type === "list") {
                          return (
                            <ul key={idx} className="list-disc pl-5 space-y-1">
                              {item.items.map((listItem, listIdx) => (
                                <li key={listIdx}>{listItem}</li>
                              ))}
                            </ul>
                          );
                        } else if (item.type === "subsection") {
                          return (
                            <div
                              key={idx}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <h3 className="font-medium text-gray-700 mb-2">
                                {item.title}
                              </h3>
                              <p>{item.text}</p>
                              <ul className="list-disc pl-5 mt-2 space-y-1">
                                {item.items.map((listItem, listIdx) => (
                                  <li key={listIdx} className="text-gray-600">
                                    {listItem}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        } else if (item.type === "table") {
                          return (
                            <div key={idx} className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200 mt-2 table-auto">
                                <thead className="bg-gray-50">
                                  <tr>
                                    {item.headers.map((header, headerIdx) => (
                                      <th
                                        key={headerIdx}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {item.rows.map((row, rowIdx) => (
                                    <tr key={rowIdx}>
                                      {row.map((cell, cellIdx) => (
                                        <td
                                          key={cellIdx}
                                          className="px-6 py-4 whitespace-normal text-sm text-gray-500"
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </motion.section>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Section du bas - Mise à jour et contact */}
          <motion.div
            className="mt-12 bg-gray-100 rounded-xl p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-medium text-gray-800">
                  Dernière mise à jour : 1 Avril 2025
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Ces directives peuvent être mises à jour périodiquement.
                  Veuillez les consulter régulièrement.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                <a
                  href="/downloads/seller-guidelines.pdf"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg bg-white text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger en PDF
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg bg-orange-600 text-white hover:bg-orange-700 w-full sm:w-auto"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Contacter le support
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default SellerGuidelinesPage;

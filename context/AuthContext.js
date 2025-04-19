"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "./apiurl";
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/users/client/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchUserDetails(parsedUser._id); // Fetch complete user details

        if (parsedUser.role === "admin") {
          toast.info("Vous êtes connecté en tant qu'administrateur");
        }
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier, password) => {
    try {
      // const response = await fetch(`http://localhost:5000/api/auth/login`, {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          mot_de_passe: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Cas particulier: compte non vérifié
        if (data.needsVerification) {
          throw {
            isVerificationRequired: true,
            email: data.email,
            message: data.error,
          };
        }

        // Autres erreurs
        toast.error(data.error || "Échec de la connexion");
        throw new Error(data.error || "Échec de la connexion");
      }

      const userData = {
        ...data.user,
        email: data.user.email || "",
        role: data.user.role || "",
      };

      if (userData.role === "admin") {
        toast.info("La connexion administrateur n'est pas autorisée ici.");
        throw new Error("La connexion administrateur n'est pas autorisée");
      }

      toast.success("Connexion réussie!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Erreur de connexion:", error);

      // Renvoyer l'erreur spéciale pour la gestion dans le composant de login
      if (error.isVerificationRequired) {
        throw error; // Le composant pourra rediriger vers la page de vérification
      }

      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Vous avez été déconnecté");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};

"use client";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  message: string;
  username: string;
  token: string;
  // e
}

interface AuthContextProps {
  user: User | null;
  login: (user: string, passwd: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const [user, setUser] = useState<User | null>(() => {
  //   const savedUser = localStorage.getItem("userdsaasd");
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      // Vérifie si on est côté client
      const savedUser = localStorage.getItem("userdsaasd");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null; // Retourne `null` par défaut côté serveur
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();

  const login = async (user: string, passwd: string) => {
    setIsLoading(false);
    try {
      const res = await fetch(
        `https://royalcargo225.com:9001/api/v01/adminlog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ user, passwd }),
        }
      );

      if (!res.ok) {
        console.log("error c est produitesss");
      } else {
        const data: User = await res.json();
        setUser(data);
        localStorage.setItem("userdsaasd", JSON.stringify(data));
        navigate.push("/dashboard");
      }
    } catch (err) {
      console.log(err, "une erreur c est produit");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userdsaasd");
    navigate.push("/admin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used whithim an Auth Provider");
  }

  return context;
};

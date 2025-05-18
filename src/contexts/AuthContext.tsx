
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";
import { mockUsers } from '@/data/mockData';

// Types
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user session
    const storedUser = localStorage.getItem('nfcCardManagerUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('nfcCardManagerUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with mock data
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user exists in mock data (password check would be done by backend)
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      // In a real app, we would verify the password with the backend
      // For demo purposes, we're just checking if the user exists
      setUser(foundUser);
      localStorage.setItem('nfcCardManagerUser', JSON.stringify(foundUser));
      setIsLoading(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue " + foundUser.name,
      });
      return true;
    } else {
      setIsLoading(false);
      toast({
        title: "Échec de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole = 'user'): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    const userExists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userExists) {
      setIsLoading(false);
      toast({
        title: "Échec de l'inscription",
        description: "Un utilisateur avec cet email existe déjà",
        variant: "destructive",
      });
      return false;
    }

    // Create new user (in a real app, this would be done on the backend)
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
    };

    // In a real app, we would send this to the backend
    // For demo purposes, we're just setting the user in state
    setUser(newUser);
    localStorage.setItem('nfcCardManagerUser', JSON.stringify(newUser));
    setIsLoading(false);
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nfcCardManagerUser');
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

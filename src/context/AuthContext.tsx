import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with a default value of `null`
export const AuthContext = createContext<AuthContextType | null>(null);

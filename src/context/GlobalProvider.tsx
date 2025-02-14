import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { FavoritesProvider } from "./FavoritesContext";

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <AuthProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </AuthProvider>
  );
};

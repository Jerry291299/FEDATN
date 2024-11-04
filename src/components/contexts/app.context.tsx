import { createContext, useState } from "react";

type User = {
  email: string; // Change this to match your API response
  role: string;  // Add this to match your API response
};

type AppContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;

  user: User | null; // Change to User or null
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Change to User or null
};

const initialAppContext: AppContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  user: null, // Change to null
  setUser: () => {},
};

export const AppContext = createContext<AppContextType>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  );
  const [user, setUser] = useState<User | null>(null); // Change to User or null
  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

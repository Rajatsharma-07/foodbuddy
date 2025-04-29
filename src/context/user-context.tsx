import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { TOKEN_KEY } from "../utils/constants/constants";
import { JwtUserPayload } from "../@types/users/user";

type UserContextType = {
  user: JwtUserPayload | null;
  isLoading: boolean;
  updateUser: () => void; // Manually trigger a user state update
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  updateUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [state, setState] = useState<UserContextType>({
    user: null,
    isLoading: true,
    updateUser: () => {}, // Temporary placeholder
  });

  // Memoize the update function to avoid unnecessary re-renders
  const updateUser = useCallback(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        const decoded = jwtDecode<JwtUserPayload>(token);
        setState({ user: decoded, isLoading: false, updateUser });
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem(TOKEN_KEY);
        setState({ user: null, isLoading: false, updateUser });
      }
    } else {
      setState({ user: null, isLoading: false, updateUser });
    }
  }, []);

  // Initial load + listen for storage changes (cross-tab)
  useEffect(() => {
    // Check on mount
    updateUser();

    // Listen for storage events (e.g., login/logout in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY) {
        updateUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [updateUser]);

  return (
    <UserContext.Provider value={{ ...state, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
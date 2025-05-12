import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { JwtUserPayload } from "../@types/users/user";
import { ADMIN_TOKEN_KEY, TOKEN_KEY } from "../utils/constants/constants";

type AdminUserContextType = {
  adminUser: JwtUserPayload | null;
  isLoading: boolean;
  updateAdminUser: () => void; // Add manual update capability
};

const AdminUserContext = createContext<AdminUserContextType>({
  adminUser: null,
  isLoading: true,
  updateAdminUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AdminUserProvider = ({ children }: Props) => {
  const [state, setState] = useState<
    Omit<AdminUserContextType, "updateAdminUser">
  >({
    adminUser: null,
    isLoading: true,
  });

  // Memoized update function
  const updateAdminUser = useCallback(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      try {
        const decoded = jwtDecode<JwtUserPayload>(token);
        setState({ adminUser: decoded, isLoading: false });
      } catch (error) {
        console.error("Error decoding admin token:", error);
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setState({ adminUser: null, isLoading: false });
      }
    } else {
      setState({ adminUser: null, isLoading: false });
    }
  }, []);

  // Initial load + storage event listener
  useEffect(() => {
    // Initial check
    updateAdminUser();

    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ADMIN_TOKEN_KEY) {
        updateAdminUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [updateAdminUser]);

  return (
    <AdminUserContext.Provider value={{ ...state, updateAdminUser }}>
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (context === undefined) {
    throw new Error("useAdminUser must be used within a AdminUserProvider");
  }
  return context;
};

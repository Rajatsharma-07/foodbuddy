// admin-user-context.tsx
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { JwtUserPayload } from "../@types/users/user";
import { ADMIN_TOKEN_KEY, TOKEN_KEY } from "../utils/constants/constants";

type AdminUserContextType = {
  adminUser: JwtUserPayload | null;
  isLoading: boolean;
};

const AdminUserContext = createContext<AdminUserContextType>({
  adminUser: null,
  isLoading: true,
});

type Props = {
  children: React.ReactNode;
};

export const AdminUserProvider = ({ children }: Props) => {
  const [state, setState] = useState<AdminUserContextType>({
    adminUser: null,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      try {
        const decoded = jwtDecode<JwtUserPayload>(token);
        setState({ adminUser: decoded, isLoading: false });
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setState({ adminUser: null, isLoading: false });
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  return <AdminUserContext.Provider value={state}>{children}</AdminUserContext.Provider>;
};

export const useAdminUser = () => {
  const context = useContext(AdminUserContext);
  if (context === undefined) {
    throw new Error("useAdminUser must be used within a AdminUserProvider");
  }
  return context;
};

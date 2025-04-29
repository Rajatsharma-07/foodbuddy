// user-context.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { TOKEN_KEY } from "../utils/constants/constants";
import { JwtUserPayload } from "../@types/users/user";

type UserContextType = {
  user: JwtUserPayload | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [state, setState] = useState<UserContextType>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        const decoded = jwtDecode<JwtUserPayload>(token);
        setState({ user: decoded, isLoading: false });
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem(TOKEN_KEY);
        setState({ user: null, isLoading: false });
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

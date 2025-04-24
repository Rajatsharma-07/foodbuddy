import { useEffect } from "react";
import Router from "./routes";
import { ADMIN_TOKEN_KEY } from "./utils/constants/constants";
import { setSession } from "./utils/api/axios";

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      setSession(token); // Reattach token to axios instance
    }
  }, [])
  return (
      <Router />
  );
};

export default App;

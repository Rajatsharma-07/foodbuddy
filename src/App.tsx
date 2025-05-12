import { useEffect } from "react";
import Router from "./routes";
import { ADMIN_TOKEN_KEY, TOKEN_KEY } from "./utils/constants/constants";
import { setAdminSession } from "./utils/api/admin_axios";
import { setSession } from "./utils/api/axios";

const App = () => {
  useEffect(() => {
    const adminToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      setSession(token);
    }
    if (adminToken) {
      setAdminSession(adminToken);
    }
  }, []);
  return <Router />;
};

export default App;

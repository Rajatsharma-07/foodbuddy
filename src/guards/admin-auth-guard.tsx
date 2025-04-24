import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Spin } from "antd"; // <-- Import Spin from AntD
import { PATH_AUTH } from "../routes/paths";
import { ADMIN_TOKEN_KEY } from "../utils/constants/constants";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AdminAuthGuard({ children }: AuthGuardProps) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    setAuthenticated(!!token); // sets to true or false
  }, []);

  // Show AntD Spinner while loading
  if (authenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to={PATH_AUTH.adminLogin} replace />;
  }

  return <>{children}</>;
}

import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Spin } from "antd";
import { PATH_AUTH } from "../routes/paths";
import { TOKEN_KEY } from "../utils/constants/constants";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
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
    return <Navigate to={PATH_AUTH.login} replace />;
  }

  return <>{children}</>;
}

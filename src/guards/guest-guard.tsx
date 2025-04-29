import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { TOKEN_KEY } from "../utils/constants/constants";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(!localStorage.getItem(TOKEN_KEY) ? false : true);
  }, []);

  const check = useCallback(() => {
    if (authenticated) {
      navigate(PATHS.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  //UseEffects
  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

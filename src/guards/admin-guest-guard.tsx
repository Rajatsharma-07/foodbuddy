import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../routes/paths";
import { ADMIN_TOKEN_KEY } from "../utils/constants/constants";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AdminGuestGuard({ children }: Props) {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(!localStorage.getItem(ADMIN_TOKEN_KEY) ? false : true);
  }, []);

  const check = useCallback(() => {
    if (authenticated) {
      navigate(PATH_ADMIN.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  //UseEffects
  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

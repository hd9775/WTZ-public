import { ReactElement, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ForbiddenAuth from "../pages/ForbiddenAuth";
import { useAccessTokenState } from "../context/accessTokenContext";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";

interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  requireAuth: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반드시 안해야만 접속 가능
}

export function PrivateRoute({ requireAuth }: PrivateRouteProps): React.ReactElement | null {
  const { accessToken } = useAccessTokenState();
  useFetchAccessToken();
  const [routeEle, setRouteEle] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (requireAuth) {
      setRouteEle(accessToken ? <Outlet /> : <ForbiddenAuth />);
    } else {
      setRouteEle(accessToken ? <ForbiddenAuth /> : <Outlet />);
    }
  }, [accessToken, requireAuth]);

  return routeEle;
}

export default PrivateRoute;

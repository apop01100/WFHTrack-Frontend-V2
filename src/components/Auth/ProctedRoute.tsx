import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API_ME } from "../../constants/URL_API";

interface ProtectedRouteResponse {
  id: number;
  username: string;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { error, fetchData } = useFetch<ProtectedRouteResponse>(API_ME, "GET");

  useEffect(() => {
    const checkAuth = async () => {
      if (location.pathname === "/login/user" || location.pathname === "/login/admin") {
        return;
      }

      await fetchData();

      if (error) {
        navigate("/login/user");
        return;
      }
    };

    checkAuth();
  }, [location.pathname]);

  return <>{children}</>;
};

export default ProtectedRoute;

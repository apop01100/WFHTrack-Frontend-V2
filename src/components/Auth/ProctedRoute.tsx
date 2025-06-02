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

  const {
    data,
    error,
    loading,
    fetchData,
  } = useFetch<ProtectedRouteResponse>(API_ME, "GET");

  useEffect(() => {
    // Skip auth check on login pages
    if (location.pathname === "/login/user" || location.pathname === "/login/admin") return;

    fetchData();
  }, [location.pathname]);

  useEffect(() => {
    // If error is set (unauthorized), redirect
    if (error) {
      navigate("/login/user", { replace: true });
    }
  }, [error]);

  // Loading or still waiting for user data
  if (loading && !data) {
    return <div className="text-center text-neutral-800 py-4">Checking authentication...</div>;
  }

  // If no data and error is set, block rendering
  if (!data) return null;

  return <>{children}</>;
};

export default ProtectedRoute;

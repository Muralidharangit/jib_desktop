import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Auth/AuthContext";
import routes from "../Components/routes/route";

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  // Wait until authentication check is complete
  if (isLoading) return null; // ✅ Prevents checking before auth state is ready

  return user && user.token ? <Outlet /> : <Navigate to={routes.home} />;
};

export default ProtectedRoute;

import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

const RouteTracker = ({ children }) => {
  const location = useLocation();
  const { fetchUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("🔄 Route changed, verifying token...");
      fetchUser(token); // ✅ Will now work on each route change
    }
  }, [location.pathname, fetchUser]); // ✅ include fetchUser too

  return <>{children}</>;
};

export default RouteTracker;

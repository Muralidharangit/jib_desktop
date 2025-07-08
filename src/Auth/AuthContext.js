import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import BASE_URL from "../API/api";
import routes from "../Components/routes/route";
import { getAuthType } from "../API/authAPI";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authType, setAuthType] = useState(null);
  const [portalSettings, setPortalSettings] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [portalStatus, setPortalStatus] = useState("loading");
  const [portalErrorMsg, setPortalErrorMsg] = useState("");

  const location = useLocation();
  const firstLoadRef = useRef(true);

  // ✅ Step 1: fetchUser defined before usage
  const fetchUser = useCallback(async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/player/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data.type === "valid") {
        const { user, portal_settings } = response.data;
        setUser({ token, ...user });
        setProfile(user);
        setPortalSettings(portal_settings);
        await fetchAuthType();

        const profileRes = await axios.get(`${BASE_URL}/player/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAvatar(profileRes.data.player);
      } else if (response.data?.type === "player_inactive") {
        console.warn("Player is inactive. Logging out...");
        localStorage.removeItem("token");
        setUser(null);
        setAvatar(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Step 2: initApp for first load
  useEffect(() => {
    const initApp = async () => {
      await fetchPortalStatus();

      const token = localStorage.getItem("token");
      if (token) {
        await fetchUser(token);
      } else {
        setIsLoading(false);
      }
    };
    initApp();
  }, [fetchUser]);

  // ✅ Step 3: re-check token on every route change (but skip first load)
  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, [location.pathname]);

  const fetchAuthType = async () => {
    try {
      const res = await getAuthType();
      setAuthType(res);
    } catch (error) {
      console.error("Failed to fetch auth type", error);
    }
  };

  const fetchPortalStatus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/portal-info`);
      if (res?.data?.status_code === 403) {
        setPortalStatus("forbidden");
        setPortalErrorMsg(res?.data?.msg || "Access denied.");
      } else {
        setPortalStatus("active");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setPortalStatus("forbidden");
        setPortalErrorMsg("Portal API access forbidden.");
      } else {
        console.error("Failed to fetch portal info", error);
        setPortalStatus("active");
      }
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    fetchUser(token);
  };

  const logout = async (navigate) => {
    try {
      const token = user?.token;
      if (!token) {
        console.warn("No token found, user already logged out.");
        return;
      }

      await axios.post(
        `${BASE_URL}/player/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setAvatar(null);
      if (navigate) navigate(routes.home);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        authType,
        portalSettings,
        avatar,
        setAvatar,
        setProfile,
        login,
        logout,
        fetchAuthType,
        fetchUser,
        portalStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../routes/route";
import AuthContext from "../../../Auth/AuthContext";
import { verifyToken } from "../../../API/authAPI";
import { toast, ToastContainer } from "react-toastify";
import { Images } from "./constants/images";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const StickyHeader = () => {
  const { user, profile, avatar, portalSettings } = useContext(AuthContext); // ✅ Get user authentication state
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  // console.log("portalSettings", portalSettings);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log(profile, "user in header");

  const handleDepositClick = async () => {
    try {
      const res = await verifyToken();

      if (res?.type === "valid" && portalSettings?.auto_deposit === 1) {
        navigate(routes.transactions.deposit); // ✅ Go to deposit
      } else if (res?.type === "valid" && portalSettings?.auto_deposit !== 1) {
        toast.error(
          "Deposits are temporarily unavailable. Please reach out to the support team.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        // ❌ Session expired
        toast.error("Session expired. Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
        });

        // Clear token + optional context reset
        localStorage.removeItem("token");
        // setUser(null); // ✅ Uncomment if you use context state

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error("Token validation failed:", err);

      toast.error("Please login again.", {
        position: "top-right",
        autoClose: 3000,
      });

      localStorage.removeItem("token");
      // setUser(null); // ✅ Uncomment if needed

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleProfileClick = async () => {
    try {
      const res = await verifyToken();

      if (res?.type === "valid") {
        navigate(routes.account.dashboard); // ✅ Redirect to dashboard
      } else {
        toast.error("Session expired. Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
        });

        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error("Token validation failed:", err);

      toast.error("Please login again.", {
        position: "top-right",
        autoClose: 3000,
      });

      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
<SkeletonTheme baseColor="#313131" highlightColor="#525252">
  <>
    <ToastContainer position="top-right" autoClose={5000} theme="dark" />
    <header
      className={`bgbody-color page-header container p-0 ${
        isSticky ? "is-sticky" : ""
      }`}
    >
      <nav className="navbar p-1">
        <div className="container-fluid p-0">
          <div className="d-flex justify-content-between w-100 align-items-center">
            {/* Logo */}
            <div className="logo_brand">
              {Images?.Favlogo ? (
                <Link className="navbar-brand m-0 position-relative" to={routes.home}>
                  <img src={Images.Favlogo} alt="favicon" width="65%" />
                  <Link
                    to={routes.pages.testinginfo}
                    style={{
                      position: "absolute",
                      top: "11px",
                      left: "4px",
                      backgroundColor: "rgb(228 6 59)",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "0px",
                      fontWeight: "bold",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      zIndex: 9999,
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "auto",
                    }}
                  >
                    Testing app
                  </Link>
                </Link>
              ) : (
                <Skeleton height={40} width={120} />
              )}
            </div>

            {/* If Logged In */}
            {user ? (
              <div className="d-flex justify-content-center align-items-center mx-2">
                {/* Coin Box */}
                {profile ? (
                  <div className="coin-box d-flex align-items-center px-2 py-1 rounded-pill">
                    <img src="assets/img/rupee.png" width="20" alt="Coin" />
                    <span className="ms-1 text-white">
                      ₹ {Number(profile?.chips).toFixed(2)}
                    </span>
                    <button
                      className="btn btn-sm btn-add-coin ms-2"
                      onClick={handleDepositClick}
                    >
                      <i className="fa-solid fa-plus fs-12"></i>
                    </button>
                  </div>
                ) : (
                  <Skeleton height={32} width={120} borderRadius={30} />
                )}

                {/* Avatar */}
                <div className="user-icon ms-2" onClick={handleProfileClick}>
                  {avatar?.avatar?.image ? (
                    <img
                      src={avatar.avatar.image}
                      alt={avatar.avatar.name || "Profile"}
                      className="w-100"
                      style={{ borderRadius: "10%" }}
                    />
                  ) : (
                    <Skeleton circle height={36} width={36} />
                  )}
                </div>
              </div>
            ) : (
              // If Not Logged In
              <div className="d-flex">
                <Link to={routes.auth.login}>
                  <button
                    type="button"
                    className="btn btn-index w-100 bgbody-color"
                  >
                    Log in
                  </button>
                </Link>
                <Link to={routes.auth.register}>
                  <button type="button" className="btn btn-index w-100">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  </>
</SkeletonTheme>

  );
};
export default StickyHeader;

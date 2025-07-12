import React, { useEffect, useRef, useState } from "react";
import Footer from "../footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import StickyHeader from "./Header";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../API/api";
import { Images } from "./constants/images";
import routes from "../../routes/route";
import Sidebar from "./Sidebar";

const FilteredProviderGamesPage = () => {
  const [games, setGames] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);
  const [showFullScreenGame, setShowFullScreenGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLaunchingGame, setIsLaunchingGame] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const iframeRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Fetch games when URL changes (provider param)
  useEffect(() => {
    const provider = searchParams.get("provider");
    if (provider) {
      setFilterType(provider);
      fetchFilteredGames(provider);
    }
  }, [searchParams]);

  // ✅ Fetch games using provider filter
  const fetchFilteredGames = async (provider) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/all-games?is_mobile=1`, {
        params: { provider },
      });
      setGames(response.data.allGames);
    } catch (error) {
      console.error("Error fetching filtered games:", error);
      toast.error("Something went wrong while filtering games.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle game click
  const handleGameClick = async (game) => {
    if (!game.provider || !game.name || !game.uuid) {
      toast.error("Missing game info.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setIsLaunchingGame(true);

      const response = await axios.get(
        `${BASE_URL}/player/${game.provider}/launch/${encodeURIComponent(
          game.name
        )}/${game.uuid}`,
        {
          params: {
            return_url: `${window.location.origin}/all-games?is_mobile=1`,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const gameUrl = response.data?.game?.gameUrl || response.data?.game_url;
      if (gameUrl) {
        // Store current location so user can return later
        sessionStorage.setItem("prevPage", location.pathname + location.search);

        // Push a new state so back button will return here
        window.history.pushState(
          { isGameOpen: true },
          "",
          window.location.href
        );

        setSelectedGameUrl(gameUrl);
        setShowFullScreenGame(true);
      } else {
        toast.error("Failed to get game URL.");
      }
    } catch (error) {
      setIsLaunchingGame(false);
      const errMsg = error.response?.data?.message;
      if (errMsg === "Unauthenticated." || error.response?.status === 401) {
        toast.error("Please login to jump into the Game World! 🎮🚀");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }
      console.error("Error launching game:", error);
      toast.error("Game launch failed. Try again later.");
    }
  };
  useEffect(() => {
    const handlePopState = () => {
      if (showFullScreenGame) {
        setShowFullScreenGame(false);
        setSelectedGameUrl(null);
        setIsLaunchingGame(false); // ✅ Hide loader when going back

        // Navigate back to saved page (optional)
        const prevPage = sessionStorage.getItem("prevPage");
        if (prevPage) {
          navigate(prevPage);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showFullScreenGame, navigate]);

  // ✅ Auto-close iframe when removed
  useEffect(() => {
    let interval;
    if (showFullScreenGame && selectedGameUrl) {
      interval = setInterval(() => {
        const frame = iframeRef.current;
        if (!document.body.contains(frame)) {
          setShowFullScreenGame(false);
          setSelectedGameUrl(null);
          if (filterType) fetchFilteredGames(filterType);
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showFullScreenGame, selectedGameUrl, filterType]);

  return (
    <>
      {isLaunchingGame && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <div className="spinner-border text-light me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Launching game, please wait...
        </div>
      )}

      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      {/* header  */}
      <StickyHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* header end */}

      <div className="container-fluid page-body-wrapper">
        {/* Sidebar Nav Starts */}
        <Sidebar />
        {/* Sidebar Nav Ends */}
        {/* 🔍 Search Bar */}

        <div className="main-panel">
          <div className="content-wrapper">
            <div className="max-1250 mx-auto">
              <div className="game-list px-1 container">
                <h5 className="text-white text-capitalize my-2">
                  {filterType ? `${filterType} Games` : "Games"}
                </h5>

                <div className="">
                  <div className="row">
                    {loading ? (
                      <p className="text-white text-center">
                        🎮 Loading games...
                      </p>
                    ) : games.length > 0 ? (
                      // .filter((game) => game.image)
                      games.map((game) => (
                        <div
                          className="col-md-4 col-sm-4 col-6 px-1 col-custom-3"
                          key={game.uuid}
                        >
                          <div
                            className="game-card-wrapper rounded-2 new-cardclr mt-2 hover-group"
                            onClick={() => handleGameClick(game)}
                          >
                            <div className="game-card position-relative p-0 m-0 overflow-hidden">
                              <img
                                src={
                                  game.image && game.image !== ""
                                    ? game.image
                                    : "assets/img/play_now.png"
                                }
                                className="w-100 m-0"
                                alt={game.name}
                              />

                              {/* <h3>{game.name}</h3> */}
                              {/* <div className="d-flex flex-column text-white text-center py-2 px-1">
                          <span className="fs-12 fw-bold text-truncate">
                            {game.name}
                          </span>
                        </div> */}
                            </div>
                            <div className="btn-play position-absolute top-50 start-50 translate-middle">
                              <i className="fa-solid fa-play"></i>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="d-flex flex-column align-items-center mt-5">
                        <img
                          src="assets/img/notification/img_2.png"
                          alt="unauth"
                          className="w-75"
                        />
                        <p className="text-white text-center">
                          No games available.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {showFullScreenGame && selectedGameUrl && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "#000",
                  zIndex: 9999,
                }}
              >
                {/* <nav className="navbar px-2">
            <div className="container-fluid p-0">
              <div className="d-flex justify-content-between w-100 align-items-center">

                <div className="d-flex align-items-center">
                  <button
                    className="btn text-white p-0 me-2"
                    onClick={() => {
                      setShowFullScreenGame(false);
                      setSelectedGameUrl(null);
                      navigate("/all-games?is_mobile=1");
                    }}
                  >
                    <i className="fa-solid fa-arrow-left fs-5"></i>
                  </button>
                </div>
                <div
                  className="text-center"
                  style={{ position: "absolute", left: 0, right: 0 }}
                >
                  <div
                    className="navbar-brand m-0 w-100"
                    role="button"
                    onClick={() => navigate(-1)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={Images.Favlogo}
                      alt="favicon"
                      width="100"
                      className="mx-auto "
                    />
                  </div>
                </div>
                <div style={{ width: "35px" }}></div>
              </div>
            </div>
          </nav> */}
                <iframe
                  ref={iframeRef}
                  src={selectedGameUrl}
                  title="Game"
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allowFullScreen
                />
              </div>
            )}
            <div className="" style={{ marginTop: "100px" }}></div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilteredProviderGamesPage;

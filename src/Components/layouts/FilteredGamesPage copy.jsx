import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../API/api";
import { toast, ToastContainer } from "react-toastify";
import StickyHeader from "./Header/Header";
import Footer from "./footer/Footer";

const FilteredGamesPage = () => {
  const [games, setGames] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);
  const [showFullScreenGame, setShowFullScreenGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLaunchingGame, setIsLaunchingGame] = useState(false);
  const iframeRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchFilteredGames = async (type) => {
    // console.log(type);

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/filter-games`, {
        params: { type },
      });
      setGames(response.data.games);
    } catch (error) {
      console.error("Error fetching filtered games:", error);
      toast.error("Something went wrong while filtering games.");
    } finally {
      setLoading(false);
    }
  };

  // When URL ?type changes
  useEffect(() => {
    const type = searchParams.get("type");
    // console.log("🔍 Filter type:", type);
    if (type) {
      setFilterType(type);
      fetchFilteredGames(type);
    }
  }, [searchParams]);

  // Detect iframe closed
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

  const handleGameClick = async (game) => {
    if (!game.provider || !game.name || !game.uuid) {
      toast.error("Missing game info.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      setIsLaunchingGame(true); // ✅ Show loading screen
      const response = await axios.get(
        `${BASE_URL}/player/${game.provider}/launch/${encodeURIComponent(
          game.name
        )}/${game.uuid}`,
        {
          params: {
            return_url: `${window.location.origin}/filtered-games?type=${filterType}`,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const gameUrl = response.data?.game?.gameUrl || response.data?.game_url;
      if (gameUrl) {
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
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
      }
      console.error("Error launching game:", error);
      toast.error("Game launch failed. Try again later.");
    }
  };

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
      <StickyHeader />

      <div className="game-list px-3">
        <h5 className="text-white text-capitalize my-2">
          {filterType ? `${filterType} Games` : "Games"}
        </h5>

        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <div className="row">
            {loading ? (
              <p className="text-white text-center">🎮 Loading games...</p>
            ) : games.length > 0 ? (
              games
                .filter((game) => game.image)
                .map((game) => (
                  <div className="col-md-4 col-sm-4 col-4 px-1" key={game.uuid}>
                    <div className="game-card-wrapper rounded-2 new-cardclr mt-2">
                      <div className="game-card p-0 m-0 p-1">
                        <img
                          src={game.image}
                          className="game-card-img"
                          alt={game.name}
                        />
                        <div className="d-flex flex-column text-white text-center py-2 px-1">
                          <span className="fs-12 fw-bold text-truncate">
                            {game.name}
                          </span>
                        </div>
                      </div>
                      <div className="game-play-button d-flex flex-column">
                        <div
                          className="btn-play"
                          onClick={() => handleGameClick(game)}
                        >
                          <i className="fa-solid fa-play"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <>
                <div className="d-flex flex-column align-items-center mt-5">
                  <img
                    src="assets/img/notification/img_2.png"
                    alt="unauth"
                    className="w-75"
                  />
                  <p className="text-white text-center">No games available.</p>
                </div>
              </>
            )}
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
          <iframe
            ref={iframeRef}
            src={selectedGameUrl}
            title="Game"
            style={{ width: "100%", height: "100%", border: "none" }}
            allowFullScreen
          />
        </div>
      )}

      <Footer />
    </>
  );
};

export default FilteredGamesPage;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { manualAllGames } from "../../API/manualGames";

const AllGamesSearch = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames(page);
    // 🟣 DON'T call any other fetch function here
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 300 >=
          document.documentElement.scrollHeight &&
        hasMore &&
        !isFetching
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isFetching]);

  const fetchGames = async (pageNo) => {
    if (isFetching || !hasMore) return;

    try {
      setIsFetching(true);
      const response = await axiosInstance.get(
        `/all-games?is_mobile=1&page=${pageNo}`
      );
      let newGames = response.data.allGames || [];

      // ✅ Add manual games only on page 1
      if (pageNo === 1) {
        newGames = [...manualAllGames, ...newGames];
      }

      const combinedGames = [...games, ...newGames];

      // ✅ Remove duplicates by uuid
      const uniqueGames = Array.from(
        new Map(combinedGames.map((game) => [game.uuid, game])).values()
      );

      setGames(uniqueGames);
      const totalPages = response.data.pagination?.total_page || 1;
      setHasMore(pageNo < totalPages);
    } catch (error) {
      console.error("Error fetching games:", error);
      toast.error("Failed to load games.");
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  };

  const handleGameClick = async (game) => {
    const token = localStorage.getItem("token");

    if (!game.provider || !game.name || !game.uuid) {
      toast.error("Missing game data.");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/player/${game.provider}/launch/${encodeURIComponent(game.name)}/${
          game.uuid
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            return_url: `${window.location.origin}/all-games?is_mobile=1`,
          },
        }
      );

      const gameUrl = response?.data?.game?.gameUrl || response?.data?.game_url;
      if (gameUrl) {
        window.open(gameUrl, "_blank");
      } else {
        toast.error("Game URL not found.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to launch the game.");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        console.error("Launch error:", error);
        toast.error("Failed to launch game.");
      }
    }
  };

  return (
    <>
      <div className="container mt-4">
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <h4 className="text-white">All Games</h4>

        {loading && page === 1 ? (
          <p className="text-white">🎮 Loading games...</p>
        ) : games.length > 0 ? (
          <>
            <div className="row">
              {games.map((game, index) => (
                <motion.div
                  className="col-md-4 col-sm-4 col-4 px-1"
                  key={game.uuid || game.name + index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  // transition={{ duration: 0.4, delay: index * 0.02 }}
                  transition={{ duration: 0.3, delay: index * 0.002 }}
                >
                  <div className="game-card-wrapper rounded-2 new-cardclr mt-2">
                    <div className="game-card p-0 m-0">
                      <img
                        src={game.image || "/assets/img/placeholder.png"}
                        className="game-card-img"
                        alt={game.name}
                      />
                      {/* <div className="d-flex flex-column text-white text-center py-2 px-1">
                      <span className="fs-12 fw-bold text-truncate">
                        {game.name}
                      </span>
                    </div> */}
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
                </motion.div>
              ))}
            </div>
            {isFetching && (
              <p className="text-white text-center mt-3">
                Loading more games...
              </p>
            )}
          </>
        ) : (
          <p className="text-white text-center">No games found.</p>
        )}
      </div>
    </>
  );
};

export default AllGamesSearch;

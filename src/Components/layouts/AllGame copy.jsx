import { useState, useEffect, useRef } from "react";
import axios from "axios";
import BASE_URL from "../../API/api";
import StickyHeader from "./Header/Header";
import Footer from "./footer/Footer";
// import BottomFooter from "./footer/BottomFooter";
// import { verifyToken } from "../../API/authAPI";
// import AuthContext from "../../Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Import motion

const AllGame = () => {
  const [types, setTypes] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [showFullScreenGame, setShowFullScreenGame] = useState(false);
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);
  const [isLaunchingGame, setIsLaunchingGame] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const iframeRef = useRef(null);

  const scrollRef = useRef(null);
  // const { user } = useContext(AuthContext);
  // const token = user?.token;

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);

  // Fetch Providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/types-list`);
        const data = await response.json();
        setTypes(data.types || []);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    // fetchProviders();
    // fetchAllGames();
    Promise.all([fetchProviders(), fetchAllGames()]);
  }, []);

  // Fetch All Games
  const fetchAllGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/all-games?is_mobile=1`);
      const data = await response.json();

      // await verifyToken(token); // Verify token (optional usage)

      setGames(data.allGames || []);
    } catch (error) {
      console.error("Error fetching all games:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Filtered Games
  const fetchFilteredGames = async (type) => {
    setSelectedType(type);
    if (type === "all") {
      fetchAllGames();
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/all-games?is_mobile=1&type=${encodeURIComponent(type)}`
      );
      const data = await response.json();
      setGames(data.allGames || []);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Game Click
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

  // Search Filter
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Drag Scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with:
    const fixedSearchTerm = searchTerm; // ✅ User input

    try {
      // const [res1, res2] = await Promise.all([
      //   axios.get(`${BASE_URL}/all-games?search=${fixedSearchTerm}`),
      //   axios.get(`${BASE_URL}/all-games?provider=${fixedSearchTerm}`),
      // ]);
      const filtered = games.filter(
        (game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Combine or handle results as needed
      // const combinedResults = [...res1.data, ...res2.data];
      setSearchResults(filtered);
    } catch (error) {
      console.error("Error fetching game data:", error);
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

      <div className="container">
        {showFullScreenGame && selectedGameUrl ? (
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
        ) : (
          <>
            {/* Search Box */}
            <div className="search_container_box">
              {/* <form className="form my-2">
                <button type="submit">
                  <i className="ri-search-2-line fs-18" />
                </button>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="my-3 input"
                />
                <button className="reset" type="reset"></button>
              </form> */}

              <form className="form my-2" onSubmit={handleSubmit}>
                <button type="submit">
                  <i className="ri-search-2-line fs-18" />
                </button>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="my-3 input"
                />
                <button
                  className="reset"
                  type="reset"
                  onClick={() => setSearchResults([])}
                ></button>
              </form>
            </div>

            {/* Optional: Display Results */}
            <div>
              {displayGames.length > 0 ? (
                displayGames.map((game, index) => (
                  <div key={index}>{game.name}</div>
                ))
              ) : (
                <p>No results</p>
              )}
            </div>

            {/* Game Types Scroll */}
            <div
              ref={scrollRef}
              className="scroll-hide overflow-x-auto mt-2"
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                overflowX: "auto",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              onMouseUp={handleMouseUp}
            >
              <ul className="nav my-2 bonus_filter d-flex flex-nowrap bg-transparent">
                <li className="nav-item">
                  <button
                    className={`nav-link bg-transparent ${
                      selectedType === "all" ? "active" : ""
                    }`}
                    onClick={() => fetchFilteredGames("all")}
                    style={{
                      margin: "5px",
                      padding: "10px",
                      background: selectedType === "all" ? "blue" : "gray",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    All
                  </button>
                </li>
                {types.map((item) => (
                  <li key={item.id} className="nav-item">
                    <button
                      className={`nav-link bg-transparent ${
                        selectedType === item.type ? "active" : ""
                      }`}
                      onClick={() => fetchFilteredGames(item.type)}
                      style={{
                        margin: "5px",
                        padding: "10px",
                        background:
                          selectedType === item.type ? "blue" : "gray",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {item.type}
                    </button>
                  </li>
                ))}
              </ul>
              <style jsx>{`
                .scroll-hide::-webkit-scrollbar {
                  display: none;
                }
                .scroll-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                  white-space: nowrap;
                }
              `}</style>
            </div>

            {/* Games List */}
            <h5>Filtered Games</h5>

            <div className="row">
              {loading ? (
                <p className="text-white text-center mt-5">
                  🎮 Loading games...
                </p>
              ) : filteredGames.length > 0 ? (
                filteredGames
                  .filter((game) => game.image)
                  .map((game, index) => (
                    <motion.div
                      className="col-md-4 col-sm-4 col-4 px-1"
                      key={game.uuid}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
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
                    </motion.div>
                  ))
              ) : (
                <div className="d-flex flex-column align-items-center mt-5">
                  <img
                    src="assets/img/notification/img_2.png"
                    alt="unauth"
                    className="w-75"
                  />
                  <p className="text-white text-center">No games available.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {/* Bottom Footer */}
      {/* <BottomFooter /> */}

      <div className="" style={{ marginTop: "100px" }}></div>
      <Footer />
    </>
  );
};

export default AllGame;

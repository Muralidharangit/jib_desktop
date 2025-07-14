import React, { useEffect, useState, useRef } from "react";
import {
  useSearchParams,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../API/api";
import { toast, ToastContainer } from "react-toastify";
import StickyHeader from "./Header/Header";
import Footer from "./footer/Footer";
import { Images } from "./Header/constants/images";
import routes from "../routes/route";
import { motion } from "framer-motion";
import {
  manualCardGames,
  manualCrashGames,
  manualHotGames,
} from "../../API/manualGames";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Sidebar from "./Header/Sidebar";

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

  const [searchByNameResults, setSearchByNameResults] = useState([]);
  const [searchByProviderResults, setSearchByProviderResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const navigate = useNavigate();
  // 1️⃣ Handle search input changes
  useEffect(() => {
    const fixedSearchTerm = searchTerm.trim();

    if (fixedSearchTerm.length < 3) {
      setIsSearchMode(false);
      setSearchByNameResults([]);
      setSearchByProviderResults([]);
      setSearchPage(1);
      return;
    }

    setIsSearchMode(true);
    setSearchPage(1);
    setHasMore(true); // ✅ allow more fetches on scroll

    const delay = setTimeout(() => {
      handleAutoSearch(fixedSearchTerm, 1);
    }, 500); // debounce

    return () => clearTimeout(delay);
  }, [searchTerm]);

  // 2️⃣ Trigger pagination when searchPage changes
  useEffect(() => {
    const fixedSearchTerm = searchTerm.trim();
    if (isSearchMode && fixedSearchTerm.length >= 3 && searchPage > 1) {
      handleAutoSearch(fixedSearchTerm, searchPage);
    }
  }, [searchPage]);

  // 3️⃣ Trigger pagination for filtered (non-search) view
  useEffect(() => {
    if (!isSearchMode && filterType && page > 1) {
      fetchFilteredGames(filterType, page);
    }
  }, [page]);

  // 4️⃣ Scroll detection to load more pages
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop + 300 >=
        document.documentElement.scrollHeight;

      if (bottomReached && !isFetching) {
        if (isSearchMode && searchPage < totalPages) {
          setSearchPage((prev) => prev + 1);
        } else if (!isSearchMode && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, isSearchMode, page, searchPage, totalPages]);

  // 5️⃣ When URL ?type= changes (first load or type switch)
  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setFilterType(type);
      setPage(1); // ✅ Reset pagination
      setHasMore(true);
      fetchFilteredGames(type, 1);
    }
  }, [searchParams]);

  // 6️⃣ Detect iframe closure and reload game list
  useEffect(() => {
    let interval;
    if (showFullScreenGame && selectedGameUrl) {
      interval = setInterval(() => {
        const frame = iframeRef.current;
        if (!document.body.contains(frame)) {
          setShowFullScreenGame(false);
          setSelectedGameUrl(null);
          if (filterType) fetchFilteredGames(filterType, 1);
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showFullScreenGame, selectedGameUrl, filterType]);

  const fetchFilteredGames = async (type) => {
    // console.log(type);

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/all-games?is_mobile=1`, {
        params: { type },
      });
      setGames(response.data.allGames);
    } catch (error) {
      console.error("Error fetching filtered games:", error);
      toast.error("Something went wrong while filtering games.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fixedSearchTerm = searchTerm.trim();

    if (!fixedSearchTerm) return;

    try {
      setIsSearchMode(true);

      const [res1, res2, res3] = await Promise.all([
        axios.get(
          `${BASE_URL}/all-games?is_mobile=1&global=${fixedSearchTerm}`
        ),
        axios.get(
          `${BASE_URL}/all-games?is_mobile=1&provider=${fixedSearchTerm}`
        ),
        axios.get(`${BASE_URL}/all-games?is_mobile=1&type=${fixedSearchTerm}`),
      ]);

      // 🟣 Merge search and type API results (res1 + res3)
      const mergedSearchResults = [
        ...(res1.data.allGames || []),
        ...(res3.data.allGames || []),
      ];

      // // ✅ Remove duplicates if needed
      // const uniqueMergedResults = Array.from(
      //   new Map(mergedSearchResults.map((game) => [game.id, game])).values()
      // );

      setSearchByNameResults(mergedSearchResults); // 👈 store merged result
      setSearchByProviderResults(res2.data.allGames || []); // provider-only result
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  const handleAutoSearch = async (fixedSearchTerm, pageNo = 1) => {
    if (isFetching || !hasMore) return;

    try {
      setSearchLoading(true);
      setIsFetching(true);

      const [res1, res2, res3] = await Promise.all([
        axios.get(
          `${BASE_URL}/all-games?is_mobile=1&global=${fixedSearchTerm}&page=${pageNo}`
        ),
        axios.get(
          `${BASE_URL}/all-games?is_mobile=1&provider=${fixedSearchTerm}&page=${pageNo}`
        ),
        axios.get(
          `${BASE_URL}/all-games?is_mobile=1&type=${fixedSearchTerm}&page=${pageNo}`
        ),
      ]);

      let mergedSearchResults = [
        ...(res1.data.allGames || []),
        ...(res3.data.allGames || []),
      ];

      const manualGamesMap = {
        card: manualCardGames,
        hot: manualHotGames,
        crash: manualCrashGames,
      };

      const lowerTerm = fixedSearchTerm.toLowerCase();
      if (manualGamesMap[lowerTerm] && pageNo === 1) {
        mergedSearchResults = [
          ...manualGamesMap[lowerTerm],
          ...mergedSearchResults,
        ];
      }

      const totalPages = Math.max(
        res1.data.pagination?.total_page || 1,
        res2.data.pagination?.total_page || 1,
        res3.data.pagination?.total_page || 1
      );

      const newSearchGames = Array.from(
        new Map(mergedSearchResults.map((game) => [game.uuid, game])).values()
      );

      // ✅ FIX HERE: If pageNo === 1, reset. If not, append to existing results.
      if (pageNo === 1) {
        setSearchByNameResults(newSearchGames);
      } else {
        setSearchByNameResults((prev) => {
          const combined = [...prev, ...newSearchGames];
          return Array.from(new Map(combined.map((g) => [g.uuid, g])).values());
        });
      }

      // 📦 Provider results are not paginated, so only update on page 1
      if (pageNo === 1) {
        setSearchByProviderResults(res2.data.allGames || []);
      }

      setHasMore(pageNo < totalPages);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearchLoading(false);
      setIsFetching(false);
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
              <div className="search_container_box">
                <form className="form my-2" onSubmit={handleSubmit}>
                  <button type="submit">
                    <i className="ri-search-2-line fs-18" />
                  </button>

                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onInput={(e) => setSearchTerm(e.target.value)} // ✅ extra support for mobile
                    className="my-3 input"
                  />

                  {isSearchMode && (
                    <button
                      type="button"
                      className="reset"
                      onClick={() => {
                        setSearchTerm("");
                        setSearchByNameResults([]); // ✅ Clear actual search result state
                        setSearchByProviderResults([]); // ✅ Clear provider results
                        setSearchPage(1); // ✅ Reset pagination
                        setIsSearchMode(false);
                        setHasMore(true); // ✅ Enable future searching
                      }}
                    >
                      ❌
                    </button>
                  )}
                </form>
              </div>

              {/* 🕹️ Game List */}
              {isSearchMode ? (
                <>
                  {isSearchMode && (
                    <>
                      {searchLoading && searchPage === 1 ? (
                        <p className="text-white text-center mt-5">
                          🎮 Loading games...
                        </p>
                      ) : searchByNameResults.length > 0 ||
                        searchByProviderResults.length > 0 ? (
                        <>
                          {/* 🔍 Search by Game Name Section */}
                          {searchByNameResults.length > 0 && (
                            <>
                              <h5 className="text-white mt-4">
                                Search by Game Name
                              </h5>
                              <div className="row">
                                {searchByNameResults.map((game, index) => (
                                  <motion.div
                                    className="col-md-4 col-sm-4 col-6 px-1 col-custom-3"
                                    key={game.uuid}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: index * 0.002,
                                    }}
                                  >
                                    <div
                                      className="game-card-wrapper rounded-2 new-cardclr mt-2 hover-group"
                                      onClick={() => handleGameClick(game)}
                                    >
                                      <div className="game-card p-0 m-0 overflow-hidden">
                                        <img
                                          src={
                                            game.image ||
                                            "/assets/img/placeholder.png"
                                          }
                                          className="game-card-img"
                                          alt={game.name}
                                        />
                                      </div>
                                      <div className="game-play-button d-flex flex-column">
                                        <div className="btn-play">
                                          <i className="fa-solid fa-play"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </>
                          )}

                          {/* 🔍 Search by Provider */}
                          {searchPage === 1 &&
                            searchByProviderResults.length > 0 && (
                              <>
                                <h5 className="text-white mt-6">
                                  Search by Provider
                                </h5>
                                <div className="row">
                                  {searchByProviderResults.map(
                                    (game, index) => (
                                      <motion.div
                                        className="col-md-4 col-sm-4 col-6 px-1"
                                        key={game.uuid}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                          duration: 0.3,
                                          delay: index * 0.002,
                                        }}
                                      >
                                        <div
                                          className="game-card-wrapper rounded-2 new-cardclr mt-2"
                                          onClick={() => handleGameClick(game)}
                                        >
                                          <div className="game-card p-0 m-0 p-1">
                                            <img
                                              src={
                                                game.image ||
                                                "/assets/img/placeholder.png"
                                              }
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
                                            <div className="btn-play">
                                              <i className="fa-solid fa-play"></i>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )
                                  )}
                                </div>
                              </>
                            )}
                        </>
                      ) : searchTerm.trim().length >= 3 && !searchLoading ? (
                        <p className="text-center text-gray-400 mt-4">
                          No results found.
                        </p>
                      ) : null}
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* filter Game List Starts */}
                  <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                    <div className="game-list px-1 container">
                      <h5 className="text-white text-capitalize my-2">
                        {filterType
                          ? filterType === "card"
                            ? "Live Casino"
                            : `${filterType} Games`
                          : "Games"}
                      </h5>

                      <div className="">
                        <div className="row">
                          {loading ? (
                            // 🔄 Skeleton Cards While Loading
                            Array.from({ length: 6 }).map((_, index) => (
                              <div
                                className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 px-1 col-custom-3"
                                key={index}
                              >
                                <div className="game-card-wrapper rounded-2 new-cardclr mt-2">
                                  <Skeleton height={140} borderRadius={10} />
                                  <div className="mt-2 px-1">
                                    <Skeleton height={12} width="80%" />
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : games.length > 0 ? (
                            games
                              .filter((game) => game.image)
                              .map((game) => (
                                <div
                                  className="col-xl-2 col-lg-3 col-md-4 col-sm-4 px-1 col-custom-3"
                                  key={game.uuid}
                                >
                                  <div
                                    className="game-card-wrapper rounded-2 new-cardclr mt-2 hover-group"
                                    onClick={() => handleGameClick(game)}
                                  >
                                    <div className="game-card position-relative p-0 m-0 overflow-hidden">
                                      <img
                                        src={game.image}
                                        className="game-card-img"
                                        alt={game.name}
                                      />
                                    </div>
                                    <div className="btn-play position-absolute top-50 start-50 translate-middle">
                                      <i className="fa-solid fa-play"></i>
                                    </div>
                                  </div>
                                </div>
                              ))
                          ) : (
                            // ❌ No Games
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
                  </SkeletonTheme>

                  {/* filter Games End here  */}
                </>
              )}

              {/* filter Game List Starts */}
              {/* <div className="game-list px-3 container">
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
                  <div
                    className="col-md-4 col-sm-4 col-6 px-1 col-custom-3"
                    key={game.uuid}
                  >
                    <div className="game-card-wrapper rounded-2 new-cardclr mt-2 hover-group">
                      <div className="game-card position-relative p-0 m-0 overflow-hidden">
                        <img
                          src={game.image}
                          className="game-card-img"
                          alt={game.name}
                        />
                      </div>
                      <div
                        className="btn-play position-absolute top-50 start-50 translate-middle"
                        onClick={() => handleGameClick(game)}
                      >
                        <i className="fa-solid fa-play"></i>
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
      </div> */}
              {/* filter Games End here  */}
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

export default FilteredGamesPage;

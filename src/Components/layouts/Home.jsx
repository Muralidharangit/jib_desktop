import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import StickyHeader from "./Header/Header";
import BottomFooter from "./footer/BottomFooter";
import Footer from "./footer/Footer";
// import OffCanvas from "../offcanvapages/Offcanva";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../routes/route";
import BottomProvider from "./footer/BottomProvider";
import BASE_URL from "../../API/api";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AuthContext from "../../Auth/AuthContext";
import FullPageLoader from "./FullPageLoader";
import axiosInstance from "../../API/axiosConfig";

import { Images } from "./Header/constants/images";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "./Header/Sidebar";

function Home() {
  const { isLoading } = useContext(AuthContext);
  // const token = user?.token;
  // Define BASE_URL at the top

  // State for all games
  const [games, setGames] = useState([]);
  const [selectedGameUrl, setSelectedGameUrl] = useState(null);
  const [showFullScreenGame, setShowFullScreenGame] = useState(false);
  const [isLaunchingGame, setIsLaunchingGame] = useState(false);
  // const [filteredGames, setFilteredGames] = useState([]);

  // State for dice games
  const [diceGames, setDiceGames] = useState([]);
  const [isLoadingDice, setIsLoadingDice] = useState(true); // ✅ add this
  const [slotGames, setslotGames] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [providerlist, setproviderlist] = useState([]);

  const iframeRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state?.showLoginSuccess) {
      toast.success("Login successful! 🎉", {
        toastId: "login-success",
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          // Navigate after toast is closed automatically
          navigate(location.pathname, { replace: true, state: {} });
        },
      });
    }
  }, [location, navigate]);
  // Fetch All Games Effect
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // const response = await fetch(
        //   `${BASE_URL}/all-games?is_mobile=1&limit=10&provider=SmartSoft`
        // );
        const response = await axiosInstance.get(
          `/all-games?is_mobile=1&limit=10&provider=SmartSoft`
        );
        const data = await response.json();
        // Debugging step
        // console.log("All Games API Response:", data);
        // Ensure data.allGames is an array
        if (Array.isArray(data.allGames)) {
          setGames(data.allGames);
        } else {
          setGames([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching all games:", error);
        setGames([]);
      }
    };

    fetchGames();
  }, []); // No dependency since BASE_URL is constant

  // Fetch Dice Games Effect
  useEffect(() => {
    const fetchGameType = async () => {
      setIsLoadingDice(true); // start loading
      try {
        const response = await axiosInstance.get(
          `/all-games?is_mobile=1&limit=10&type=dice`
        );
        const data = response.data;

        if (Array.isArray(data.allGames)) {
          setDiceGames(data.allGames);
        } else {
          setDiceGames([]);
        }
      } catch (error) {
        console.error("Error fetching dice games:", error);
        setDiceGames([]);
      } finally {
        setIsLoadingDice(false); // ✅ end loading
      }
    };

    fetchGameType();
  }, []);
  const [isLoadingSlot, setIsLoadingSlot] = useState(true); // New loading state
  // Fetch Slot Games Effect
  useEffect(() => {
    const slotGameType = async () => {
      try {
        setIsLoadingSlot(true); // Set loading to true before fetching
        const response = await axiosInstance.get(
          `/all-games?is_mobile=1&limit=10&type=slots`
        );
        const data = response.data;

        if (Array.isArray(data.allGames)) {
          setslotGames(data.allGames);
        } else {
          setslotGames([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching slot games:", error);
        setslotGames([]);
      } finally {
        setIsLoadingSlot(false); // Set loading to false after fetching (success or error)
      }
    };

    slotGameType();
  }, []); // Empty dependency array if BASE_URL is constant and axiosInstance is stable

  // Provider Games Effect
  // / Declare the state at the top:
  // Declare the state at the top:
  const [providerList, setProviderList] = useState([]);
  const [isLoadings, setIsLoadings] = useState(true); // Correct placement

  useEffect(() => {
    const fetchProviderList = async () => {
      try {
        setIsLoadings(true); // Set loading to true before the API call
        const response = await axiosInstance.get(`/providers-list`);
        const data = response.data;

        if (Array.isArray(data.providers)) {
          const limitedProviders = data.providers.slice(0, 10);
          setProviderList(limitedProviders);
        } else {
          setProviderList([]);
        }
      } catch (error) {
        console.error("Error fetching provider list:", error);
        setProviderList([]);
      } finally {
        setIsLoadings(false); // Set loading to false after the API call completes
      }
    };

    fetchProviderList();
  }, []); // End of useEffect

  // Turbo Games Effect
  // Declare the state at the top:
  // const [turboGamesList, setTurboGamesList] = useState([]);
  // const [isLoadingTurbo, setIsLoadingTurbo] = useState(true); // Separate loading state for Turbo Games

  // useEffect(() => {
  //   const fetchTurboGamesList = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/turbo-games`);
  //       // const data = await response.json();
  //       const data = response.data;

  //       // console.log("Turbo Games API Response:", data);

  //       // Check if the response status is success and if turboGames array exists
  //       if (data.status === "success" && Array.isArray(data.turboGames)) {
  //         setTurboGamesList(data.turboGames); // Use turboGames from the response
  //       } else {
  //         setTurboGamesList([]); // Fallback if data is not in the expected format
  //       }
  //     } catch (error) {
  //       console.error("Error fetching turbo games list:", error);
  //       setTurboGamesList([]); // Fallback in case of error
  //     } finally {
  //       setIsLoadingTurbo(false);
  //     }
  //   };

  //   fetchTurboGamesList();
  // }, []);

  // game URL Iframe Opens here
  const handleGameClickTurbo = async (game) => {
    // console.log(game);
    if (!game.key) {
      toast.error("Missing game info.");
      return;
    }

    // console.log(game);

    const token = localStorage.getItem("token");
    try {
      setIsLaunchingGame(true); // ✅ Show loading screen

      const response = await axios.get(`${BASE_URL}/player/turbo/${game.key}`, {
        // params: { return_url: "https://jiboomba.in/games" },
        params: { return_url: window.location.origin }, // 👈 dynamic base URL },
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log(response, "response.................");

      const gameUrl = response.data.gameUrl || response.data?.game_url;

      // console.log(gameUrl, "gameUrl..............");

      if (gameUrl) {
        setSelectedGameUrl(gameUrl);
        setShowFullScreenGame(true);
      } else {
        toast.error("Failed to get game URL.");
      }
    } catch (error) {
      setIsLaunchingGame(false);

      // Check for 401 or unauthenticated message
      const errMsg = error.response?.data?.message;

      if (errMsg === "Unauthenticated." || error.response?.status === 401) {
        toast.error("Please login to jump into the Game World! 🎮🚀", {
          toastId: "unauthenticated",
        });

        // Clear token if any
        localStorage.removeItem("token");

        // Redirect after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          navigate("/login");
        }, 8000);
        return;
      }

      console.error("Error launching game:", error);
      toast.error("Game launch failed. Try again later.");
    }
  };

  // Spribe Games Effect
  // Declare the state for Spribe Games
  // const [spribeGamesList, setSpribeGamesList] = useState([]);
  // const [isLoadingSpribe, setIsLoadingSpribe] = useState(true); // Separate loading state for Spribe Games

  // useEffect(() => {
  //   const fetchSpribeGamesList = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/spribe-games`);
  //       const data = await response.json();

  //       // console.log("Spribe Games API Response:", data);

  //       // Check if the response status is success and if spribeGames array exists
  //       if (data.status === "success" && Array.isArray(data.spribeGames)) {
  //         setSpribeGamesList(data.spribeGames); // Use spribeGames from the response
  //       } else {
  //         setSpribeGamesList([]); // Fallback if data is not in the expected format
  //       }
  //     } catch (error) {
  //       console.error("Error fetching Spribe games list:", error);
  //       setSpribeGamesList([]); // Fallback in case of error
  //     } finally {
  //       setIsLoadingSpribe(false);
  //     }
  //   };

  //   fetchSpribeGamesList();
  // }, []);

  // game URL Iframe Opens here
  const handleGameClickSpribe = async (game) => {
    if (!game) {
      toast.error("Missing game info.");
      return;
    }
    // console.log(game, "game testing");

    const token = localStorage.getItem("token");
    try {
      setIsLaunchingGame(true); // ✅ Show loading screen
      const response = await axios.get(`${BASE_URL}/player/spribe/${game}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response, "response.................");

      const gameUrl = response.data.gameUrl || response.data?.gameUrl;

      // console.log(gameUrl, "gameUrl..............");

      if (gameUrl) {
        setSelectedGameUrl(gameUrl);
        setShowFullScreenGame(true);
      } else {
        toast.error("Failed to get game URL.");
      }
    } catch (error) {
      setIsLaunchingGame(false);

      // Check for 401 or unauthenticated message
      const errMsg = error.response?.data?.message;

      if (errMsg === "Unauthenticated." || error.response?.status === 401) {
        toast.error("Please login to jump into the Game World! 🎮🚀", {
          toastId: "unauthenticated",
        });

        // Clear token if any
        localStorage.removeItem("token");

        // Redirect after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          navigate("/login");
        }, 8000);
        return;
      }

      console.error("Error launching game:", error);
      toast.error("Game launch failed. Try again later.");
    }
  };

  // game URL Iframe Opens here
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

  // const handleFilterClick = async (type) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/filter-games`, {
  //       type: type,
  //     });

  //     console.log("Filtered Games:", response.data);
  //     // 👉 Optionally store in state to render the results
  //     // setFilteredGames(response.data.games);
  //     setFilteredGames(response.data.games); // update game list
  //   } catch (error) {
  //     console.error("Error fetching filtered games:", error);
  //     toast.error("Something went wrong while filtering games.");
  //   }
  // };

  // Assuming routes is defined like this:

  // Dummy routes object - replace with your actual routes if different
  const routes = {
    games: {
      all: "/all-games",
    },
  };

  const [isLoadingTypes, setIsLoadingTypes] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingTypes(false);
    }, 1000); // Simulate a 1-second load time

    return () => clearTimeout(timer);
  }, []);

  // Define your game type data.
  // This array ensures the skeleton and actual content match in structure and count.
  const gameTypes = [
    { name: "Casino", type: "card", imgSrc: "assets/img/css.png" },
    { name: "Roulette", type: "roulette", imgSrc: "assets/img/casino11.png" },
    { name: "Crash", type: "crash", imgSrc: "assets/img/crash.png" },
    { name: "Lottery", type: "lottery", imgSrc: "assets/img/lottery.png" },
    { name: "Instant", type: "instant", imgSrc: "assets/img/sports.png" },
    { name: "Slots", type: "slots", imgSrc: "assets/img/horse.png" },
    { name: "Dice", type: "dice", imgSrc: "assets/img/up.png" },
  ];

  // banner section

  // You'll need to define this component or integrate it into your existing one

  const [isLoadingBanner, setIsLoadingBanner] = useState(true);

  // Simulate loading of the banner
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingBanner(false);
    }, 1000); // Simulate an 800ms load time

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const [isLoadingMarquee, setIsLoadingMarquee] = useState(true); // New loading state

  // Define your static game data for the marquee.
  // In a real app, this would likely come from an API call.
  const marqueeGames = [
    { type: "roulette", imgSrc: "assets/img/turbo/1.png" },
    { type: "slots", imgSrc: "assets/img/turbo/2.png" },
    { type: "card", imgSrc: "assets/img/turbo/3.png" },
    { type: "dice", imgSrc: "assets/img/turbo/4.png" },
    { type: "shooting", imgSrc: "assets/img/turbo/5.png" },
    { type: "home", imgSrc: "assets/img/turbo/6.png" }, // Last one navigating to home
  ];

  // Simulate a loading delay for the marquee content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingMarquee(false);
    }, 1000); // Simulate a 1.2-second load time

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // State to manage loading status for this section
  const [isLoadingGames, setIsLoadingGames] = useState(true);

  // Your static game data (replace with API fetch in a real application)
  const allGamesData = [
    { type: "roulette", imgSrc: "assets/img/turbo/1.png" },
    { type: "slots", imgSrc: "assets/img/turbo/2.png" },
    { type: "card", imgSrc: "assets/img/turbo/3.png" },
    { type: "dice", imgSrc: "assets/img/turbo/4.png" },
    { type: "shooting", imgSrc: "assets/img/turbo/5.png" },
    { type: "general", imgSrc: "assets/img/turbo/6.png", linkTo: routes.home },
  ];

  // Simulate data fetching with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingGames(false); // Set loading to false after the delay
    }, 1500); // Increased delay slightly for better visual effect (adjust as needed)

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []); // Effect runs once on component mount

  return (
    <>
      {/* header  */}
      <StickyHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* header end */}

      <div className="container-fluid page-body-wrapper">
        {/* Sidebar Nav Starts */}
        <Sidebar />
        {/* Sidebar Nav Ends */}
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="max-1250 mx-auto">
              <div>
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
                    <div
                      className="spinner-border text-light me-3"
                      role="status"
                    >
                      <span className="visually-hidden">Loading</span>
                    </div>
                    <p>Launching game, please wait...</p>
                  </div>
                )}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  theme="dark"
                />
                {isLoading ? (
                  <FullPageLoader message="Loading..." />
                ) : (
                  <>
                    <section className="container vh-100  py-2">
                      {/* home start */}
                      {/*----banner-slider----*/}
                      <SkeletonTheme
                        baseColor="#313131"
                        highlightColor="#525252"
                      >
                        {/*----banner-slider----*/}
                        <div className="position-relative my-2">
                          {" "}
                          {/* Added my-3 for spacing, adjust as needed */}
                          {isLoadingBanner ? (
                            // Skeleton for the banner slider
                            <Skeleton
                              height={180}
                              className="w-100 rounded-2"
                            /> // Adjust height to match your banner
                          ) : (
                            <Swiper
                              className="mySwiper"
                              modules={[Navigation, Pagination, Autoplay]}
                              spaceBetween={30}
                              slidesPerView={1}
                              pagination={{ clickable: true }}
                              autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                              }} // Added disableOnInteraction for better UX
                              breakpoints={{
                                768: {
                                  slidesPerView: 2, // Tablet view
                                },
                                1024: {
                                  slidesPerView: 3, // Laptop/Desktop view
                                },
                              }}
                            >
                              <SwiperSlide>
                                <img
                                  src="assets/img/slider/first1.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 1" // Improved alt text
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <img
                                  src="assets/img/slider/first2.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 2"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <img
                                  src="assets/img/slider/first3.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 3"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <img
                                  src="assets/img/slider/first4.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 4"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <img
                                  src="assets/img/slider/first5.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 5"
                                />
                              </SwiperSlide>
                              <SwiperSlide>
                                <img
                                  src="assets/img/slider/first6.png"
                                  className="w-100 rounded-2"
                                  alt="Gaming Banner Slide 6"
                                />
                              </SwiperSlide>
                            </Swiper>
                          )}
                        </div>
                        {/*-------banner-end----*/}
                      </SkeletonTheme>
                      {/*-------banner-end----*/}
                      {/* home end */}

                      {/* HOT GAMES */}
                      {/* HOT GAMES */}
                      <SkeletonTheme
                        baseColor="#313131"
                        highlightColor="#525252"
                      >
                        {/* HOT GAMES */}
                        <div>
                          {/* Section Title */}
                          <div className="top-matches-title d-flex align-items-center justify-content-between my-2">
                            <div className="d-flex align-items-center">
                              {isLoadingTypes ? (
                                <>
                                  <Skeleton circle height={27} width={27} />
                                  <Skeleton
                                    height={20}
                                    width={100}
                                    className="ms-2"
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src="https://cdn-icons-png.flaticon.com/512/12800/12800987.png"
                                    width="27"
                                    alt="Games Type Icon"
                                  />
                                  <h5 className="m-0 ms-2 d-flex align-items-center">
                                    Hot Games
                                  </h5>
                                </>
                              )}
                            </div>

                            <div>
                              <Link to="/all-games">
                                <span className="text-white fs-13 fw-500 right_heading">
                                  All <i className="ri-arrow-right-s-line" />
                                </span>
                              </Link>
                            </div>
                          </div>

                          {/* Swiper Section */}
                          <Swiper
                            className="mySwiper"
                            modules={[Autoplay, FreeMode]}
                            spaceBetween={5}
                            loop={true}
                            autoplay={{ delay: 0, disableOnInteraction: false }}
                            speed={3000}
                            slidesPerView={2}
                            freeMode={true}
                            breakpoints={{
                              768: {
                                slidesPerView: 7, // Tablet view
                              },
                              1024: {
                                slidesPerView: 6, // Laptop/Desktop view
                              },
                            }}
                          >
                            {isLoadingDice ? (
                              Array.from({ length: 4 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                  <div className="game-card-wrapper rounded-2 new-cardclr p-1">
                                    <Skeleton height={100} borderRadius={10} />
                                    <div className="mt-2 px-1">
                                      <Skeleton height={12} width={`100%`} />
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))
                            ) : diceGames.length > 0 ? (
                              diceGames.map((game, index) => (
                                <SwiperSlide key={game.uuid || index}>
                                  <div className="game-card-wrapper rounded-2 new-cardclr">
                                    <div className="game-card p-0 m-0 p-1 ">
                                      <img
                                        src={game.image}
                                        className="game-card-img position-relative"
                                        alt={game.name}
                                      />
                                      <div className="game-play-button d-flex flex-column">
                                        <div
                                          className="btn-play"
                                          onClick={() => handleGameClick(game)}
                                        >
                                          <i className="fa-solid fa-play"></i>
                                        </div>
                                      </div>
                                      <div className="d-flex flex-column text-white text-center py-2 px-1">
                                        <span className="fs-12 fw-bold text-truncate">
                                          {game.name}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))
                            ) : (
                              <div className="d-flex flex-column align-items-center mt-5">
                                <img
                                  src="assets/img/notification/img_2.png"
                                  alt="unauth"
                                  className="w-25"
                                />
                                <p className="text-white text-center">
                                  No dice games available
                                </p>
                              </div>
                            )}
                          </Swiper>

                          {/* Fullscreen Game Iframe */}
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
                                src={selectedGameUrl}
                                title="Game"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  border: "none",
                                }}
                                allowFullScreen
                              />
                            </div>
                          )}
                        </div>
                      </SkeletonTheme>
                      {/* hot games */}

                      {/* hot games */}

                      {/* Games Types */}

                      <div className="game-types-section  tabd-none">
                        {/* Games Type Header */}
                        <div className="top-matches-title d-flex align-items-center justify-content-between my-2 ">
                          <div className="d-flex">
                            {/* Skeleton for icon */}
                            {isLoadingTypes ? (
                              <Skeleton
                                circle
                                height={27}
                                width={27}
                                baseColor="#313131" // Darker grey for the base
                                highlightColor="#525252"
                              />
                            ) : (
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/12800/12800987.png"
                                width="27"
                                alt="Games Type Icon"
                              />
                            )}
                            {/* Skeleton for title */}
                            {isLoadingTypes ? (
                              <Skeleton
                                height={20}
                                width={100}
                                className="ms-2"
                                baseColor="#313131" // Darker grey for the base
                                highlightColor="#525252"
                              />
                            ) : (
                              <h5 className="m-0 ms-2">Games Type</h5>
                            )}
                          </div>
                          <div>
                            <Link to={routes.games.all}>
                              <span className="text-white fs-13 fw-500 right_heading">
                                All <i className="ri-arrow-right-s-line" />
                              </span>
                            </Link>
                          </div>
                        </div>

                        {/* SkeletonTheme for consistent skeleton colors */}
                        <SkeletonTheme
                          baseColor="#313131"
                          highlightColor="#525252"
                        >
                          {isLoadingTypes ? (
                            // Skeleton loading state for game type cards
                            <>
                              <div className="d-flex gap-2">
                                {Array.from({ length: 2 }).map(
                                  (
                                    _,
                                    index // 2 cards in the first row
                                  ) => (
                                    <div
                                      key={`skeleton-1-${index}`}
                                      className="card bg-cardtrans p-1"
                                      style={{ flex: "1 1 auto" }}
                                    >
                                      <div className="flex-column d-flex">
                                        <Skeleton
                                          height={15}
                                          width="60%"
                                          className="mb-1"
                                        />{" "}
                                        {/* Text skeleton */}
                                        <Skeleton
                                          height={50}
                                          width="100%"
                                        />{" "}
                                        {/* Image skeleton */}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="mt-2">
                                <div className="d-flex gap-2">
                                  {Array.from({ length: 3 }).map(
                                    (
                                      _,
                                      index // 3 cards in the second row
                                    ) => (
                                      <div
                                        key={`skeleton-2-${index}`}
                                        className="card bg-cardtrans p-1"
                                        style={{ flex: "1 1 auto" }}
                                      >
                                        <div className="flex-column d-flex">
                                          <Skeleton
                                            height={15}
                                            width="60%"
                                            className="mb-1"
                                          />
                                          <Skeleton height={50} width="100%" />
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="d-flex gap-2 mt-2">
                                {Array.from({ length: 2 }).map(
                                  (
                                    _,
                                    index // 2 cards in the third row
                                  ) => (
                                    <div
                                      key={`skeleton-3-${index}`}
                                      className="card bg-cardtrans p-1"
                                      style={{ flex: "1 1 auto" }}
                                    >
                                      <div className="flex-column d-flex">
                                        <Skeleton
                                          height={15}
                                          width="60%"
                                          className="mb-1"
                                        />
                                        <Skeleton height={50} width="100%" />
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </>
                          ) : (
                            // Actual game type cards when loaded
                            <>
                              <div className="d-flex gap-2">
                                {gameTypes.slice(0, 2).map(
                                  (
                                    game // First row: Casino, Roulette
                                  ) => (
                                    <div
                                      key={game.type} // Using game.type as key since it's unique
                                      className="card bg-cardtrans p-1"
                                      onClick={() =>
                                        navigate(
                                          `/filtered-games?type=${game.type}`
                                        )
                                      }
                                      role="button"
                                      tabIndex="0"
                                      onKeyPress={(e) => {
                                        if (
                                          e.key === "Enter" ||
                                          e.key === " "
                                        ) {
                                          // Added spacebar for accessibility
                                          navigate(
                                            `/filtered-games?type=${game.type}`
                                          );
                                        }
                                      }}
                                    >
                                      <div className="flex-column d-flex">
                                        <span className="text-white fw-500 fs-13">
                                          {game.name}
                                        </span>
                                        <img
                                          src={game.imgSrc}
                                          alt={game.name}
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>

                              <div className="mt-2">
                                <div className="d-flex gap-2">
                                  {gameTypes.slice(2, 5).map(
                                    (
                                      game // Second row: Crash, Lottery, Instant
                                    ) => (
                                      <div
                                        key={game.type}
                                        className="card bg-cardtrans p-1"
                                        onClick={() =>
                                          navigate(
                                            `/filtered-games?type=${game.type}`
                                          )
                                        }
                                        role="button"
                                        tabIndex="0"
                                        onKeyPress={(e) => {
                                          if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                          ) {
                                            navigate(
                                              `/filtered-games?type=${game.type}`
                                            );
                                          }
                                        }}
                                      >
                                        <div className="flex-column d-flex">
                                          <span className="text-white fw-500 fs-13">
                                            {game.name}
                                          </span>
                                          <img
                                            src={game.imgSrc}
                                            alt={game.name}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div className="d-flex gap-2 mt-2">
                                {gameTypes.slice(5, 7).map(
                                  (
                                    game // Third row: Slots, Dice
                                  ) => (
                                    <div
                                      key={game.type}
                                      className="card bg-cardtrans p-1"
                                      onClick={() =>
                                        navigate(
                                          `/filtered-games?type=${game.type}`
                                        )
                                      }
                                      role="button"
                                      tabIndex="0"
                                      onKeyPress={(e) => {
                                        if (
                                          e.key === "Enter" ||
                                          e.key === " "
                                        ) {
                                          navigate(
                                            `/filtered-games?type=${game.type}`
                                          );
                                        }
                                      }}
                                    >
                                      <div className="flex-column d-flex">
                                        <span className="text-white fw-500 fs-13">
                                          {game.name}
                                        </span>
                                        <img
                                          src={game.imgSrc}
                                          alt={game.name}
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </>
                          )}
                        </SkeletonTheme>
                      </div>

                      {/* Games Types */}

                      <>
                        {/* Games Types */}
                        <div className="mobile-none">
                          <div className="top-matches-title d-flex align-items-center justify-content-between   my-3">
                            <div className="d-flex">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/12800/12800987.png"
                                width="27"
                                alt="Games Type Icon"
                              />
                              <h5 className="m-0 ms-2">Games Type</h5>
                            </div>
                            <div>
                              <a href="./Allgames.html">
                                <span className="text-white fs-13 fw-500 right_heading">
                                  All <i className="ri-arrow-right-s-line" />
                                </span>
                              </a>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <div className="col-4 ">
                              <div
                                className="card bg-cardtrans p-1"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(to left, rgb(255 70 42 / 30%), transparent 75%) !important",
                                }}
                              >
                                <div className="flex-column d-flex">
                                  <span className="text-white fw-500 fs-13  py-2 px-1">
                                    Casino
                                  </span>
                                  <img
                                    src="assets/img/casino.png"
                                    alt=""
                                    srcSet=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-4 ">
                              <div
                                className="card bg-cardtrans p-1"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(to left, rgb(35 105 157 / 44%), transparent 75%) !important",
                                }}
                              >
                                <div className="flex-column d-flex">
                                  <span className="text-white fw-500 fs-13  py-2 px-1">
                                    Sports
                                  </span>
                                  <img
                                    src="assets/img/sports.png"
                                    alt=""
                                    srcSet=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-4 ">
                              <div className="d-flex  flex-wrap ">
                                <div className="col-6 ">
                                  <div
                                    className="card bg-cardtrans p-1"
                                    style={{
                                      backgroundImage:
                                        "linear-gradient(to left, rgb(181 114 28 / 30%), transparent 60%) !important",
                                    }}
                                  >
                                    <div className="flex-column d-flex">
                                      <span className="text-white fw-500 fs-13 py-2 px-1">
                                        Lottery
                                      </span>
                                      <img
                                        src="assets/img/lottery.png
                  "
                                        alt=""
                                        srcSet=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6 ">
                                  <div
                                    className="card bg-cardtrans p-1"
                                    style={{
                                      backgroundImage:
                                        "linear-gradient(to left, rgb(123 64 14 / 49%), transparent 75%) !important",
                                    }}
                                  >
                                    <div className="flex-column d-flex">
                                      <span className="text-white fw-500 fs-13  py-2 px-1">
                                        Racing
                                      </span>
                                      <img
                                        src="assets/img/horse.png"
                                        alt=""
                                        srcSet=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6 pt-2">
                                  <div
                                    className="card bg-cardtrans p-1"
                                    style={{
                                      backgroundImage:
                                        "linear-gradient(to left, rgb(190 191 183 / 27%), transparent 75%) !important",
                                    }}
                                  >
                                    <div className="flex-column d-flex">
                                      <span className="text-white fw-500 fs-13  py-2 px-1">
                                        UpDown
                                      </span>
                                      <img
                                        src="assets/img/up.png"
                                        alt=""
                                        srcSet=""
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6 pt-2">
                                  <div
                                    className="card bg-cardtrans p-1"
                                    style={{
                                      backgroundImage:
                                        "linear-gradient(to left, rgb(123 64 14 / 49%), transparent 75%) !important",
                                    }}
                                  >
                                    <div className="flex-column d-flex">
                                      <span className="text-white fw-500 fs-13  py-2 px-1">
                                        Bingo
                                      </span>
                                      <img
                                        src="assets/img/bingo.png
            "
                                        alt=""
                                        srcSet=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>

                      {/* games types end */}
                      {/* games types end */}

                      {/* game list starts */}
                      {/* <div className="game-grid">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div key={game.uuid} className="game-card">
                <img src={game.image} alt={game.name} />
                <p className="text-white">{game.name}</p>
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
        </div> */}
                      {/* game list Ends */}

                      {/* {{base_url}}/jiboomba/all-games?type=dice */}
                      {/* all games part */}
                      <div>
                        {/* All Games Section Header */}
                        <div className="top-matches-title d-flex align-items-center justify-content-between my-3">
                          <div className="d-flex">
                            {isLoadingGames ? (
                              // Skeleton for the dot icon
                              <Skeleton
                                circle
                                height={20}
                                width={20}
                                className="dot"
                                baseColor="#313131" // Darker grey for the base
                                highlightColor="#525252"
                              />
                            ) : (
                              <span className="dot" />
                            )}
                            {isLoadingGames ? (
                              // Skeleton for the title text
                              <Skeleton
                                height={20}
                                width={120}
                                className="ms-2"
                                baseColor="#313131" // Darker grey for the base
                                highlightColor="#525252"
                              />
                            ) : (
                              <h5 className="m-0 ms-2">All Gamesss</h5>
                            )}
                          </div>
                          <div>
                            {/* The "All" link typically remains visible even during loading */}
                            <Link to={routes.games.all}>
                              <span className="text-white fs-13 fw-500 right_heading">
                                All <i className="ri-arrow-right-s-line" />
                              </span>
                            </Link>
                          </div>
                        </div>
                        ---
                        {/* Apply SkeletonTheme for consistent styling of all skeletons in this section */}
                        <SkeletonTheme
                          baseColor="#313131"
                          highlightColor="#525252"
                        >
                          {isLoadingGames ? (
                            // --- Skeleton loading state for the Swiper carousel ---
                            <swiper-container
                              className="mySwiper"
                              space-between="5"
                              // We can disable autoplay for skeletons, or keep it for the animation feel
                              loop="true" // Loop might not be necessary for skeletons if you're only showing a few
                              autoplay='{"delay": 0, "disableOnInteraction": false}' // Keep for visual consistency
                              speed="2500"
                              slides-per-view="2.5"
                              centered-slides="false"
                              free-mode="true"
                            >
                              {/* Render 4 skeleton slides to adequately fill the view */}
                              {Array.from({ length: 4 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                  <div className="game-card-wrapper rounded-2 new-cardclr p-1">
                                    <Skeleton
                                      height={130}
                                      borderRadius={10}
                                      baseColor="#313131"
                                      highlightColor="#525252"
                                    />
                                    <div className="mt-2 px-1">
                                      <Skeleton
                                        height={12}
                                        width={`100%`}
                                        baseColor="#313131"
                                        highlightColor="#525252"
                                      />
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))}
                            </swiper-container>
                          ) : (
                            // --- Actual game content once loaded ---
                            <swiper-container
                              className="mySwiper"
                              space-between="5"
                              loop="true"
                              autoplay='{"delay": 0, "disableOnInteraction": false}'
                              speed="2500"
                              centered-slides="false"
                              free-mode="true"
                              breakpoints={{
                                768: {
                                  slidesPerView: 6, // Tablet view
                                },
                                1024: {
                                  slidesPerView: 7, // Laptop/Desktop view
                                },
                              }}
                            >
                              {/* Map over your actual game data to render the slides */}
                              {allGamesData.map((game, index) => (
                                <swiper-slide key={index}>
                                  {game.linkTo ? (
                                    // Use Link component if a direct route is specified
                                    <Link
                                      to={game.linkTo}
                                      className="game-card-wrapper"
                                    >
                                      <div className="game-card">
                                        <img
                                          src={game.imgSrc}
                                          className="game-card-img"
                                          alt={`Game ${game.type}`}
                                        />
                                      </div>
                                      <div className="game-play-button d-flex flex-column">
                                        <div className="btn-play">
                                          <i className="fa-solid fa-play"></i>
                                        </div>
                                      </div>
                                    </Link>
                                  ) : (
                                    // Use onClick with navigate for dynamic filtered routes
                                    <div
                                      className="game-card-wrapper"
                                      onClick={() =>
                                        navigate(
                                          `/filtered-games?type=${game.type}`
                                        )
                                      }
                                    >
                                      <div className="game-card">
                                        <img
                                          src={game.imgSrc}
                                          className="game-card-img"
                                          alt={`Game ${game.type}`}
                                        />
                                      </div>
                                      <div className="game-play-button">
                                        <div className="btn-play">
                                          <i className="fa-solid fa-play"></i>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </swiper-slide>
                              ))}
                            </swiper-container>
                          )}
                        </SkeletonTheme>
                      </div>
                      {/* all games */}

                      {/* Marquee runing */}

                      {/* Marquee end */}

                      {/* Dice of games all filer */}

                      {/* Slot Gaming */}
                      <SkeletonTheme
                        baseColor="#313131"
                        highlightColor="#525252"
                      >
                        {/* SLOT GAMES */}
                        <div>
                          <div className="top-matches-title d-flex align-items-center justify-content-between my-3">
                            <div className="d-flex">
                              <span className="dot" />
                              <h5 className="m-0 ms-2 d-flex align-items-center">
                                Slot Games
                              </h5>
                            </div>
                            <div>
                              <Link to={routes.games.all}>
                                <span className="text-white fs-13 fw-500 right_heading">
                                  All <i className="ri-arrow-right-s-line" />
                                </span>
                              </Link>
                            </div>
                          </div>

                          {/* Swiper for Slot Games */}
                          <Swiper
                            className="mySwiper"
                            modules={[Autoplay, FreeMode]}
                            spaceBetween={5}
                            loop={true}
                            autoplay={{ delay: 0, disableOnInteraction: false }}
                            speed={3000}
                            slidesPerView={2}
                            freeMode={true}
                            breakpoints={{
                              768: {
                                slidesPerView: 6, // Tablet view
                              },
                              1024: {
                                slidesPerView: 7, // Laptop/Desktop view
                              },
                            }}
                          >
                            {isLoadingSlot ? (
                              Array.from({ length: 4 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                  <div className="game-card-wrapper rounded-2 new-cardclr p-1">
                                    <Skeleton height={130} borderRadius={10} />
                                    <div className="mt-2 px-1">
                                      <Skeleton height={12} width="100%" />
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))
                            ) : slotGames.length > 0 ? (
                              slotGames.map((game, index) => (
                                <SwiperSlide key={game.uuid || index}>
                                  <div className="game-card-wrapper rounded-2 new-cardclr">
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
                                        <span className="fs-10">Duel</span>
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
                                </SwiperSlide>
                              ))
                            ) : (
                              <div className="d-flex flex-column align-items-center mt-5 w-100">
                                <img
                                  src="assets/img/notification/img_2.png"
                                  alt="unauth"
                                  className="w-25"
                                />
                                <p className="text-white text-center">
                                  No slot games available
                                </p>
                              </div>
                            )}
                          </Swiper>
                        </div>
                      </SkeletonTheme>

                      {/* slot game end */}

                      {/* Provider running list starts*/}
                      <SkeletonTheme
                        baseColor="#313131"
                        highlightColor="#525252"
                      >
                        <div>
                          {/* Provider running list Header */}
                          <div className="top-matches-title d-flex align-items-center justify-content-between my-3">
                            <div className="d-flex">
                              {isLoading ? (
                                <>
                                  <Skeleton circle height={22} width={22} />
                                  <Skeleton
                                    height={20}
                                    width={100}
                                    className="ms-2"
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src="assets/img/coin.png"
                                    width="22px"
                                    alt="flaticon"
                                  />
                                  <h5 className="m-0 ms-2">Provider</h5>
                                </>
                              )}
                            </div>
                            <div>
                              <Link to={routes.games.providers}>
                                <span className="text-white fs-13 fw-500 right_heading">
                                  All <i className="ri-arrow-right-s-line" />
                                </span>
                              </Link>
                            </div>
                          </div>

                          {/* Provider Swiper */}
                          {isLoadings ? (
                            <swiper-container
                              class="mySwiper new_class4"
                              space-between="5"
                              loop="false"
                              autoplay='{"delay": 0, "disableOnInteraction": false}'
                              speed="3500"
                              slides-per-view="auto"
                              centered-slides="false"
                              free-mode="true"
                              breakpoints={{
                                768: {
                                  slidesPerView: 8, // Tablet view
                                },
                                1024: {
                                  slidesPerView: 10, // Laptop/Desktop view
                                },
                              }}
                            >
                              {Array.from({ length: 6 }).map((_, index) => (
                                <swiper-slide
                                  key={index}
                                  style={{ width: "auto" }}
                                >
                                  <div
                                    className="game-card-wrapper"
                                    style={{
                                      minWidth: "70px",
                                      height: "70px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      padding: "5px",
                                    }}
                                  >
                                    <div
                                      className="game-card d-flex justify-content-center align-items-center"
                                      style={{ width: "100%", height: "100%" }}
                                    >
                                      <Skeleton circle width={50} height={50} />
                                    </div>
                                  </div>
                                </swiper-slide>
                              ))}
                            </swiper-container>
                          ) : providerList.length > 0 ? (
                            <swiper-container
                              class="mySwiper new_class4"
                              space-between="5"
                              loop="false"
                              autoplay='{"delay": 0, "disableOnInteraction": false}'
                              speed="3500"
                              slides-per-view="auto"
                              centered-slides="false"
                              free-mode="true"
                            >
                              {providerList.map((provider, index) => (
                                <swiper-slide
                                  key={index}
                                  style={{ width: "auto" }}
                                >
                                  <div className="game-card-wrapper">
                                    <div
                                      className="game-card d-flex justify-content-center align-items-center"
                                      onClick={() =>
                                        navigate(
                                          `/filtered-provider-games?provider=${provider.provider}`
                                        )
                                      }
                                    >
                                      <img
                                        src={
                                          provider.images?.logo ||
                                          provider.images?.name ||
                                          provider.images?.logo_name
                                        }
                                        alt={provider.provider}
                                        className="w-50"
                                      />
                                    </div>
                                  </div>
                                </swiper-slide>
                              ))}
                            </swiper-container>
                          ) : (
                            <p className="text-center text-white my-4">
                              No providers available
                            </p>
                          )}
                        </div>
                      </SkeletonTheme>

                      {/* providers end */}

                      {/* Turbo games  */}
                      {/* <div>
              <div className="top-matches-title d-flex align-items-center justify-content-between   my-3">
                <div className="d-flex">
                  <img src="assets/img/coin.png" width="22px" />{" "}
                  <h5 className="m-0 ms-2">Turbo Games</h5>
                </div>
                <div>
                  <Link to={routes.games.turbo}>
                    <span className="text-white fs-13 fw-500 right_heading">
                      All <i className="ri-arrow-right-s-line" />
                    </span>
                  </Link>
                </div>
              </div>
              <swiper-container
                class="mySwiper"
                spaceBetween={5}
                loop={true}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={3500}
                slidesPerView={2.8}
                centeredSlides={false}
                freeMode={true}
              >
                {turboGamesList.length > 0 ? (
                  turboGamesList.map((turbogames, index) => (
                    <swiper-slide key={index}>
                      <div className="game-card-wrapper rounded-2 new-cardclr">
                        <div className="game-card p-0 m-0 p-1">
                          <img
                            src={turbogames.imagePath}
                            className="game-card-img"
                            alt={turbogames.value}
                          />
                          <div
                            className="d-flex flex-column text-white text-center py-1 px-1"
                            style={{ textAlign: "center" }}
                          >
                            <span className="fs-12 fw-bold text-truncate">
                              {turbogames.key}
                            </span>
                            <span className="fs-10">Duel</span>{" "}
                          </div>
                        </div>
                        <div className="game-play-button d-flex flex-column">
                          <div
                            className="btn-play"
                            onClick={() => handleGameClickTurbo(turbogames)}
                          >
                            <i className="fa-solid fa-play"></i>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  ))
                ) : (
                  <p className="text-center text-white">
                    No providers available
                  </p>
                )}
              </swiper-container>
            </div> */}
                      {/* Turbo end */}

                      {/* Spribe games  */}
                      {/* <div>
              <div className="top-matches-title d-flex align-items-center justify-content-between   my-3">
                <div className="d-flex">
                  <img src="assets/img/coin.png" width="22px" />{" "}
                  <h5 className="m-0 ms-2"> Spribe Games</h5>
                </div>
                <div>
                  <Link to={routes.games.spribe}>
                    <span className="text-white fs-13 fw-500 right_heading">
                      All <i className="ri-arrow-right-s-line" />
                    </span>
                  </Link>
                </div>
              </div>
              <swiper-container
                class="mySwiper"
                spaceBetween={5}
                loop={true}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                speed={3500}
                slidesPerView={2.5}
                centeredSlides={false}
                freeMode={true}
              >
                {spribeGamesList.length > 0 ? (
                  spribeGamesList.map((spribgames, index) => (
                    <swiper-slide key={index}>
                      <div className="game-card-wrapper rounded-2 new-cardclr">
                        <div className="game-card p-0 m-0 p-1">
                          <img
                            src={spribgames.image}
                            className="game-card-img"
                            alt={spribgames.name}
                          />
                          <div
                            className="d-flex flex-column text-white text-center py-1 px-1"
                            style={{ textAlign: "center" }}
                          >
                            <span className="fs-12 fw-bold text-truncate">
                              {spribgames.key}
                            </span>
                            <span className="fs-10">{spribgames.name}</span>{" "}
                          </div>
                        </div>
                        <div className="game-play-button d-flex flex-column">
                          <div
                            className="btn-play"
                            onClick={() =>
                              handleGameClickSpribe(spribgames.slug_name)
                            }
                          >
                            <i className="fa-solid fa-play"></i>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  ))
                ) : (
                  <p className="text-center text-white">
                    No providers available
                  </p>
                )}
              </swiper-container>
            </div> */}
                      {/* Turbo end */}

                      {/* Marquee end */}

                      {/*---bonus------*/}
                      <div>
                        <div className="row">
                          <div className="top-matches-title d-flex align-items-center gap-2  my-3 justify-content-between">
                            <div className="d-flex align-items-center">
                              <img
                                src="assets/img/coin.png"
                                alt="coin"
                                srcSet=""
                                width=""
                              />{" "}
                              <h5 className="m-0 ms-2">Bonus bncghg</h5>
                            </div>
                            <Link to="/bonus">
                              <div>
                                <span className="text-white fs-13 fw-500 right_heading">
                                  All <i className="ri-arrow-right-s-line" />
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="bouns_sec p-2">
                            <div className="card bonus_card">
                              <div className="card-body p-0">
                                <div className="bonus_card_sec">
                                  {/* Top section with text and image */}
                                  <div className="bonus_sec_top p-4 py-2">
                                    <div className="bonus_sec_content">
                                      <span>Casino</span>
                                      <span className="text-shadow">
                                        <p>100% Crash Power Bonus</p>
                                      </span>
                                    </div>
                                    {/* <div className="bonus_sec_img">
                        <img
                          src="https://upload.4rabet4.com/storage/239257/PNG_75-Crash-Power-Bonus-(1)-1-(1).png"
                          alt="img"
                          className="img-fluid rounded"
                        />
                      </div> */}
                                  </div>
                                  {/* Bottom section with timer and buttons */}
                                  <div className="bonusBlock_other__bottom p-2">
                                    <div className="timer_block_container d-flex align-items-center">
                                      {/* Action buttons */}
                                      <div className="bonus_bottom_btn red_clr w-100">
                                        <button className="btn btn-red w-100">
                                          Get bonus
                                        </button>
                                        <button className="btn btn-outline-light w-100">
                                          Details
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bouns_sec p-2">
                            <div className="card bonus_card">
                              <div className="card-body p-0">
                                <div className="bonus_card_sec">
                                  {/* Top section with text and image */}
                                  <div className="bonus_sec_top p-4 py-2">
                                    <div className="bonus_sec_content">
                                      <span>Casino</span>
                                      <span className="text-shadow">
                                        <p>75% Crash Power Bonus</p>
                                      </span>
                                    </div>
                                  </div>
                                  {/* Bottom section with timer and buttons */}
                                  <div className="bonusBlock_other__bottom p-2">
                                    <div className="timer_block_container d-flex align-items-center">
                                      {/* Action buttons */}
                                      <div className="bonus_bottom_btn red_clr w-100">
                                        <button className="btn btn-red w-100">
                                          Get bonus
                                        </button>
                                        <button className="btn btn-outline-light w-100">
                                          Details
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*----bonus-end---*/}

                      {!showFullScreenGame && <BottomFooter />}
                      {!showFullScreenGame && <BottomProvider />}

                      {/* <BottomFooter /> */}
                    </section>

                    {/* Footer Start */}

                    <Footer />
                    {/* {!showFullScreenGame && <Footer />} */}
                    {/* Footer Start */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

import React, { useCallback, useEffect, useRef, useState } from "react";
import BASE_URL from "../../API/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import StickyHeader from "./Header/Header";
import Footer from "./footer/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import axiosInstance from "../../API/axiosConfig";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Providers = () => {
  const [providerList, setProviderList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isSearchingGames, setIsSearchingGames] = useState(false);

  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);
  const hasFetchedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fixedSearchTerm = searchTerm.trim();

    if (fixedSearchTerm.length >= 3) {
      setIsSearchingGames(true);
      const timer = setTimeout(() => {
        handleAutoSearch(fixedSearchTerm);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setSearchedGames([]);
      setIsSearchingGames(false);
    }
  }, [searchTerm]);

  const handleAutoSearch = async (term) => {
    try {
      const res = await axios.get(
        // `${BASE_URL}/all-games?is_mobile=1&provider=${term}`
        `${BASE_URL}/providers-list?provider=${term}`
      );
      setSearchedGames(res.data.providers || []);
    } catch (error) {
      console.error("Auto search failed:", error);
    } finally {
      setIsSearchingGames(false);
    }
  };


  //  const handleAutoSearch = async (term) => {
  //   try {
  //     const res = await axios.get(
  //       // `${BASE_URL}/all-games?is_mobile=1&provider=${term}`
  //       `${BASE_URL}/providers-list?provider=${term}`
  //     );
  //     setSearchedGames(res.data.providers || []);
  //   } catch (error) {
  //     console.error("Auto search failed:", error);
  //   }
  // };

  // ✅ Fetch all providers

  const fetchAllProvider = async (page = 1) => {
    if (page === pageRef.current && page !== 1) return;
    page === 1 ? setIsInitialLoading(true) : setIsPageLoading(true);

    try {
      const response = await axiosInstance.get(`/providers-list?page=${page}`);
      const data = response.data;

      console.log(data);

      if (Array.isArray(data.providers)) {
        setProviderList((prev) => [...prev, ...data.providers]);
        pageRef.current = page;
        setCurrentPage(page);
        setHasMore(data.pagination?.next_page_url !== null);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching provider list:", error);
    } finally {
      setIsInitialLoading(false);
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    const hasFetched = sessionStorage.getItem("providersFetched");
    if (!hasFetched && !hasFetchedRef.current) {
      sessionStorage.setItem("providersFetched", "true");
      hasFetchedRef.current = true;
      fetchAllProvider();
    }
  }, []);

  useEffect(() => {
    return () => sessionStorage.removeItem("providersFetched");
  }, []);

  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (
      bottom &&
      !isInitialLoading &&
      !isPageLoading &&
      hasMore &&
      !isFetchingRef.current
    ) {
      isFetchingRef.current = true;
      fetchAllProvider(pageRef.current + 1).finally(() => {
        isFetchingRef.current = false;
      });
    }
  }, [isInitialLoading, isPageLoading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {isPageLoading && (
        <div className="text-white text-center my-3 w-100">
          <span className="spinner-border text-light" role="status" />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <StickyHeader />

      <div className="container">
        <div className="search_container_box">
          <form className="form my-2" onSubmit={(e) => e.preventDefault()}>
            <button type="submit">
              <i className="ri-search-2-line fs-18" />
            </button>
            <input
              type="text"
              placeholder="Search provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="my-3 input"
            />
            <button
              className="reset"
              type="reset"
              onClick={() => setSearchTerm("")}
            />
          </form>
        </div>

        <h5>Providers</h5>
        <div className="row">
          {searchTerm.trim().length >= 3 ? (
            isSearchingGames ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  className="col-md-4 col-sm-4 col-6 mb-3"
                  key={`searched-game-skel-${index}`}
                >
                  <div className="game-card-wrapper rounded p-2 bg-dark text-white text-center">
                    <Skeleton
                      height={100}
                      borderRadius={4}
                      baseColor="#313131"
                      highlightColor="#525252"
                      className="mb-2"
                    />
                    {/* Skeleton for game name text */}
                    <Skeleton
                      height={14}
                      width="80%"
                      baseColor="#313131"
                      highlightColor="#525252"
                      className="mx-auto mt-2"
                    />
                    {/* Skeleton for provider name text */}
                    <Skeleton
                      height={12}
                      width="60%"
                      baseColor="#313131"
                      highlightColor="#525252"
                      className="mt-1 mx-auto"
                    />
                  </div>
                </div>
              ))
            ) : searchedGames.length > 0 ? (
              searchedGames.map((game, index) => (
                <motion.div
                  className="col-md-4 col-sm-4 col-6 mb-3"
                  key={game.uuid || `${game.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div
                    className="d-flex gap-1 flex-column align-items-center justify-content-center"
                    onClick={() =>
                      navigate(
                        `/filtered-provider-games?provider=${game.provider}`
                      )
                    }
                  >
                    <img
                      src={
                        game.images?.logo ||
                        game.images?.name ||
                        game.images?.logo_name ||
                        "assets/img/no-image.png"
                      }
                      alt={game.provider || "Provider Logo"}
                      style={{ width: "40%" }}
                    />
                    <h6 className="mt-2 fs-14 text-truncate">{game.name}</h6>
                    <p className="fs-12 mb-0">{game.provider}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-white text-center mt-5">
                No games found for this provider.
              </p>
            )
          ) : isInitialLoading ? (
            Array.from({ length: 9 }).map((_, index) => (
              <div
                className="col-md-4 col-sm-4 col-4 px-1"
                key={`provider-skel-${index}`}
              >
                <div
                  className="game-card-wrapper rounded-2 new-cardclr mt-2 d-flex justify-content-center pt-2"
                  style={{ height: "100px" }}
                >
                  <div className="d-flex gap-1 flex-column align-items-center justify-content-center">
                    <Skeleton
                      circle={true}
                      height={40}
                      width={40}
                      baseColor="#313131"
                      highlightColor="#525252"
                    />
                    {/* Skeleton for provider name text */}
                    <Skeleton
                      height={12} 
                       width={100}
                      baseColor="#313131"
                      highlightColor="#525252"
                      className="mt-1 "
                    />

                      {/* <Skeleton  width={100} height={20} baseColor="#313131" highlightColor="#525252" /> */}
                  </div>

                  
                  <div className="game-play-button d-flex flex-column" style={{ opacity: 0 }}>
                    <div className="btn-play">
                        <Skeleton circle width={40} height={40} baseColor="#313131" highlightColor="#525252" />

                       
                    </div>

  {/* <Skeleton  width={100} height={20} baseColor="#313131" highlightColor="#525252" /> */}
                  </div>
                </div>
              </div>
            ))
          ) : (

            
           // ✅ Show all providers (default view)

            // .filter(
            //   (provider) =>
            //     provider.images?.logo ||
            //     provider.images?.name ||
            //     provider.images?.logo_name
            // // )
            providerList.map((provider, index) => (
              <motion.div
                className="col-md-4 col-sm-4 col-4 px-1"
                key={provider.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="game-card-wrapper rounded-2 new-cardclr mt-2 d-flex justify-content-center pt-2"
                  style={{ height: "100px" }}
                  onClick={() =>
                    navigate(
                      `/filtered-provider-games?provider=${provider.provider}`
                    )
                  }
                >
                  <div className="d-flex gap-1 flex-column align-items-center justify-content-center">
                    <img
                      src={
                        provider.images?.logo ||
                        provider.images?.name ||
                        provider.images?.logo_name ||
                        "assets/img/game.png"
                      }
                      alt={provider.provider || "Provider Logo"}
                      style={{ width: "40%" }}
                    />
                    <span className="fs-12 fw-bold text-truncate text-white">
                      {provider.provider}
                    </span>
                  </div>
                  <div className="game-play-button d-flex flex-column">
                    <div className="btn-play">
                      <i className="fa-solid fa-play" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: "100px" }}></div>
      <Footer />
    </>
  );
};

export default Providers;
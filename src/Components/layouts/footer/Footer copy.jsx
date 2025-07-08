import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/route";

const Footer = () => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const search = location.search;
    const params = new URLSearchParams(search);
    const type = params.get("type");

    // ✅ Check for Casino FIRST
    if (type === "card") {
      setActiveItem("unique-spribe");
    } else if (path === routes.home) {
      setActiveItem("unique-home");
    } else if (
      path === routes.games.all ||
      path === routes.games.filteredGames
    ) {
      setActiveItem("unique-games");
    } else if (path === routes.games.providers) {
      setActiveItem("unique-providers");
    } else if (path === routes.games.turbo) {
      setActiveItem("unique-turbo");
    } else if (path === routes.pages.menu) {
      setActiveItem("unique-settings");
    } else {
      setActiveItem("");
    }
  }, [location]);

  return (
    <div className="unique-footer container" style={{ bottom: 0 }}>
      <ul>
        <li
          id="unique-home"
          className={`footer-item ${
            activeItem === "unique-home" ? "active" : ""
          }`}
        >
          <Link to={routes.home}>
            <img
              src={
                activeItem === "unique-home"
                  ? "/assets/img/footer/home-active.png"
                  : "/assets/img/footer/home.png"
              }
              alt="Home"
              width="27px"
            />
            <p className="mb-0">Home</p>
          </Link>
        </li>

        <li
          id="unique-games"
          className={`footer-item ${
            activeItem === "unique-games" ? "active" : ""
          }`}
        >
          <Link to={routes.games.all}>
            <img
              src={
                activeItem === "unique-games"
                  ? "/assets/img/footer/search-active.png"
                  : "/assets/img/footer/search_1.png"
              }
              alt="Search"
              width="27px"
            />
            <p className="mb-0">Search</p>
          </Link>
        </li>

        <li
          id="unique-spribe"
          className={`footer-item ${
            activeItem === "unique-spribe" ? "active" : ""
          }`}
        >
          <Link to="/filtered-games?type=card">
            <img
              src={
                activeItem === "unique-spribe"
                  ? "/assets/img/footer/casino_active.png"
                  : "/assets/img/footer/casino_1.png"
              }
              alt="Casino"
              width="27px"
            />
            <p className="mb-0">Casino</p>
          </Link>
        </li>

        <li
          id="unique-providers"
          className={`footer-item ${
            activeItem === "unique-providers" ? "active" : ""
          }`}
        >
          <Link to={routes.games.providers}>
            <img
              src={
                activeItem === "unique-providers"
                  ? "/assets/img/footer/game_active.png"
                  : "/assets/img/footer/game (1).png"
              }
              alt="Provider"
              width="27px"
            />
            <p className="mb-0">Provider</p>
          </Link>
        </li>

        <li
          id="unique-settings"
          className={`footer-item ${
            activeItem === "unique-settings" ? "active" : ""
          }`}
        >
          <Link to={routes.pages.menu}>
            <img
              src={
                activeItem === "unique-settings"
                  ? "/assets/img/footer/app-active.png"
                  : "/assets/img/footer/app.png"
              }
              alt="Menu"
              width="27px"
            />
            <p className="mb-0">Menu</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;

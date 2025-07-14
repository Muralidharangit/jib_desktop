import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes/route";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <nav
        className={`sidebar sidebar-offcanvas ${isSidebarOpen ? "open" : ""}`}
        id="sidebar"
      >
        <ul className="nav">
          <li className="nav-item">
            <Link to={routes.home} className="nav-link">
              <span className="menu-title">Home</span>
              {/* <i class="mdi mdi-home menu-icon"></i> */}
              {/* <i class="fi fi-rr-house-chimney  menu-icon"></i> */}
              <i className="fi fi-sr-home menu-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={routes.games.topGames} className="nav-link">
              {/* <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#all-games-layouts"
                aria-expanded="false"
                aria-controls="all-games-layouts"
              > */}
              <span className="menu-title">All Games</span>
              {/* <i className="menu-arrow" /> */}
              <i className="fi fi-sr-dice-alt menu-icon" />
            </Link>
            {/* <div className="collapse" id="all-games-layouts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/boxed-layout.html">
                    Top Games
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/rtl-layout.html">
                    Live Games
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/rtl-layout.html">
                    Card Games
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/rtl-layout.html">
                    Crash Games
                  </a>
                </li>
              </ul>
            </div> */}
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="index.html">
              <span className="menu-title">Live Games</span>
              <i className="fi fi-bs-dot-circle menu-icon" />
            </a>
          </li> */}
          <li className="nav-item">
            <Link to="/filtered-games?type=card" className="nav-link">
              <span className="menu-title">Live Casino</span>
              <i className="fi fi-rr-playing-cards menu-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/filtered-games?type=crash" className="nav-link">
              <span className="menu-title">Crash Games</span>
              <i class="fa-solid fa-explosion  menu-icon"></i>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link to="/filtered-games?type=hot" className="nav-link">
              <span className="menu-title">Hot Games</span>
              <i class="fa-solid fa-fire menu-icon"></i>
            </Link>
          </li> */}

          {/* <i class="fa-solid fa-fire"></i> */}
          <li className="nav-item">
            <Link to={routes.games.providers} className="nav-link">
              <span className="menu-title">providers</span>
              <i className="fi fi-rs-clipboard menu-icon" />
            </Link>
          </li>
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#Casino-layouts"
              aria-expanded="false"
              aria-controls="Casino-layouts"
            >
              <span className="menu-title">Casino</span>
              <i className="menu-arrow" />
              <i className="fi fi-sr-bullseye menu-icon" />
            </a>
            <div className="collapse" id="Casino-layouts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/boxed-layout.html">
                    Treding Games
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/rtl-layout.html">
                    Top Games
                  </a>
                </li>
              </ul>
            </div>
          </li> */}
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#apps"
              aria-expanded="false"
              aria-controls="apps"
            >
              <span className="menu-title">Sports</span>
              <i className="menu-arrow" />
              <i className="fi fi-ss-basketball menu-icon" />
            </a>
            <div className="collapse" id="page-layouts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/boxed-layout.html">
                    Top Games
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/rtl-layout.html">
                    Live Games
                  </a>
                </li>
              </ul>
            </div>
          </li> */}
          <li className="nav-item">
            <Link to={routes.games.bonus} className="nav-link">
              <span className="menu-title">Bonus</span>
              <i className="fi fi-rs-gift menu-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={routes.pages.howToPlay} className="nav-link">
              <span className="menu-title">How to Play</span>
              <i className="fi fi-rr-interrogation menu-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={routes.pages.terms} className="nav-link">
              <span className="menu-title">Terms and Condition</span>
              <i className="fi fi-rs-memo-pad menu-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to={routes.pages.privacyPolicy} className="nav-link">
              <span className="menu-title">Privacy and policy</span>
              <i className="fi fi-rs-clipboard menu-icon" />
            </Link>
          </li>
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#providers-layouts"
              aria-expanded="false"
              aria-controls="providers-layouts"
            >
              <span className="menu-title">Providers</span>
              <i className="menu-arrow" />
              <i className="fi fi-sr-bullseye menu-icon" />
            </a>
            <div className="collapse" id="providers-layouts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/boxed-layout.html">
                    Spribe
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/rtl-layout.html">
                    GamesHub
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="pages/layout/rtl-layout.html">
                    Turbo
                  </a>
                </li>
              </ul>
            </div>lll
          </li> */}
        </ul>
        <div className="br-top-gray"></div>
        <div className="min-menunone">
          <div className="container px-5">
            <a href="./login.html">
              <button
                type="button"
                className="btn swiper-scrollbar-drag w-100 bgbody-color text-white rounded-pill fs-15 fw-500"
              >
                Join Now
              </button>
            </a>
          </div>
          <div className="text-center  bottom-0 w-100 my-3 start-0">
            <div className="icon-social">
              <div className="d-flex justify-content-center  text-white fs-25 gap-3">
                <i className="ri-facebook-fill" />
                <i className="ri-instagram-line" />
                <i className="ri-linkedin-box-line" />
                <i className="ri-twitter-x-line" />
                <i className="ri-youtube-line" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

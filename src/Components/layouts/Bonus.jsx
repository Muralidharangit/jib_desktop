import React from "react";
// import { Link } from "react-router-dom";
// import routes from "../routes/route";
import StickyHeader from "./Header/Header";
import Footer from "./footer/Footer";
import BottomFooter from "./footer/BottomFooter";
import BottomProvider from "./footer/BottomProvider";

function Bonus() {
  return (
    <div>
      <StickyHeader />
      <section className="container vh-100 pt-40">
        {/*---bonus------*/}
        <div>
          <div className="row">
            <div className="top-matches-title d-flex align-items-center gap-2 my-3">
              <h5 className="m-0 mt-1">Bonus Option</h5>
            </div>
            <div>
              <ul
                className="nav my-2 bonus_filter"
                id="myTab"
                role="tablist"
                style={{ background: "#ffffff1a" }}
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active bg-transparent"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                  >
                    Bounses
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                  >
                    History
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabIndex={0}
                >
                  <div className="bouns_sec mb-3">
                    <div className="card bonus_card">
                      <div className="card-body p-0">
                        <div
                          className="bonus_card_sec"
                          style={{
                            background:
                              "linear-gradient(                            238.08deg,                            rgb(20, 189, 242) 0%,                            rgb(16, 161, 207) 33%,                            rgb(9, 83, 151) 65%,                            rgb(4, 24, 74) 100%                          ) !important",
                          }}
                        >
                          {/* Top section with text and image */}
                          <div className="bonus_sec_top p-4 py-2">
                            <div className="bonus_sec_content">
                              <span>Casino</span>
                              <span className="text-shadow">
                                <p>75% Crash</p>
                                <p>Power Bonus</p>
                              </span>
                            </div>
                            <div className="bonus_sec_img">
                              <img
                                src="https://upload.4rabet4.com/storage/239257/PNG_75-Crash-Power-Bonus-(1)-1-(1).png"
                                alt="img"
                                className="img-fluid rounded"
                              />
                            </div>
                          </div>
                          {/* Bottom section with timer and buttons */}
                          <div className="bonusBlock_other__bottom p-2">
                            <div className="timer_block_container">
                              <div className="timer_block_inner d-flex align-items-center justify-content-center">
                                <div
                                  className="timer_block_countdown"
                                  style={{ "max-width": "300px" }}
                                >
                                  <div className="countdown_timer d-flex align-items-center justify-content-evenly">
                                    <div className="timer-block_days">
                                      <div
                                        className="countdown_value"
                                        id="days"
                                      >
                                        3
                                      </div>
                                      <div className="countdown_label">
                                        Days
                                      </div>
                                    </div>
                                    <div className="timer-block_hours">
                                      <div
                                        className="countdown_value"
                                        id="hours"
                                      >
                                        12
                                      </div>
                                      <div className="countdown_label">
                                        Hours
                                      </div>
                                    </div>
                                    <div className="separator">:</div>
                                    <div className="timer-block_minutes">
                                      <div
                                        className="countdown_value"
                                        id="minutes"
                                      >
                                        31
                                      </div>
                                      <div className="countdown_label">
                                        Mins
                                      </div>
                                    </div>
                                    <div className="separator">:</div>
                                    <div className="timer-block_seconds">
                                      <div
                                        className="countdown_value"
                                        id="seconds"
                                      >
                                        33
                                      </div>
                                      <div className="countdown_label">
                                        Secs
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Action buttons */}
                            <div className="bonus_bottom_btn">
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
                  <div className="bouns_sec mb-3">
                    <div className="card bonus_card">
                      <div className="card-body p-0">
                        <div
                          className="bonus_card_sec"
                          style={{
                            background:
                              "linear-gradient(                            238.08deg,                            rgb(242, 220, 20) 0%,                            rgb(207, 165, 16) 33%,                            rgb(151, 94, 9) 65%,                            rgb(74, 42, 4) 100%                          )",
                          }}
                        >
                          {/* Top section with text and image */}
                          <div className="bonus_sec_top p-4 py-2">
                            <div className="bonus_sec_content">
                              <span>Casino</span>
                              <span className="text-shadow">
                                <p>100% Crash</p>
                                <p>Power Bonus</p>
                              </span>
                            </div>
                            <div className="bonus_sec_img">
                              <img
                                src="https://upload.4rabet4.com/storage/235234/PNG-(6).png"
                                alt="img"
                                className="img-fluid rounded"
                              />
                            </div>
                          </div>
                          {/* Bottom section with timer and buttons */}
                          <div className="bonusBlock_other__bottom p-2">
                            {/* Action buttons */}
                            <div className="bonus_bottom_btn">
                              <button className="btn btn-outline-light w-100 rounded-pill">
                                Get Bonus
                              </button>
                              <button className="btn btn-outline-light w-100 rounded-pill">
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bouns_sec mb-3">
                    <div className="card bonus_card">
                      <div className="card-body p-0">
                        <div
                          className="bonus_card_sec"
                          style={{
                            background:
                              "linear-gradient(                            to left,                            #96c93d,                            #00b09b                          )",
                          }}
                        >
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
                            <div className="timer_block_container h-100">
                              {/* Action buttons */}
                              <div className="bonus_bottom_btn flex-column h-100">
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
                  <div className="bouns_sec mb-3">
                    <div className="card bonus_card">
                      <div className="card-body p-0">
                        <div
                          className="bonus_card_sec"
                          style={{ background: "#095fcd" }}
                        >
                          {/* Top section with text and image */}
                          <div className="bonus_sec_top p-4 py-2">
                            <div className="bonus_sec_content">
                              <span>Casino</span>
                              <span className="text-shadow">
                                <p>100% Crash</p>
                                <p>Power Bonus</p>
                              </span>
                            </div>
                            <div className="bonus_sec_img">
                              <img
                                src="https://upload.4rabet4.com/storage/235577/IPL2024-(1).png"
                                alt="img"
                                className="img-fluid rounded"
                              />
                            </div>
                          </div>
                          {/* Bottom section with timer and buttons */}
                          <div className="bonusBlock_other__bottom p-2">
                            <div className="timer_block_container h-100">
                              <div className="bonus_bottom_btn flex-column">
                                <button className="btn btn-outline-light w-100">
                                  Get Bonus
                                </button>
                                <button className="btn btn-outline-light w-100">
                                  Details
                                </button>
                              </div>
                            </div>
                            {/* Action buttons */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex={0}
                >
                  {/*Bonus History page */}
                  <div className="card p-2 light-gray py-2 mb-3">
                    <div className="offer-detail fs-12 text-white">
                      <div className="d-flex justify-content-between mb-2">
                        <span> DATE/TIME </span>
                        <span> 04-05-2024 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> TIME </span>
                        <span> 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> GAME </span>
                        <span> CASINO GAMES </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> GAME TYPE </span>
                        <span> .... </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> Amount Received </span>
                        <span> 250 INR </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> DATE/TIME </span>
                        <span> 04-05-2024 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> Status </span>
                        <span className="text-danger fw-bold"> Expired </span>
                      </div>
                    </div>
                  </div>
                  {/*Bonus History page */}
                  {/*Bonus History page */}
                  <div className="card p-2 light-gray py-2 mb-3">
                    <div className="offer-detail fs-12 text-white">
                      <div className="d-flex justify-content-between mb-2">
                        <span> DATE/TIME </span>
                        <span> 04-05-2024 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> TIME </span>
                        <span> 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> GAME </span>
                        <span> CASINO GAMES </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> GAME TYPE </span>
                        <span> .... </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> Amount Received </span>
                        <span> 250 INR </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> DATE/TIME </span>
                        <span> 04-05-2024 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> Status </span>
                        <span className="text-danger fw-bold"> Expired </span>
                      </div>
                    </div>
                  </div>
                  {/*Bonus History page */}
                  {/*Bonus History page */}
                  <div className="card p-2 light-gray py-2 mb-3">
                    <div className="offer-detail fs-12 text-white">
                      <div className="d-flex justify-content-between mb-2">
                        <span> DATE/TIME </span>
                        <span> 04-05-2024 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> TIME </span>
                        <span> 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> GAME </span>
                        <span> CASINO GAMES </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> GAME TYPE </span>
                        <span> .... </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> Amount Received </span>
                        <span> 250 INR </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> DATE/TIME </span>
                        <span> 04-05-2024 22:23 </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span> Status </span>
                        <span className="text-success fw-bold"> Apply </span>
                      </div>
                    </div>
                  </div>
                  {/*Bonus History page */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*----bonus-end---*/}
        {/* Bottom footer */}
        <BottomProvider />
        <BottomFooter />
      </section>
      <Footer />
    </div>
  );
}

export default Bonus;

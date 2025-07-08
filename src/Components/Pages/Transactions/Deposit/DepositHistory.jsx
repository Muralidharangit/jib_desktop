import React, { useContext, useEffect, useState } from "react";
import BASE_URL from "../../../../API/api";
import axios from "axios";
import { depositHistory } from "../../../../API/depositAPI";
import { verifyToken } from "../../../../API/authAPI";
import AuthContext from "../../../../Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const DepositHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { user, profile } = useContext(AuthContext);
  const itemsPerPage = 10;

  // ✅ Moved outside useEffect
  const fetchPlayerData = async () => {
    setLoading(true); // show loading again if retrying

    try {
      const token = user?.token;
      // const token = localStorage.getItem("token"); // 🟢 moved inside try

      // if (!token) {
      //   setError("Authentication error. Please log in again.");
      //   return;
      // }

      const verify = await verifyToken();
      if (verify.status !== "success") {
        setError("Invalid or expired token. Please login again.");
        setHistory([]); // 🟢 clear the old history
        return;
      }

      const response = await depositHistory(token);
      if (response.status === "success") {
        setHistory(response.depositHistory);
        setError(null); // 🟢 clear old errors
        // console.log(response, response);
      } else {
        setError(response.msg || "Failed to load profile");
      }
    } catch (err) {
      // console.log(err, "error message", err.message);
      // toast.error(errorMessage);
      toast.error(`${err.message}. Please log in again to continue.`, {
        toastId: "unauthorized-toast", // prevents duplicate toasts
      });
      setError(err.message || "Something went wrong. Please try again.");
      setHistory([]); // 🟢 clear old data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      fetchPlayerData(); // ✅ Reuse here
    };

    fetchPlayerData(); // ✅ Initial fetch

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const filteredHistory = history.filter((bet) => {
    if (selectedTab === "all") return true;
    return bet.status === selectedTab;
  });

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedData = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // pagination code starts
  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <li key={index} className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      ) : (
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        </li>
      )
    );
  };
  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <section className="container position-relative">
        <div className="h-100">
          <div className="pt-3 pb-2">
            <div className="row px-2">
              {/* <div className="d-flex justify-content-between align-items-center px-0 ">
                <button
                  className="go_back_btn"
                  onClick={() => window.history.back()}
                >
                  <i className="ri-arrow-left-s-line text-white fs-24" />
                </button>
              </div> */}

              {/* <div className="d-flex justify-content-between">
                <div className="my-2">
                  <h2 className="text-white fs-20">Deposit History</h2>
                </div>

                <button
                  className="btn btn-sm btn-outline-info"
                  onClick={fetchPlayerData}
                >
                  🔄 Refresh
                </button>
              </div> */}

              {/* header Starts */}
              <div className="d-flex align-items-center justify-content-between position-relative  px-0">
                {/* Back Button on Left */}
                <div className="d-flex justify-content-between align-items-center px-0">
                  <button
                    className="go_back_btn bg-grey"
                    onClick={() => window.history.back()}
                  >
                    <i className="ri-arrow-left-s-line text-white fs-20" />
                  </button>
                </div>

                {/* Centered Title */}
                <h5 className="m-0 text-white fs-16">Deposit History</h5>
                <div className="d-flex justify-content-between align-items-center px-0">
                  <button
                    className="go_back_btn bg-grey"
                    onClick={fetchPlayerData}
                  >
                    <i class="fa-solid fa-arrows-rotate text-white fs-16"></i>
                  </button>
                </div>
              </div>

              {/* header Ends */}
              <div className="overflow-auto px-0 mt-4">
                <div
                  className="nav nav-pills flex-nowrap gap-2 scroll-hidden rounded-2"
                  id="latest-bet-tabs"
                  style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    // background: "#192432",
                  }}
                >
                  {["all", "pending", "processing", "verified", "rejected"].map(
                    (tab) => (
                      <button
                        key={tab}
                        className={`nav-link latest_bet_btn ${
                          selectedTab === tab ? "active" : ""
                        }`}
                        style={{ padding: "2px 12px" }}
                        onClick={() => {
                          setSelectedTab(tab);
                          setCurrentPage(1);
                        }}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="tab-content p-0 mt-2 mb-3">
                {loading ? (
                  <p className="text-white text-center mt-4">Loading...</p>
                ) : error ? (
                  <>
                    <p className="text-danger">{error}</p>
                    <button
                      className="btn btn-warning mt-2"
                      onClick={fetchPlayerData}
                    >
                      Retry
                    </button>
                    <img
                      src="https://cdni.iconscout.com/illustration/premium/thumb/unauthorized-access-illustration-download-in-svg-png-gif-file-formats--hacker-attack-cyber-intrusion-security-breach-data-pack-crime-illustrations-7706304.png"
                      alt="unauth"
                    />
                  </>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((bet) => (
                    <div className="bet-card" key={bet.id}>
                      <div
                        className="mybet-single-card"
                        style={{ padding: "15px 11px 6px", marginTop: "6px" }}
                      >
                        <div className="d-flex justify-content-between">
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="bg-secondary py-2 px-3 rounded-2">
                              <i
                                class="fa-solid fa-arrow-down"
                                style={{ transform: "rotate(45deg)" }}
                              ></i>
                            </div>
                            {/* ✅ Add margin-start (left) using ms-3 */}
                            <div className="ms-3 ms-sm-2">
  <p className="mb-0 fs-11">UTR NO</p>
  <p className="fs-14 mb-0">{bet.utr}</p>
  <p className="fs-11 mb-0 text-grey mt-2">
    {new Date(bet.created_date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}
  </p>
</div>
                          </div>

                          <div className="d-flex  align-items-end flex-column">
                            <h4 className="mb-1 amount-fs-size">
                              ₹ {bet.amount}
                            </h4>

                            <span
                              className={`fw-bold ${
                                bet.status === "pending"
                                  ? "history_badge pending_badge"
                                  : bet.status === "verified"
                                  ? "history_badge success_badge"
                                  : bet.status === "processing"
                                  ? "history_badge processing_badge"
                                  : "text-danger"
                              }`}
                            >
                              {bet.status}
                            </span>
                            {/* <p className="fs-11 mb-0 text-grey mt-1">
                              {new Date(bet.created_at).toLocaleString(
                                "en-GB",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p> */}
                            <p className="fs-11 mb-0 text-grey mt-1">
                              {new Date(bet.created_date).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        {/* <div>
                          <i class="fa-solid fa-arrow-down"></i>
                        </div>
                        <div className="card-title">
                          <h6>UTR NO</h6>
                          <span>{bet.utr}</span>
                        </div>
                        <ul className="bet-details">
                          <li>
                            <span>Deposit Amt</span>
                            <span>{bet.amount}</span>
                          </li>
                          <li>
                            <span>Status</span>
                            <span
                              className={`fw-bold ${
                                bet.status === "pending"
                                  ? "history_badge pending_badge"
                                  : bet.status === "verified"
                                  ? "history_badge success_badge"
                                  : bet.status === "processing"
                                  ? "history_badge processing_badge"
                                  : "text-danger"
                              }`}
                            >
                              {bet.status}
                            </span>
                          </li>
                        </ul> */}
                      </div>

                      {/* <div className="d-flex flex-column justify-content-center align-items-center px-2">
                        <div className="text-bold mb-3">Screenshot</div>

                        <div className=" d-flex justify-content-center px-2">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCHzy2sdDsoabC5DYf5IwEkch1uyaffsXO8w&s"
                            alt="Payment_screenshot"
                            className="w-25"
                          />
                        </div>
                      </div> */}
                    </div>
                  ))
                ) : (
                  <div className="text-center mt-4">
                    <p className="text-white text-center">
                      No Deposit History Found
                    </p>
                  </div>
                )}
                {/* {!loading && totalPages > 1 && (
                  <div className="d-flex justify-content-center my-3">
                    <button
                      className="btn btn-sm btn-outline-light mx-1"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      ⬅ Prev
                    </button>
                    <span className="text-white mx-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-light mx-1"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next ➡
                    </button>
                  </div>
                )} */}

                {/* test 2 Starts final */}
                {/* {!loading && totalPages > 1 && (
                  <div className="d-flex justify-content-center align-items-center my-3 gap-3">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      ⬅ Prev
                    </button>

                    <ul className="pagination justify-content-center my-3">
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next ➡
                    </button>
                  </div>
                )}{" "} */}
                {/* test 2 Ends */}
                {!loading && !error && totalPages > 1 && (
                  <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 my-3">
                    {/* Prev Button */}
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      style={
                        currentPage === 1
                          ? {}
                          : { background: "#505050", color: "white" }
                      }
                    >
                      ⬅ Prev
                    </button>

                    {/* Page Numbers */}
                    <ul className="pagination mb-0">{renderPagination()}</ul>

                    {/* Next Button */}
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      style={
                        currentPage === totalPages
                          ? {}
                          : { background: "#505050", color: "white" }
                      }
                    >
                      Next ➡
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepositHistory;

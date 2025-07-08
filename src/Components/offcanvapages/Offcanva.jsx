import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import routes from "../routes/route";
import AuthContext from "../../Auth/AuthContext";

const OffCanvas = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); //   useNavigate is now used inside the component
  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="Profile_offcanvas"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div data-bs-dismiss="offcanvas" aria-label="Close">
            <div className="back_icon">
              <i className="ri-arrow-left-s-line text-white" />
            </div>
          </div>
        </div>
        <div className="h-25 w-100 bg-red-gradient position-absolute">
          {/* <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
        </div>
        <div className="offcanvas-body">
          <div
            className="text-white mt-5 pt-5 d-flex align-items-center mb-3"
            data-bs-toggle="offcanvas"
            data-bs-target="#Profile_view__Edit_offcanvas"
            aria-controls="offcanvasExample"
          >
            <div className="pe-2">
              <img src="assets/img/icons/man.png" alt="profile_icon" />
            </div>
            <div>
              <h4 className="mb-0">Kamal Durai</h4>
              <h5>
                <span className="text-grey fs-14">ID: 1234567</span>
              </h5>
            </div>
            <div className="ms-auto">
              <i className="ri-arrow-right-s-line text-white fs-20" />
            </div>
          </div>
          {/* Total Balance starts */}
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-0">
                <img
                  src="assets/img/footer/coins.png"
                  alt="money"
                  width="30px"
                />
                Total Balance
              </h5>
            </div>
            <div>
              <h4>₹10,000.00</h4>
            </div>
          </div>
          {/* Total Balance ends */}
          {/* card 1 starts */}
          <div className="card bg_light_grey account_input-textbox-container mt-3">
            <div className="card-body px-2">
              <div>
                <div className="bonus_bottom_btn">
                  <button
                    className="btn btn-outline-light w-100"
                    id="depositButton"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#deposit_offcanvas"
                    aria-controls="offcanvasExample"
                  >
                    Deposit
                  </button>
                  <button
                    className="btn btn-outline-light w-100"
                    id="withdrawButton"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#Withdrawal_offcanvas"
                    aria-controls="offcanvasExample"
                  >
                    Withdraw
                  </button>
                </div>
                {/* icons Starts*/}
                <div className="row">
                  <div
                    className="text-center  mt-3 col"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#Bet_History_offcanvas"
                    aria-controls="offcanvasExample"
                  >
                    <img
                      src="assets/img/icons/history.png"
                      alt="bet_history"
                      srcSet=""
                      width="27px"
                    />
                    <p className="mb-0">Bet History</p>
                  </div>
                  <div
                    className="text-center mt-3 col"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#transaction_offcanvas"
                    aria-controls="offcanvasExample"
                  >
                    <img
                      src="assets/img/icons/rupee_2.png"
                      alt=""
                      srcSet=""
                      width="27px"
                    />
                    <p className="mb-0">Transaction</p>
                  </div>
                  <div
                    className="text-center mt-3 col"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#bonus_offcanvas"
                    aria-controls="offcanvasExample"
                  >
                    <img
                      src="assets/img/icons/gift.png"
                      alt=""
                      srcSet=""
                      width="27px"
                    />
                    <p className="mb-0">Bonus</p>
                  </div>
                </div>
                {/* icons Ends */}
              </div>
            </div>
            {/* Card 2 */}
          </div>
          {/* card 1 starts */}
          {/* Referral and earn card 2 starts */}
          <div className="card bg_light_grey account_input-textbox-container mt-3">
            <div className="card-body px-3">
              {/* card 3starts */}
              <div className="d-flex justify-content-between align-items-center mt-3 referral_earn_box">
                <div>
                  <p className="mb-0 fs-16">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/035/566/895/small/red-gift-box-and-gold-ribbon-chinese-new-year-elements-icon-3d-rendering-png.png"
                      alt="gift"
                      width="80px"
                    />
                  </p>
                </div>
                <div className="w-100">
                  <p className="font-semibold text-white">
                    <span>Referral &amp; get 500 + 25% reward</span>
                  </p>
                  {/* input text box starts */}
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="copyInput"
                      className="input2"
                      placeholder="https://jiboomba.com"
                      defaultValue="https://jiboomba.com"
                    />
                    <button className="Subscribe-btn" id="copyButton">
                      Copy
                    </button>
                  </div>
                  {/* input text box ends */}
                </div>
              </div>
              {/* card 3ends */}
            </div>
          </div>
          {/*  Referral and earn 2 starts */}
          {/* Notification card 2 starts */}
          <div className="card bg_light_grey account_input-textbox-container mt-3">
            <div className="card-body px-3">
              {/* card 1starts */}
              <div
                className="d-flex justify-content-between align-items-center"
                data-bs-toggle="offcanvas"
                data-bs-target="#Notification_offcanvas"
                aria-controls="offcanvasExample"
              >
                <div>
                  <p className="mb-0 fs-16">
                    <i className="ri-notification-2-fill pe-2" /> Notification
                  </p>
                </div>
                <div className="icon-box">
                  <i className="ri-arrow-right-s-line text-white" />
                </div>
              </div>
              {/* card 1ends */}
              {/* card 2starts */}
              <div
                className="d-flex justify-content-between align-items-center mt-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#Refer_Earn_offcanvas"
                aria-controls="offcanvasExample"
              >
                <div>
                  <p className="mb-0 fs-16">
                    <i className="ri-group-fill pe-2" /> Refer and Earn
                  </p>
                </div>
                <div className="icon-box">
                  <i className="ri-arrow-right-s-line text-white" />
                </div>
              </div>
              {/* card 2ends */}
              {/* card 3starts */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <p className="mb-0 fs-16">
                    <i className="ri-chat-unread-fill pe-2" /> Chat
                  </p>
                </div>
                <div className="icon-box">
                  <i className="ri-arrow-right-s-line text-white" />
                </div>
              </div>
              {/* card 3ends */}
              {/* card 2starts */}
              <div
                className="d-flex justify-content-between align-items-center mt-3"
                data-bs-toggle="modal"
                data-bs-target="#change_password_pop_up"
              >
                <div>
                  <p className="mb-0 fs-16">
                    {/*  */}
                    <i className="ri-group-fill pe-2" /> Change Password
                  </p>
                </div>
                <div className="icon-box">
                  <i className="ri-arrow-right-s-line text-white" />
                </div>
              </div>
              {/* card 2ends */}
            </div>
          </div>
          {/* Notification 2starts */}
          <div className="d-flex justify-content-center align-items-center white mt-3">
            {/* <Link to={routes.home}> */}
            <p className="fs-17" onClick={() => logout(navigate)}>
              <img
                src="assets/img/icons/sign-out.png"
                alt="sign_Out_image"
                width="25px"
                className="pe-2"
              />
              Sign Out
            </p>
            {/* </Link> */}
          </div>
        </div>
      </div>
      {/* =========================================================================================================================== */}
      {/* Bet History Starts*/}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="Bet_History_offcanvas"
        aria-labelledby="Bet_History_offcanvas"
      >
        <div className="offcanvas-header">
          <div
            className="d-flex w-100 align-items-center justify-content-center position-relative"
            style={{ paddingTop: 8 }}
          >
            <div
              className="position-absolute"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ left: 0 }}
            >
              <div className="back_icon">
                <i className="ri-arrow-left-s-line" />
              </div>
            </div>
            <div className="d-flex mx-2 justify-content-center align-items-center">
              <h5 className="mb-0">Bet History</h5>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pt-0">
          <div className="row px-2 mt-3">
            <div
              className="nav nav-pills flex-wrap"
              id="latest-bet-tabs"
              role="tablist"
            >
              <button
                className="nav-link latest_bet_btn active"
                id="tab-all"
                data-bs-toggle="pill"
                data-bs-target="#content-all"
                type="button"
                role="tab"
                aria-controls="content-all"
                aria-selected="true"
              >
                All
              </button>
              <button
                className="nav-link latest_bet_btn"
                id="tab-open-bets"
                data-bs-toggle="pill"
                data-bs-target="#content-open-bets"
                type="button"
                role="tab"
                aria-controls="content-open-bets"
                aria-selected="false"
                tabIndex={-1}
              >
                Pending
              </button>
              <button
                className="nav-link latest_bet_btn"
                id="tab-won"
                data-bs-toggle="pill"
                data-bs-target="#content-won"
                type="button"
                role="tab"
                aria-controls="content-won"
                aria-selected="false"
                tabIndex={-1}
              >
                Won
              </button>
              <button
                className="nav-link latest_bet_btn"
                id="tab-lost"
                data-bs-toggle="pill"
                data-bs-target="#content-lost"
                type="button"
                role="tab"
                aria-controls="content-lost"
                aria-selected="false"
                tabIndex={-1}
              >
                Lost
              </button>
            </div>
            <div className="tab-content p-0" id="latest-bet-tabContent">
              {/* All Bets Tab */}
              <div
                className="tab-pane fade show active"
                id="content-all"
                role="tabpanel"
                aria-labelledby="tab-all"
              >
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>Casino Game</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Match Result:</span>
                          <span>Draw</span>
                        </li>
                        <li>
                          <span>Fc Goa - Chennai FC: (Odds)</span>
                          <span>1 x 3.5</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="status-title">
                          <span>Bet Amt</span>
                          <span>Return</span>
                          <span>Status</span>
                        </li>
                        <li className="price">
                          <span>$500</span>
                          <span>$600</span>
                          <span className="status-win  fw-600">Won</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>Casino Game</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Match Result:</span>
                          <span>Draw</span>
                        </li>
                        <li>
                          <span>Fc Goa - Chennai FC: (Odds)</span>
                          <span>1 x 3.5</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="status-title">
                          <span>Bet Amt</span>
                          <span>Return</span>
                          <span>Status</span>
                        </li>
                        <li className="price">
                          <span>$500</span>
                          <span>$600</span>
                          <span className="status-loss text-danger  fw-600">
                            Loss
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Open Bets Tab */}
              <div
                className="tab-pane fade"
                id="content-open-bets"
                role="tabpanel"
                aria-labelledby="tab-open-bets"
              >
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>Casino</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Match Result:</span>
                          <span>Draw</span>
                        </li>
                        <li>
                          <span>Fc Goa - Chennai FC: (Odds)</span>
                          <span>1 x 3.5</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="status-title">
                          <span>Bet Amt</span>
                          <span>Return</span>
                          <span>Status</span>
                        </li>
                        <li className="price">
                          <span>$500</span>
                          <span>$600</span>
                          <span className="status-win  fw-600">Won</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Won Bets Tab */}
              <div
                className="tab-pane fade"
                id="content-won"
                role="tabpanel"
                aria-labelledby="tab-won"
              >
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>Casino</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Match Result:</span>
                          <span>Draw</span>
                        </li>
                        <li>
                          <span>Fc Goa - Chennai FC: (Odds)</span>
                          <span>1 x 3.5</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="status-title">
                          <span>Bet Amt</span>
                          <span>Return</span>
                          <span>Status</span>
                        </li>
                        <li className="price">
                          <span>$500</span>
                          <span>$600</span>
                          <span className="status-win  fw-600">Won</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Lost Bets Tab */}
              <div
                className="tab-pane fade"
                id="content-lost"
                role="tabpanel"
                aria-labelledby="tab-lost"
              >
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>Casino</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Match Result:</span>
                          <span>Draw</span>
                        </li>
                        <li>
                          <span>Fc Goa - Chennai FC: (Odds)</span>
                          <span>1 x 3.5</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="status-title">
                          <span>Bet Amt</span>
                          <span>Return</span>
                          <span>Status</span>
                        </li>
                        <li className="price">
                          <span>$500</span>
                          <span>$600</span>
                          <span className="status-loss text-danger  fw-600">
                            Loss
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bet History  Ends*/}
      {/* ================================================================= */}
      {/*    transaction_offcanvas Starts*/}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="transaction_offcanvas"
        aria-labelledby="transaction_offcanvas"
      >
        <div className="offcanvas-header">
          <div
            className="d-flex w-100 align-items-center justify-content-center position-relative"
            style={{ paddingTop: 8 }}
          >
            <div
              className="position-absolute"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ left: 0 }}
            >
              <div className="back_icon">
                <i className="ri-arrow-left-s-line" />
              </div>
            </div>
            <div className="d-flex mx-2 justify-content-center align-items-center">
              <h5 className="mb-0">Transaction History</h5>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pt-0">
          <div className="row px-2 mt-3">
            <div
              className="nav nav-pills flex-wrap"
              id="latest-bet-tabs"
              role="tablist"
            >
              <button
                className="nav-link latest_bet_btn active"
                id="tab-all"
                data-bs-toggle="pill"
                data-bs-target="#all_data"
                type="button"
                role="tab"
                aria-controls="all_data"
                aria-selected="true"
              >
                All
              </button>
              <button
                className="nav-link latest_bet_btn"
                id="tab-open-bets"
                data-bs-toggle="pill"
                data-bs-target="#pending"
                type="button"
                role="tab"
                aria-controls="pending"
                aria-selected="false"
                tabIndex={-1}
              >
                Pending
              </button>
              <button
                className="nav-link latest_bet_btn"
                id="tab-won"
                data-bs-toggle="pill"
                data-bs-target="#Success"
                type="button"
                role="tab"
                aria-controls="Success"
                aria-selected="false"
                tabIndex={-1}
              >
                Success
              </button>
              <button
                className="nav-link latest_bet_btn"
                id="tab-lost"
                data-bs-toggle="pill"
                data-bs-target="#Cancelled"
                type="button"
                role="tab"
                aria-controls="Cancelledt"
                aria-selected="false"
                tabIndex={-1}
              >
                Cancelled
              </button>
            </div>
            <div className="tab-content p-0" id="latest-bet-tabContent">
              {/* all_data Tab */}
              <div
                className="tab-pane fade show active"
                id="all_data"
                role="tabpanel"
                aria-labelledby="tab-all"
              >
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>4,000</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Payment Method</span>
                          <span>Online</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="price">
                          <span className="status-win  fw-600">Success</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>4,000</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Payment Method</span>
                          <span>Online</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="price">
                          <span className="status-loss text-danger  fw-600">
                            Cancelled
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>4,000</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Payment Method</span>
                          <span>Online</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="price">
                          <span className="status-pending  fw-600">
                            Pending
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* pending Tab */}
              <div
                className="tab-pane fade"
                id="pending"
                role="tabpanel"
                aria-labelledby="tab-open-bets"
              >
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>4,000</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Payment Method</span>
                          <span>Online</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="price">
                          <span className="status-pending  fw-600">
                            Pending
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Success Tab */}
              <div
                className="tab-pane fade"
                id="Success"
                role="tabpanel"
                aria-labelledby="tab-won"
              >
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>4,000</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Payment Method</span>
                          <span>Online</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="price">
                          <span className="status-win  fw-600">Success</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cancelled Tab */}
              <div
                className="tab-pane fade"
                id="Cancelled"
                role="tabpanel"
                aria-labelledby="tab-lost"
              >
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>4,000</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Payment Method</span>
                          <span>Online</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="price">
                          <span className="status-loss text-danger  fw-600">
                            Cancelled
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bet-card-sec p-0 mt-2 mb-3">
                  <div className="bet-card">
                    <div className="mybet-single-card">
                      <div className="card-title">
                        <h6>4,000</h6>
                        <span>Wed 25 Oct - 12:25:18</span>
                      </div>
                      <ul className="bet-details">
                        <li>
                          <span>Payment Method</span>
                          <span>Online</span>
                        </li>
                      </ul>
                      <ul className="bet-status">
                        <li className="price">
                          <span className="status-loss text-danger  fw-600">
                            Cancelled
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*    transaction_offcanvas  Ends*/}
      {/* ========================================================== */}
      {/* ================================================================= */}
      {/*    bonus_offcanvas Starts*/}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="bonus_offcanvas"
        aria-labelledby="bonus_offcanvas"
      >
        <div className="offcanvas-header">
          <div
            className="d-flex w-100 align-items-center justify-content-center position-relative"
            style={{ paddingTop: 8 }}
          >
            <div
              className="position-absolute"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ left: 0 }}
            >
              <div className="back_icon">
                <i className="ri-arrow-left-s-line" />
              </div>
            </div>
            <div className="d-flex mx-2 justify-content-center align-items-center">
              <h5 className="mb-0">Bonus</h5>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pt-0">
          <div>
            <div className="row">
              {/* <div class="top-matches-title d-flex align-items-center gap-2  my-3">
              <h5 class="m-0 mt-1">Bonus Option</h5>
          </div> */}
              <div>
                <ul
                  className="nav  my-2 bonus_filter"
                  id="myTab"
                  role="tablist"
                  style={{ background: "#192432" }}
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link bg-transparent active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected="true"
                    >
                      Bonuses
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
                      tabIndex={-1}
                    >
                      History
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade active show"
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
                                "linear-gradient(238.08deg, rgb(20, 189, 242) 0%, rgb(16, 161, 207) 33%, rgb(9, 83, 151) 65%, rgb(4, 24, 74) 100%) !important",
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
                                    style={{ maxWidth: 300 }}
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
                                "linear-gradient(238.08deg, rgb(242, 220, 20) 0%, rgb(207, 165, 16) 33%, rgb(151, 94, 9) 65%, rgb(74, 42, 4) 100%)",
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
                              <div className="bonus_bottom_btn ">
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
                                "#00b09b" /* fallback for old browsers */,
                            }}
                          >
                            {/* Top section with text and image */}
                            <div className="bonus_sec_top p-4 py-2">
                              <div className="bonus_sec_content">
                                <span>Casino</span>
                                <span className="text-shadow">
                                  <p>90% Crash Power Bonus</p>
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
                    <div className="bouns_sec mb-3 ">
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
                                  <button className="btn btn-outline-light w-100 ">
                                    Get Bonus
                                  </button>
                                  <button className="btn btn-outline-light w-100 ">
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
                          <span>DATE/TIME</span>
                          <span>04-05-2024 22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>TIME</span>
                          <span>22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>GAME</span>
                          <span>CASINO GAMES</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>GAME TYPE</span>
                          <span>....</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Amount Received</span>
                          <span>250 INR</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>DATE/TIME</span>
                          <span>04-05-2024 22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Status</span>
                          <span className="text-danger fw-bold">Expired</span>
                        </div>
                      </div>
                    </div>
                    {/*Bonus History page */}
                    {/*Bonus History page */}
                    <div className="card p-2 light-gray py-2 mb-3">
                      <div className="offer-detail fs-12 text-white">
                        <div className="d-flex justify-content-between mb-2">
                          <span>DATE/TIME</span>
                          <span>04-05-2024 22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>TIME</span>
                          <span>22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>GAME</span>
                          <span>CASINO GAMES</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>GAME TYPE</span>
                          <span>....</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Amount Received</span>
                          <span>250 INR</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>DATE/TIME</span>
                          <span>04-05-2024 22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Status</span>
                          <span className="text-danger fw-bold">Expired</span>
                        </div>
                      </div>
                    </div>
                    {/*Bonus History page */}
                    {/*Bonus History page */}
                    <div className="card p-2 light-gray py-2 mb-3">
                      <div className="offer-detail fs-12 text-white">
                        <div className="d-flex justify-content-between mb-2">
                          <span>DATE/TIME</span>
                          <span>04-05-2024 22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>TIME</span>
                          <span>22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>GAME</span>
                          <span>CASINO GAMES</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>GAME TYPE</span>
                          <span>....</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Amount Received</span>
                          <span>250 INR</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>DATE/TIME</span>
                          <span>04-05-2024 22:23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Status</span>
                          <span className="text-success fw-bold">Apply</span>
                        </div>
                      </div>
                    </div>
                    {/*Bonus History page */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*    bonus_offcanvas  Ends*/}
      {/* ========================================================== */}
      {/* ================================================================= */}
      {/* Refer_Earn_offcanvas Starts*/}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="Refer_Earn_offcanvas"
        aria-labelledby="Refer_Earn_offcanvas"
      >
        <div className="offcanvas-header">
          <div
            className="d-flex w-100 align-items-center justify-content-center position-relative"
            style={{ paddingTop: 8 }}
          >
            <div
              className="position-absolute"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ left: 0 }}
            >
              <div className="back_icon">
                <i className="ri-arrow-left-s-line" />
              </div>
            </div>
            <div className="d-flex mx-2 justify-content-center align-items-center">
              <h5 className="mb-0">Refer and Earn</h5>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pt-0">
          {/* Profile Details Starts */}
          <div className="card bg_light_grey account_input-textbox-container my-3">
            <div className="card-body px-3">
              <div className="py-2">
                <div className="d-flex justify-content-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/035/566/895/small/red-gift-box-and-gold-ribbon-chinese-new-year-elements-icon-3d-rendering-png.png"
                    alt="thumbnails"
                    width="100px"
                  />
                </div>
                <div className="d-flex justify-content-center my-4">
                  <div className="w-100">
                    <p className="font-semibold text-grey text-center">
                      <span>Referral &amp; get</span>
                      <span className="text-white mx-1">500 + 25%</span>
                      <span>commission</span>
                    </p>
                    {/* input text box starts */}
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="copyInput"
                        className="input2"
                        placeholder="https://jiboomba.com"
                        defaultValue="https://jiboomba.com"
                      />
                      <button className="Subscribe-btn" id="copyButton">
                        Copy
                      </button>
                    </div>
                    {/* input text box ends */}
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-red w-100 mt-4 mb-3 text-capitalize"
                      >
                        Invite friends now
                      </button>
                    </div>
                    <ul className="text-white mt-3">
                      <li>Share your refferal code</li>
                      <li>fadfvbdfdfd</li>
                      <li>Friends get ₹10 on their first game</li>
                      <li>you get ₹10 off coupon</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Profile Details Starts */}
          {/* ==================================== */}
        </div>
      </div>
      {/*    Refer_Earn_offcanvas  Ends*/}
      {/* ========================================================== */}
      {/* ================================================================= */}
      {/* deposit_offcanva Starts*/}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="deposit_offcanvas"
        aria-labelledby="transaction_offcanvas"
      >
        <div className="offcanvas-header">
          <div
            className="d-flex w-100 align-items-center justify-content-center position-relative"
            style={{ paddingTop: 8 }}
          >
            <div
              className="position-absolute"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ left: 0 }}
            >
              <div className="back_icon">
                <i className="ri-arrow-left-s-line" />
              </div>
            </div>
            <div className="d-flex mx-2 justify-content-center align-items-center">
              <h5 className="mb-0">Deposit</h5>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pt-0">
          <section className="vh-100">
            <div className="h-100">
              {/* 2 button Ends */}
              {/* Header 2 buttons Starts */}
              <div className="pt-3 pb-2">
                <div className="container-fluid p-0">
                  <h5 className="mb-3">Select Payment Method</h5>
                  <nav
                    className="nav nav-pills d-flex justify-content-between tab_red_active"
                    role="tablist"
                  >
                    <button
                      className="nav-link btn-color text-white active w-150"
                      id="upi-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#upi"
                      type="button"
                      role="tab"
                      aria-controls="upi"
                      aria-selected="true"
                    >
                      <img
                        src="assets/img/icons/icons8-deposit-64.png"
                        alt="deposit"
                        width="30px"
                      />
                      UPI
                    </button>
                    <button
                      className="nav-link btn-color text-white w-150"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <img
                        src="assets/img/icons/add_account.png"
                        alt="AddAccount"
                        width="22px"
                      />
                      Bank
                    </button>
                  </nav>
                  <div className="tab-content mt-3" id="myTabContent">
                    {/* tab 1 */}
                    <div
                      className="tab-pane fade show active"
                      id="upi"
                      role="tabpanel"
                      aria-labelledby="upi-tab"
                    >
                      {/* card 1 Starts */}
                      <div className="card bg_light_grey account_input-textbox-container my-3">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">
                            UPI Payment Details
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="d-flex justify-content-center mb-3">
                            <img
                              src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code-1024x1024.jpg"
                              className="w-50"
                              alt="QR_code"
                            />
                          </div>
                          <form className="form-control_container" action="">
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="text"
                              />
                              <label className="label" htmlFor="input">
                                Amount
                              </label>
                            </div>
                            <div className="mb-2">
                              <label
                                htmlFor=""
                                className="form-label text-white"
                              >
                                Payment Screenshot
                              </label>
                              <div className="custom-file-input">
                                <label htmlFor="formFile">
                                  <span className="btn">Upload File</span>
                                  <span className="file-name">
                                    No file chosen
                                  </span>
                                </label>
                                <input
                                  type="file"
                                  id="formFile"
                                  className="form-control"
                                  hidden=""
                                />
                              </div>
                            </div>
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="text"
                              />
                              <label className="label" htmlFor="input">
                                Enter UTR No
                              </label>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-red w-50 mt-4 mb-3 text-capitalize"
                                data-bs-target="#payment"
                                data-bs-toggle="modal"
                              >
                                Pay
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* card 1 Starts */}
                      <div className="card bg_light_grey account_input-textbox-container mt-3">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Select Amount</h5>
                        </div>
                        <div className="card-body">
                          <form className="form-control_container" action="">
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="text"
                              />
                              <label className="label" htmlFor="input">
                                Name
                              </label>
                            </div>
                            <div className="recharge-amount-container button">
                              <button type="button" className="btn">
                                10
                              </button>
                              <button type="button" className="btn">
                                20
                              </button>
                              <button type="button" className="btn">
                                50
                              </button>
                              <button type="button" className="btn">
                                100
                              </button>
                              <button type="button" className="btn">
                                1000
                              </button>
                              <button type="button" className="btn">
                                10000
                              </button>
                              <button type="button" className="btn">
                                100
                              </button>
                              <button type="button" className="btn">
                                1000
                              </button>
                              <button type="button" className="btn">
                                10000
                              </button>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-red w-50 mt-4 mb-3 text-capitalize"
                              >
                                Sumbit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* card 3 Starts */}
                      <div className="card bg_light_grey account_input-textbox-container mt-3">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">
                            Select Payment Details
                          </h5>
                        </div>
                        <div className="card-body">
                          <form className="form-control_container" action="">
                            <div className="mb-2">
                              <label
                                htmlFor=""
                                className="form-label text-white"
                              >
                                Payment Screenshot
                              </label>
                              <div className="custom-file-input">
                                <label htmlFor="formFile">
                                  <span className="btn">Upload File</span>
                                  <span className="file-name">
                                    No file chosen
                                  </span>
                                </label>
                                <input
                                  type="file"
                                  id="formFile"
                                  className="form-control"
                                  hidden=""
                                />
                              </div>
                            </div>
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="text"
                              />
                              <label className="label" htmlFor="input">
                                Enter UTR No
                              </label>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-red w-50 mt-4 mb-3 text-capitalize"
                                data-bs-target="#payment"
                                data-bs-toggle="modal"
                              >
                                Pay
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* card 3 Starts */}
                      {/* card 3 Starts */}
                      <div className="card bg-transparent account_input-textbox-container mt-3 mb-4">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Rules</h5>
                        </div>
                        <div
                          className="card-body"
                          style={{ border: "1px solid #776f6f" }}
                        >
                          <ul className="list-unstyled">
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              The amount will be deposited to your account
                              instantly
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* card 3 Starts */}
                    </div>
                    {/* tab 2 */}
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      {/* card 2*/}
                      <div className="card bg_light_grey account_input-textbox-container">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Bank Details</h5>
                        </div>
                        <div className="card-body">
                          <form className="form-control_container" action="">
                            <select
                              className="form-select mb-3"
                              aria-label="Default select example"
                              style={{
                                background: "#202223",
                                color: "#cecdc8",
                                height: 42,
                              }}
                            >
                              <option selected="">Select Bank Name</option>
                              <option value={1}>One</option>
                              <option value={2}>Two</option>
                              <option value={3}>Three</option>
                            </select>
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="text"
                              />
                              <label className="label" htmlFor="input">
                                A/C Name
                              </label>
                            </div>
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="number"
                              />
                              <label className="label" htmlFor="input">
                                A/C No
                              </label>
                            </div>
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="number"
                              />
                              <label className="label" htmlFor="input">
                                IFSC
                              </label>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-red w-50 mt-4 mb-3 text-capitalize"
                                data-bs-target="#payment"
                                data-bs-toggle="modal"
                              >
                                Pay
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* card 2*/}
                      {/* card 3 Starts */}
                      <div className="card bg-transparent account_input-textbox-container mt-3">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Rules</h5>
                        </div>
                        <div
                          className="card-body"
                          style={{ border: "1px solid #776f6f" }}
                        >
                          <ul className="list-unstyled">
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              The amount will be deposited to your account
                              intantly
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* card 3 Starts */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Header  Ends */}
            </div>
          </section>
        </div>
      </div>
      {/*    deposit_offcanva  Ends*/}
      {/* ========================================================== */}
      {/* ================================================================= */}
      {/*  Withdrawal Starts */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="Withdrawal_offcanvas"
        aria-labelledby="Withdrawal_offcanvas"
      >
        <div className="offcanvas-header">
          <div
            className="d-flex w-100 align-items-center justify-content-center position-relative"
            style={{ paddingTop: 8 }}
          >
            <div
              className="position-absolute"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ left: 0 }}
            >
              <div className="back_icon">
                <i className="ri-arrow-left-s-line" />
              </div>
            </div>
            <div className="d-flex mx-2 justify-content-center align-items-center">
              <h5 className="mb-0">Withdraw</h5>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pt-0">
          <section className="vh-100">
            <div className="h-100">
              {/* 2 button Ends */}
              {/* Header 2 buttons Starts */}
              <div className="pt-3 pb-2">
                <div className="container-fluid p-0">
                  <h5 className="mb-3">Select Payment Method</h5>
                  <nav
                    className="nav nav-pills d-flex justify-content-between tab_red_active"
                    role="tablist"
                  >
                    <button
                      className="nav-link btn-color text-white active w-150"
                      id="upi-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Bank_details"
                      type="button"
                      role="tab"
                      aria-controls="Bank_details"
                      aria-selected="true"
                    >
                      <img
                        src="assets/img/icons/add_account.png"
                        alt="add_account"
                        width="22px"
                      />
                      Bank Details
                    </button>
                    <button
                      className="nav-link btn-color text-white w-150"
                      id="Bank-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#AddBank-tab"
                      type="button"
                      role="tab"
                      aria-controls="AddBank-tab"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <img
                        src="assets/img/icons/add_account.png"
                        alt="add_account"
                        width="22px"
                      />
                      Add Bank
                    </button>
                  </nav>
                  <div className="tab-content mt-3" id="myTabContent">
                    {/* tab 1 */}
                    <div
                      className="tab-pane fade show active"
                      id="Bank_details"
                      role="tabpanel"
                      aria-labelledby="upi-tab"
                    >
                      {/* Select Amount Starts */}
                      <div className="card bg_light_grey account_input-textbox-container mt-3">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Select Amount</h5>
                        </div>
                        <div className="card-body">
                          <form className="form-control_container" action="">
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="number"
                              />
                              <label className="label" htmlFor="input">
                                Enter the Amount
                              </label>
                            </div>
                            <div className="recharge-amount-container button">
                              <button type="button" className="btn">
                                10
                              </button>
                              <button type="button" className="btn">
                                20
                              </button>
                              <button type="button" className="btn">
                                50
                              </button>
                              <button type="button" className="btn">
                                100
                              </button>
                              <button type="button" className="btn">
                                1000
                              </button>
                              <button type="button" className="btn">
                                10000
                              </button>
                              <button type="button" className="btn">
                                100
                              </button>
                              <button type="button" className="btn">
                                1000
                              </button>
                              <button type="button" className="btn">
                                10000
                              </button>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-red w-50 mt-4 mb-3 text-capitalize"
                              >
                                Sumbit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* Select Amount Ends */}
                      {/* card 1 Starts */}
                      <div className="card bg_light_grey br-grey account_input-textbox-container my-3">
                        <div className="card-body p-2">
                          {/*  Details Starts */}
                          <div className="">
                            {/* card 1 Starts */}
                            <div className="d-flex justify-content-between border rounded mt-2 py-2 px-2">
                              <div className="d-flex">
                                {/* input icon starts */}
                                <div className="px-2 py-1">
                                  <div className="form-check px-3">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault1"
                                    />
                                  </div>
                                </div>
                                {/* bank Details Starts */}
                                <div>
                                  <div>
                                    <p className="mb-0 text-grey">Bank Name</p>
                                    <h6>Indian Bank</h6>
                                  </div>
                                  <div>
                                    <p className="mb-0 text-grey">A/c Name</p>
                                    <h6>Jibooma</h6>
                                  </div>
                                  <div>
                                    <p className="mb-0 text-grey">A/c No</p>
                                    <h6>XXXXXXXXXXXX907</h6>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                {/* <i class="ri-edit-box-fill fs-1 text-blue"></i> */}
                                <i
                                  className="ri-file-edit-line fs-1 text-white"
                                  data-bs-toggle="modal"
                                  data-bs-target="#Edit_bank_pop_up"
                                />
                                <i
                                  className="ri-delete-bin-6-fill fs-1 text-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_pop_up"
                                />
                              </div>
                            </div>
                            {/* card 1 ends */}
                            <div className="d-flex justify-content-between border rounded mt-2 py-2 px-2">
                              <div className="d-flex">
                                {/* input icon starts */}
                                <div className="px-2 py-1">
                                  <div className="form-check px-3">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault1"
                                    />
                                  </div>
                                </div>
                                {/* bank Details Starts */}
                                <div>
                                  <div>
                                    <p className="mb-0 text-grey">Bank Name</p>
                                    <h6>Indian Bank</h6>
                                  </div>
                                  <div>
                                    <p className="mb-0 text-grey">A/c Name</p>
                                    <h6>Jibooma</h6>
                                  </div>
                                  <div>
                                    <p className="mb-0 text-grey">A/c No</p>
                                    <h6>XXXXXXXXXXXX907</h6>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                {/* <i class="ri-edit-box-fill fs-1 text-blue"></i> */}
                                <i
                                  className="ri-file-edit-line fs-1 text-white"
                                  data-bs-toggle="modal"
                                  data-bs-target="#Edit_bank_pop_up"
                                />
                                <i
                                  className="ri-delete-bin-6-fill fs-1 text-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_pop_up"
                                />
                              </div>
                            </div>
                            {/* card 1 Starts */}
                          </div>
                          {/*  Details ends */}
                          <div className="d-flex justify-content-center">
                            <button
                              type="button"
                              className="btn btn-red w-50 mt-4 mb-3 text-capitalize"
                            >
                              Processed
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Card 1 Ends */}
                      {/* card 3 Starts */}
                      <div
                        className="card bg-transparent account_input-textbox-container mt-3"
                        style={{ marginBottom: 100 }}
                      >
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Rules</h5>
                        </div>
                        <div
                          className="card-body"
                          style={{ border: "1px solid #776f6f" }}
                        >
                          <ul className="list-unstyled">
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              The amount will be deposited to your account
                              intantly
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* card 3 Starts */}
                    </div>
                    {/* tab 2 */}
                    <div
                      className="tab-pane fade"
                      id="AddBank-tab"
                      role="tabpanel"
                      aria-labelledby="AddBank-tab"
                    >
                      {/* card 2*/}
                      <div className="card bg_light_grey account_input-textbox-container">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Bank Details</h5>
                        </div>
                        <div className="card-body">
                          <form className="form-control_container" action="">
                            <select
                              className="form-select mb-3"
                              aria-label="Default select example"
                              style={{
                                background: "#202223",
                                color: "#cecdc8",
                                height: 42,
                              }}
                            >
                              <option selected="">Select Bank Name</option>
                              <option value={1}>One</option>
                              <option value={2}>Two</option>
                              <option value={3}>Three</option>
                            </select>
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="text"
                              />
                              <label className="label" htmlFor="input">
                                A/C Name
                              </label>
                            </div>
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="number"
                              />
                              <label className="label" htmlFor="input">
                                A/C No
                              </label>
                            </div>
                            <div className="input-field mb-3">
                              <input
                                required=""
                                className="input"
                                type="number"
                              />
                              <label className="label" htmlFor="input">
                                IFSC
                              </label>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-login w-50 mt-4 mb-3 text-capitalize"
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* card 2*/}
                      {/* card 3 Starts */}
                      <div className="card bg-transparent account_input-textbox-container mt-3">
                        <div className="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center">
                          <h5 className="text-center mb-0">Rules</h5>
                        </div>
                        <div
                          className="card-body"
                          style={{ border: "1px solid #776f6f" }}
                        >
                          <ul className="list-unstyled">
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              The amount will be deposited to your account
                              intantly
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                            <li className="text-white fs-14 mb-2">
                              <img
                                src="assets/img/icons/tick.png"
                                alt="tick"
                                width="20px"
                              />
                              Transfer the amount through our safe payment
                              gateway
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* card 3 Starts */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Header  Ends */}
            </div>
          </section>
        </div>
      </div>
      {/*  Withdrawal  Ends */}
      {/* ========================================================== */}
      {/* Profile_view and Edit  Starts*/}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="Profile_view__Edit_offcanvas"
        aria-labelledby="Profile_view__Edit_offcanvas"
      >
        <div className="offcanvas-header">
          <div
            className="d-flex w-100 align-items-center justify-content-center position-relative"
            style={{ paddingTop: 8 }}
          >
            <div
              className="position-absolute"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ left: 0 }}
            >
              <div className="back_icon">
                <i className="ri-arrow-left-s-line" />
              </div>
            </div>
            <div className="d-flex mx-2 justify-content-center align-items-center">
              <h5 className="mb-0">Profile Details</h5>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pt-0">
          {/* Profile Details Starts */}
          <div className="card bg_light_grey account_input-textbox-container my-3">
            <div className="card-body px-3">
              <div className="py-2">
                <div className="avatar-upload">
                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{
                        backgroundImage: 'url("assets/img/icons/man (1).png")',
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <button
                    className="Btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#Edit_bank_pop_up"
                  >
                    Edit
                    <svg className="svg" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                    </svg>
                  </button>
                </div>
                <div className="text-center text-white">
                  <h2 className="fs-22 mb-1">Kamal Durai</h2>
                  <h6 className="fs-15">
                    <span>
                      User Id : <span>1234567</span>
                    </span>
                  </h6>
                </div>
              </div>
              {/* Profile Details Starts */}
              <div className="py-4">
                {/* card 3 Starts */}
                <div className="d-flex justify-content-start my-2">
                  <div className="profile_icons">
                    <i className="ri-phone-line text-white fs-20" />
                  </div>
                  <div>
                    <p className="mb-1">Mobile Phone</p>
                    <h5 className="fs-16 text-white">+91 1234567890</h5>
                  </div>
                </div>
                {/* card 3 ends */}
                {/* card 2 Starts */}
                <div className="d-flex justify-content-start my-2">
                  <div className="profile_icons">
                    <i className="ri-mail-send-line text-white fs-20" />
                    {/* <i class="ri-focus-3-line text-white fs-20"></i> */}
                  </div>
                  <div>
                    <p className="mb-1">Email Address</p>
                    <h5 className="fs-16 text-white">example@gmail.com</h5>
                  </div>
                </div>
                {/* card 2 ends */}
              </div>
              {/* Profile Details ends */}
            </div>
          </div>
          {/* Profile Details Starts */}
          {/* ==================================== */}
        </div>
      </div>
      {/* Profile_view and Edit Ends*/}
      {/* Profile Edit Pop-up starts */}
      {/* Edit Bank Details POP-UP Starts */}
      {/* Modal */}
      <div
        className="modal fade"
        id="Edit_bank_pop_up"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered Edit_bank_pop_up">
          <div className="modal-content" style={{ backgroundColor: "#313737" }}>
            <div className="modal-header">
              <h2 className="modal-title fs-5 py-2" id="exampleModalLabel">
                Edit Profile Details
              </h2>
              <button
                type="button"
                className="btn-close modal_edit_pop-up me-1 bg-white rounded"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ri-close-large-line text-white fs-16" />
              </button>
            </div>
            <div className="modal-body p-0">
              {/* Edit Profile Starts */}
              <div className="card bg_light_grey account_input-textbox-container">
                <div className="card-body">
                  <div className="">
                    <div className="avatar-upload">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                        />
                        <label htmlFor="imageUpload">
                          <i
                            className="ri-pencil-fill position-relative"
                            style={{ left: 8, top: 3 }}
                          />
                        </label>
                      </div>
                      <div className="avatar-preview">
                        <div
                          id="imagePreview"
                          style={{
                            backgroundImage:
                              'url("https://img.freepik.com/free-photo/cartoon-man-wearing-glasses_23-2151136831.jpg?semt=ais_hybrid")',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <form className="form-control_container" action="">
                    <div className="input-field">
                      <input required="" className="input" type="text" />
                      <label className="label" htmlFor="input">
                        Name
                      </label>
                    </div>
                    <div className="input-field">
                      <input required="" className="input" type="text" />
                      <label className="label" htmlFor="input">
                        Enter Email
                      </label>
                    </div>
                    <div className="input-field">
                      <input required="" className="input" type="text" />
                      <label className="label" htmlFor="input">
                        Mobile Number
                      </label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <button className="btn btn-red w-50 mb-3 mt-3">
                        Update Data
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* Edit Profile Ends */}
            </div>
          </div>
        </div>
      </div>
      {/* Add Bank Details POP-UP Ends */}
      {/* Profile Edit Pop-up ends */}
      {/* Change Password starts */}
      {/* Modal */}
      <div
        className="modal fade"
        id="change_password_pop_up"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered Edit_bank_pop_up">
          <div className="modal-content" style={{ backgroundColor: "#313737" }}>
            <div className="modal-header">
              <h2 className="modal-title fs-5 py-2" id="exampleModalLabel">
                Change Password
              </h2>
              <button
                type="button"
                className="btn-close modal_edit_pop-up me-1 bg-white rounded"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ri-close-large-line text-white fs-16" />
              </button>
            </div>
            <div className="modal-body p-0">
              {/* Edit Profile Starts */}
              <div className="card bg_light_grey account_input-textbox-container">
                <div className="card-body">
                  <form className="form-control_container" action="">
                    <div className="input-field">
                      <input
                        required=""
                        className="input position-relative"
                        type="password"
                        id="oldPassword"
                      />
                      <i
                        className="position-absolute top-60 translate-middle-y end-0 pe-3 text-white cursor-pointer ri-eye-off-line togglePassword"
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                      />
                      <label className="label" htmlFor="oldPassword">
                        Old Password
                      </label>
                    </div>
                    <div className="input-field">
                      <input
                        required=""
                        className="input position-relative"
                        type="password"
                        id="newPassword"
                      />
                      <i
                        className="position-absolute top-60 translate-middle-y end-0 pe-3 text-white cursor-pointer ri-eye-off-line togglePassword"
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                      />
                      <label className="label" htmlFor="newPassword">
                        New Password
                      </label>
                    </div>
                    <div className="input-field">
                      <input
                        required=""
                        className="input position-relative"
                        type="password"
                        id="repeatPassword"
                      />
                      <i
                        className="position-absolute top-60 translate-middle-y end-0 pe-3 text-white cursor-pointer ri-eye-off-line togglePassword"
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                      />
                      <label className="label" htmlFor="repeatPassword">
                        Repeat Password
                      </label>
                    </div>
                    <button className="btn btn-login w-100 mb-3 mt-3">
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
              {/* Edit Profile Ends */}
            </div>
          </div>
        </div>
      </div>
      {/* Add Bank Details POP-UP Ends */}
      {/* Profile Edit Pop-up ends */}
      {/* Change Password Ends */}
      {/* ============================================================================ */}
      {/* Notification_offcanvas Starts */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="Notification_offcanvas"
        aria-labelledby="Notification_offcanvas"
      >
        <div className="offcanvas-header">
          <div className="d-flex w-100 align-items-center">
            <div
              className="logo_brand"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <div className="back_icon">
                <i className="ri-arrow-left-s-line" />
              </div>
            </div>
            <div className="d-flex mx-2 justify-content-center align-items-center">
              <h5 className="mb-0">Notification</h5>
            </div>
          </div>
        </div>
        <div className="offcanvas-body pt-0">
          {/* 2 buttons navtab starts  */}
          <section className="vh-100">
            <div className="h-100">
              {/* Header 2 buttons Starts */}
              <div className="pt-3 pb-2">
                <div className="container-fluid p-0">
                  {/* <h5 class="mb-3">Select Payment Method</h5> */}
                  <nav
                    className="nav nav-pills d-flex justify-content-between tab_red_active"
                    role="tablist"
                  >
                    <button
                      className="nav-link btn-color text-white w-150 active"
                      id="upi-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Bank_details"
                      type="button"
                      role="tab"
                      aria-controls="Bank_details"
                      aria-selected="true"
                    >
                      {/* <img src="assets/img/icons/add_account.png" alt="" width="22px" /> */}
                      System Notice
                    </button>
                    <button
                      className="nav-link btn-color text-white w-150"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      {/* <img src="assets/img/icons/add_account.png" alt="" width="22px" /> */}
                      Actives
                    </button>
                  </nav>
                  <div className="tab-content mt-3" id="myTabContent">
                    {/* tab 1 */}
                    <div
                      className="tab-pane fade active show"
                      id="Bank_details"
                      role="tabpanel"
                      aria-labelledby="upi-tab"
                    >
                      {/* Select Amount Starts */}
                      <div className="card bg_light_grey account_input-textbox-container mt-3">
                        <div className="card-body">
                          <div className="text-white">
                            <p className="mb-0 text-grey">
                              12/14/2024, 10:43:17AM
                            </p>
                            <h5 className="mt-2">
                              🏀Its Weekly Sports Bonus Time!⚽️
                            </h5>
                          </div>
                          <img
                            className="my-2 w-100"
                            src="assets/img/notification/banner_1.jpg"
                            alt="notification_banner"
                            width=""
                          />
                          <div
                            className="overflow-hidden text-secondary whitespace-pre-wrap content"
                            style={{ maxHeight: "3.9rem" }}
                          >
                            <p>
                              Weekly Sports bonus has been dropped successfully!
                              🔥
                            </p>
                            <p>
                              Wager period Saturday December 7th to Friday
                              December 13th
                            </p>
                            <p className="mb-0">Minimum VIP level 22+.</p>
                            <p className="mb-0">
                              Wager $500 or more = $5 bonus
                            </p>
                            <p className="mb-0">
                              Wager $2,500 or more = $30 bonus
                            </p>
                            <p className="mb-0">
                              Wager $5,000 or more = $70 bonus
                            </p>
                            <p className="mb-0">
                              Wager $10,000 or more = $150 bonus
                            </p>
                            <p className="mb-0">
                              Wager $50,000 or more = $500 bonus
                            </p>
                            <p className="mb-0">
                              Wager $250,000 or more = $1000 bonus
                            </p>
                            <p>
                              Grab your weekly bonus boost every Saturday with
                              BC Sports Club!
                            </p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <button
                              className="read-more btn red-gradient text-white"
                              onclick="toggleText(event)"
                            >
                              Read More
                            </button>
                            <div>
                              <i
                                className="ri-delete-bin-6-line fs-25 text-grey"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_pop_up"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Card 2 */}
                      </div>
                      <div className="card bg_light_grey account_input-textbox-container mt-3">
                        <div className="card-body">
                          <div className="text-white">
                            <p className="mb-0 text-grey">
                              12/14/2024, 10:43:17AM
                            </p>
                            <h5 className="mt-2">
                              🏀Its Weekly Sports Bonus Time!⚽️
                            </h5>
                          </div>
                          <img
                            className="my-2 w-100"
                            src="assets/img/notification/banner_1.jpg"
                            alt="notification_banner"
                            width=""
                          />
                          <div
                            className="overflow-hidden text-secondary whitespace-pre-wrap content"
                            style={{ maxHeight: "3.9rem" }}
                          >
                            <p>
                              Weekly Sports bonus has been dropped successfully!
                              🔥
                            </p>
                            <p>
                              Wager period Saturday December 7th to Friday
                              December 13th
                            </p>
                            <p className="mb-0">Minimum VIP level 22+.</p>
                            <p className="mb-0">
                              Wager $500 or more = $5 bonus
                            </p>
                            <p className="mb-0">
                              Wager $2,500 or more = $30 bonus
                            </p>
                            <p className="mb-0">
                              Wager $5,000 or more = $70 bonus
                            </p>
                            <p className="mb-0">
                              Wager $10,000 or more = $150 bonus
                            </p>
                            <p className="mb-0">
                              Wager $50,000 or more = $500 bonus
                            </p>
                            <p className="mb-0">
                              Wager $250,000 or more = $1000 bonus
                            </p>
                            <p>
                              Grab your weekly bonus boost every Saturday with
                              BC Sports Club!
                            </p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <button
                              className="read-more btn red-gradient text-white"
                              onclick="toggleText(event)"
                            >
                              Read More
                            </button>
                            <div>
                              <i
                                className="ri-delete-bin-6-line fs-25 text-grey"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_pop_up"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Card 2 */}
                      </div>
                      {/* Select Amount Ends */}
                    </div>
                    {/* tab 2 */}
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div className="d-flex justify-content-center flex-column align-items-center">
                        <div className="mt-5">
                          <img
                            src="assets/img/notification/img_2.png"
                            width="300px"
                            alt="notification"
                          />
                        </div>
                        <p className="text-white fs-6">
                          Oops! There is no data yet!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Header  Ends */}
            </div>
          </section>
          {/* 2 buttons navtab Ends  */}
          {/* ==================================== */}
        </div>
      </div>
      {/* Notification_offcanvas Ends */}
      {/*-menu off-canva*/}
      <div
        className="offcanvas offcanvas_bg offcanvas-end"
        data-bs-scroll="true"
        tabIndex={-1}
        id="menuOffcanva"
        aria-labelledby=" menuOffcanvaLabel"
      >
        <div className="offcanvas-header d-flex justify-content-between">
          <h5 className="offcanvas-title fs-24 mx-2" id=" menuOffcanvaLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn off_canvas_close_btn me-1 bg-white rounded"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="ri-close-large-line text-white fs-17" />
          </button>
        </div>
        <div className="offcanvas-body">
          <NavLink to="/">
            <div className="d-flex align-items-center menu_list_item justify-content-between">
              <div className="">
                <img
                  src="assets/img/SIDEMENU/home.png"
                  alt="menu"
                  srcSet=""
                  width={24}
                />
                <span className="mx-3 text-white">Home</span>
              </div>
              {/* <div class="icon-box">
      <i class="ri-arrow-right-s-line text-white"></i>
</div> */}
            </div>
          </NavLink>
          <NavLink to="/all-game">
            <div className="d-flex align-items-center menu_list_item justify-content-between">
              <div className="">
                <img
                  src="assets/img/SIDEMENU/club.png"
                  alt="menu"
                  srcSet=""
                  width={24}
                />
                <span className="mx-3 text-white">All Games</span>
              </div>
              {/* <div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div> */}
            </div>
          </NavLink>
          {/*--accordion--*/}
          <div className="accordion accordion_sec" id="accordionExample">
            <div className="accordion-item game_title_accordion_item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed game_title_btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <img
                    src="assets/img/SIDEMENU/chart-mixed-up-circle-dollar.png"
                    alt="circle_dollar"
                    srcSet=""
                    width={24}
                  />
                  <span className="mx-3 text-white">Trending Game</span>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body game_items_accordion">
                  <div className="d-flex align-items-center game_items_accordion_list">
                    <div className="">
                      <img
                        src="assets/img/two-arrows.png"
                        alt="two_arrows"
                        srcSet=""
                        width={22}
                      />
                    </div>
                    <span className="mx-3 text-white">Spribe</span>
                  </div>
                </div>
                <div className="accordion-body game_items_accordion">
                  <div className="d-flex align-items-center game_items_accordion_list">
                    <div className="">
                      <img
                        src="assets/img/two-arrows.png"
                        alt=""
                        srcSet=""
                        width={22}
                      />
                    </div>
                    <span className="mx-3 text-white">Turbo Games</span>
                  </div>
                </div>
                <div className="accordion-body game_items_accordion">
                  <div className="d-flex align-items-center game_items_accordion_list">
                    <div className="">
                      <img
                        src="assets/img/two-arrows.png"
                        alt="two-arrows"
                        srcSet=""
                        width={22}
                      />
                    </div>
                    <span className="mx-3 text-white">Game Hub</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*--accordion end--*/}
          <div className="menu">
            {/* Main */}
            <Link to={routes.pages.howToPlay}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/SIDEMENU/mode-portrait.png"
                    alt="mode"
                    srcSet=""
                    width={24}
                  />
                  {/* Icon for "Main" */}
                  <span className="mx-3 text-white">How to Play</span>
                </div>
                {/* 
<div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div>
*/}
              </div>
            </Link>
            {/* LIVE */}
            <Link to={routes.pages.terms}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/SIDEMENU/deposit.png"
                    alt="deposit"
                    srcSet=""
                    width={24}
                  />
                  {/* Icon for "LIVE" */}
                  <span className="mx-3 text-white">Term &amp; Condition</span>
                </div>
                {/* <div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div> */}
              </div>
            </Link>
            {/* LIVE */}
            <Link to={routes.games.bonus}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/icons/gift.png"
                    alt="gift"
                    srcSet=""
                    width={24}
                  />
                  {/* Icon for "LIVE" */}
                  <span className="mx-3 text-white">Bonus</span>
                </div>
                {/* <div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div> */}
              </div>
            </Link>
            {/* Sports */}
            <Link to={routes.pages.privacyPolicy}>
              <div className="d-flex align-items-center menu_list_item justify-content-between">
                <div>
                  <img
                    src="assets/img/SIDEMENU/money-from-bracket.png"
                    alt="bracket"
                    srcSet=""
                    width={24}
                  />
                  {/* Existing "Sports" Icon */}
                  <span className="mx-3 text-white">Privacy Policy</span>
                </div>
                {/* <div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div> */}
              </div>
            </Link>
            {/* Cricket */}
            <div className="d-flex align-items-center menu_list_item justify-content-between">
              <div>
                <img
                  src="assets/img/SIDEMENU/settings.png"
                  alt="Setting"
                  srcSet=""
                  width={24}
                />
                {/* Icon for "Cricket" */}
                <span className="mx-3 text-white">Settings</span>
              </div>
              {/* <div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div> */}
            </div>
            <div className="d-flex align-items-center menu_list_item justify-content-between">
              <Link to={routes.home}>
                <div>
                  <img
                    src="assets/img/SIDEMENU/address-card.png"
                    alt="address_card"
                    srcSet=""
                    width={24}
                  />
                  {/* Icon for "Cricket" */}
                  <span className="mx-3 text-white">Logout</span>
                </div>
              </Link>
              {/* <div class="icon-box">
<i class="ri-arrow-right-s-line text-white"></i>
</div> */}
            </div>
          </div>
        </div>
      </div>
      {/*-menu off-canva end*/}
      {/* Modal Starts */}
      {/* Modal */}
      <div
        className="modal fade"
        id="Edit_bank_pop_up"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered Edit_bank_pop_up">
          <div className="modal-content" style={{ backgroundColor: "#232323" }}>
            <div className="modal-header">
              <h2 className="modal-title fs-5 py-2" id="exampleModalLabel">
                Edit Bank Details
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="card account_input-textbox-container">
                {/* <div
   class="p-3 red-gradient rounded-top d-flex justify-content-center align-items-center"
 >
   <h5 class="text-center mb-0">Bank Details</h5>
 </div> */}
                <div className="card-body">
                  <form className="form-control_container" action="">
                    <select
                      className="form-select mb-3"
                      aria-label="Default select example"
                      style={{
                        background: "#202223",
                        color: "#cecdc8",
                        height: 42,
                      }}
                    >
                      <option selected="">Select Bank Name</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                    <div className="input-field mb-3">
                      <input required="" className="input" type="text" />
                      <label className="label" htmlFor="input">
                        A/C Name
                      </label>
                    </div>
                    <div className="input-field mb-3">
                      <input required="" className="input" type="number" />
                      <label className="label" htmlFor="input">
                        A/C No
                      </label>
                    </div>
                    <div className="input-field mb-3">
                      <input required="" className="input" type="number" />
                      <label className="label" htmlFor="input">
                        IFSC
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-login w-50 mt-4 mb-3 text-capitalize"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <div class="modal-footer">
<button
 type="button"
 class="btn btn-secondary"
 data-bs-dismiss="modal"
>
 Close
</button>
<button type="button" class="btn btn-primary">Save changes</button>
</div> */}
          </div>
        </div>
      </div>
      {/* Add Bank Details POP-UP Ends */}
      {/* Modal */}
      <div
        className="modal fade"
        id="payment"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm justify-content-center">
          <div className="modal-content" style={{ width: 220 }}>
            <div className="modal-body d-flex flex-column align-items-center">
              <img
                src="assets/img/icons/rupee.gif"
                className="mb-2 w-75"
                alt="rupee"
              />
              <div className="fw-700 fs-13 text-center text-black mb-3">
                Your Request <br />
                Is In Our Queue!
              </div>
              <span className="btn text-white green-bg">Thank You</span>
              <span className="text-dard-grey fs-10 fw-700 mt-3">
                For Choosing jiboomba
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Delete POP-UP starts */}
      <div
        className="modal fade"
        id="delete_pop_up"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div className="modal-content" style={{ width: "85%" }}>
            <div className="modal-body d-flex flex-column align-items-center py-5">
              <img
                src="assets/img/icons/warning.gif"
                className="mb-2"
                alt="warning_gif"
                width="64px"
              />
              <div className="fw-700 text-center text-black mb-3 fs-2">
                Are You Sure?
              </div>
              <p className="text-dark text-center fs-15">
                Do you really want to delete this records? This process cannot
                be undone.
              </p>
              {/* <span class="btn text-white green-bg">Thank You</span>
<span class="text-dard-grey fs-10 fw-700 mt-3"
 >For Choosing jiboomba</span
> */}
              <div className="d-flex gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#delete_pop_up_2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete POP-UP Ends */}
      {/* Delete POP-UP starts */}
      <div
        className="modal fade"
        id="delete_pop_up_2"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm justify-content-center">
          <div className="modal-content py-3" style={{ width: 300 }}>
            <div className="modal-body d-flex flex-column align-items-center">
              <img
                src="assets/img/icons/tick_2.gif"
                className="mb-2"
                alt="tick_image"
                width="60px"
              />
              <div className="fw-700 fs-15 text-center text-black my-3">
                Your data has been Deleted <br />
                Successfully!
              </div>
              <div className="d-flex gap-2 mt-2">
                <button
                  type="button"
                  className="btn green2-bg text-white"
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete POP-UP Ends */}
      {/* Modal Ends */}
    </>
  );
};

export default OffCanvas;

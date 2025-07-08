import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Auth/AuthContext";
import routes from "../routes/route";

const UserEnter = () => {
  const { profile, isLoading, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate hook for redirection
  if (isLoading) return <p>🔄 Loading profile...</p>;

  return (
    <div>
      <div className="container position-relative" style={{ left: 0 }}>
        <div className="offcanvas-header py-3">
          {/* Back Button */}
          <div onClick={() => navigate(-1)}>
            {/* Navigates back */}
            <div className="back_icon">
              <i className="ri-arrow-left-s-line text-white" />
            </div>
          </div>
        </div>
        <div
          className="h-25 w-100 bg-red-gradient position-absolute"
          style={{ left: 0, top: 0 }}
        ></div>
        <div className="offcanvas-body overflow-hidden">
          <div
            className="text-white mt-3 pt-5 d-flex align-items-center mb-3"
            data-bs-toggle="modal"
            data-bs-target="#Edit_bank_pop_up"
          >
            <div className="pe-2">
              <img src="assets/img/icons/man.png" alt="profile_icon" />
            </div>

            <div>
              <h4 className="mb-0">{profile?.playername || "Unknown User"}</h4>
              <h5>
                <span className="text-grey fs-14">ID: {profile?.id}</span>
              </h5>
            </div>
            <div className="ms-auto">
              <i className="ri-arrow-right-s-line text-white fs-20" />
            </div>
          </div>

          {/* Total Balance */}
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-0">
                <img
                  src="assets/img/footer/coins.png"
                  alt="money"
                  width="30px"
                />{" "}
                Total Balance
              </h5>
            </div>
            <div>
              <h4>{profile?.chips || "Unknown User"}</h4>
            </div>
          </div>

          {/* Deposit & Withdraw Buttons */}
          <div className="card bg_light_grey account_input-textbox-container mt-3">
            <div className="card-body px-2">
              <div className="bonus_bottom_btn">
                <Link to={routes.transactions.deposit} className="w-100">
                  <button className="btn btn-outline-light w-100">
                    Deposit
                  </button>
                </Link>
                <Link to={routes.transactions.withdraw} className="w-100">
                  <button className="btn btn-outline-light w-100">
                    Withdraw
                  </button>
                </Link>
              </div>

              {/* Icons Section */}
              {/* Icons Section */}
              <div className="row">
                <div
                  className="text-center mt-3 col"
                  onClick={() => navigate(routes.games.history)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="assets/img/icons/history.png"
                    alt="bet_history"
                    width="27px"
                  />
                  <p className="mb-0">Bet History</p>
                </div>

                <div
                  className="text-center mt-3 col"
                  onClick={() => navigate(routes.transactions.withdrawHistory)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="assets/img/icons/rupee_2.png"
                    alt="transaction"
                    width="27px"
                  />
                  <p className="mb-0">Transaction</p>
                </div>

                <div
                  className="text-center mt-3 col"
                  onClick={() => navigate(routes.games.bonus)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="assets/img/icons/gift.png"
                    alt="bonus"
                    width="27px"
                  />
                  <p className="mb-0">Bonus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Referral & Earn */}
          <div className="card bg_light_grey account_input-textbox-container mt-3">
            <div className="card-body px-3">
              <div className="d-flex justify-content-between align-items-center mt-3 referral_earn_box">
                <div>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/035/566/895/small/red-gift-box-and-gold-ribbon-chinese-new-year-elements-icon-3d-rendering-png.png"
                    alt="gift"
                    width="80px"
                  />
                </div>
                <div className="w-100">
                  <p className="font-semibold text-white">
                    <span>Referral &amp; get 500 + 25% reward</span>
                  </p>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="input2"
                      defaultValue="https://jiboomba.com"
                      readOnly
                    />
                    <button className="Subscribe-btn">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification & Other Options */}
          <div className="card bg_light_grey account_input-textbox-container mt-3">
            <div className="card-body px-3">
              <div
                className="d-flex justify-content-between align-items-center"
                data-bs-toggle="offcanvas"
                data-bs-target="#Notification_offcanvas"
              >
                <p className="mb-0 fs-16">
                  <i className="ri-notification-2-fill pe-2" /> Notification
                </p>
                <i className="ri-arrow-right-s-line text-white" />
              </div>

              <div
                className="d-flex justify-content-between align-items-center mt-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#Refer_Earn_offcanvas"
              >
                <p className="mb-0 fs-16">
                  <i className="ri-group-fill pe-2" /> Refer and Earn
                </p>
                <i className="ri-arrow-right-s-line text-white" />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0 fs-16">
                  <i className="ri-chat-unread-fill pe-2" /> Chat
                </p>
                <i className="ri-arrow-right-s-line text-white" />
              </div>

              <div
                className="d-flex justify-content-between align-items-center mt-3"
                data-bs-toggle="modal"
                data-bs-target="#change_password_pop_up"
              >
                <p className="mb-0 fs-16">
                  <i className="ri-lock-fill pe-2" /> Change Password
                </p>
                <i className="ri-arrow-right-s-line text-white" />
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="d-flex justify-content-center align-items-center white mt-3">
            <p className="fs-17" onClick={() => logout(navigate)}>
              <img
                src="assets/img/icons/sign-out.png"
                alt="sign_Out_image"
                width="25px"
                className="pe-2"
              />
              Sign Out
            </p>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default UserEnter;

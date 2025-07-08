import React from "react";

const ReferEarn = () => {
  return (
    <div>
      <section className="container vh-100 mt-80">
        <div className="">
          <div className="">
            <div
              className="d-flex w-100 align-items-center justify-content-center position-relative"
              style={{ paddingTop: 8 }}
            >
              <div className="position-absolute" style={{ left: 0 }}>
                <a href="./sideMenu.html">
                  <div className="back_icon">
                    <i className="ri-arrow-left-s-line" />
                  </div>
                </a>
              </div>
              <div className="d-flex mx-2 justify-content-center align-items-center">
                <h5 className="mb-0">Refer And Earn</h5>
              </div>
            </div>
          </div>
          <div className="">
            <img
              src="https://spree.b-cdn.net/7df0ad59-5941-4e1c-a86f-3ebfbd03feb8"
              alt=""
              className="w-100 rounded-5 mt-3"
            />
          </div>
          <div>
            {/* Refer_Earn_offcanvas Starts*/}
            <div className="row">
              <div className="col-12">
                <div className="card bg_light_grey account_input-textbox-container my-3">
                  <div className="card-body px-3">
                    <div className="py-2">
                      <div className="d-flex justify-content-center">
                        <img
                          src="https://static.vecteezy.com/system/resources/thumbnails/035/566/895/small/red-gift-box-and-gold-ribbon-chinese-new-year-elements-icon-3d-rendering-png.png"
                          alt=""
                          width="100px"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
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
                            <li>Share your referral code</li>
                            <li>Friends get ₹10 on their first game</li>
                            <li>you get ₹10 off coupon</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-5"></div>
            </div>
            {/*    Refer_Earn_offcanvas  Ends*/}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferEarn;

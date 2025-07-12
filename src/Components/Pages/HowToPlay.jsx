import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes/route";
import StickyHeader from "../layouts/Header/Header";
import BottomFooter from "../layouts/footer/BottomFooter";
import Footer from "../layouts/footer/Footer";
import Sidebar from "../layouts/Header/Sidebar";

const HowToPlay = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* header  */}
      <StickyHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* header end */}
      {/* <section className="container pt-40 text-white"> */}
      <div className="container-fluid page-body-wrapper">
        {/* Sidebar Nav Starts */}
        <Sidebar />
        {/* Sidebar Nav Ends */}
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="max-1250 mx-auto"></div>
            <div className="h-100 d-flex justify-content-evenly flex-column">
              <div className="pt-3 pb-2 ">
                <div className="breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item text-white">
                        <Link to={routes.home} className="text-white fw-600 ">
                          Home
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active  text-white"
                        aria-current="page"
                      >
                        Privacy Policy
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <section className="Privacy_policy_content mt-2">
                <p>
                  This privacy policy is designed to provide players with
                  information on how personal data is collected and how it is
                  used in interaction with the official website and services of
                  the bookmaker’s office.
                </p>
                <p>
                  Player personal data refers to any personal information that
                  identifies a player as a unique user. This is first and last
                  name, country of residence, address, phone number, email
                  address, etc.
                </p>
                <p>
                  <Link to={routes.home}>jiboomba</Link> collects and processes
                  personal data in order to improve the quality of service and
                  player service. Data is collected at the stage of{" "}
                  <Link to={routes.auth.register}>registration</Link>
                  when verifying identity when creating a game account when
                  betting. When using any services provided by betting company
                  4rabet India, you automatically agree to this privacy policy.
                </p>
                <h2 className="persona_info_heading">
                  How we use customers’ personal information:
                </h2>
                <ul className="personal_info_list">
                  <li>
                    The main purpose of collecting and using players’ personal
                    information is to improve the quality of customer service.
                    By submitting personal information you help us to create
                    better advertising and marketing materials, as well as
                    provide yourself with access to all the features and
                    functions of the bookmaker’s office;
                  </li>
                  <li>
                    The collection of personal data allows us to guarantee the
                    principles of fair play. The information is used to ensure
                    the safety of customers and the safety of money on their
                    balances;
                  </li>
                  <li>
                    Bookmaker office 4rabet uses players’ personal data for
                    opening a personal account, providing services and services,
                    checking the reliability of information about users,
                    compiling statistical reports, conducting promotions, etc.
                  </li>
                </ul>
                <p>
                  Since 4rabet is an international company and operates in a
                  number of countries, the collection of personal data is also
                  necessary to comply with the laws in these countries. It also
                  helps us to prevent fraud and money laundering through our
                  betting shop accounts.
                </p>
                <p>
                  We do not send out emails or phone numbers to players that
                  they have not agreed to receive. We may, however, use your
                  information in promotional publications. For example, news
                  about the recipients of big winnings.
                </p>
                <p>
                  If we suspect fraud or money laundering on your part, your
                  account may be temporarily frozen and your personal
                  information will be reported to law enforcement upon request.
                  At any time you can refuse to have your personal data
                  processed by 4rabet. To do this, write a request to the
                  support service with a request to stop processing personal
                  data. Also, some information can be updated or changed
                  manually, using the tools in your personal cabinet.
                </p>
              </section>
            </div>
          </div>
          <BottomFooter />
          <div className="h-100 w-100 mb-5"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;

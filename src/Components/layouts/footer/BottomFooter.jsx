import React from "react";
import routes from "../../routes/route";
import { Link } from "react-router-dom";
import OffCanvas from "../../offcanvapages/Offcanva";
import { Images } from "../Header/constants/images";
const BottomFooter = () => {
  return (
    <div>
      <footer>
        {/* Footer start */}
        {/*- footer-sec ---*/}
        <div className="footer_section">
          <footer className="pt-10 pb-12 pb-md-0">
            {/*--provider---*/}

            {/*--provider-end*/}
            <div className="container">
              <div className="d-flex justify-content-center my-3">
                <div className="logo_brand">
                  <Link to={routes.home} className="navbar-brand m-0">
                    <img
                      src={Images.Favlogo2}
                      alt="Logo"
                      srcSet=""
                      width="100%"
                    />
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12 ">
                  <div className="footer_section__sports">
                    <div className="top-matches-title d-flex align-items-center gap-2  my-3">
                      <h5 className="m-0 mt-1">Jiboomba</h5>
                    </div>
                    <p>
                      A multi-award winning crypto casino. With a player-centric
                      approach, JIBOOMBA.TOP is able to satisfy millions of
                      gamblers across the global game..
                    </p>
                  </div>
                  <div>
                    <div className="social-links text-center w-100 justify-content-center my-2">
                      <Link to={routes.home}>
                        <i className="fab fa-facebook-f" />
                      </Link>
                      <Link to={routes.home}>
                        <i className="fab fa-instagram" />
                      </Link>
                      <Link to={routes.home}>
                        <i className="fab fa-twitter" />
                      </Link>
                      <Link to={routes.home}>
                        <i className="fab fa-github" />
                      </Link>
                      <Link to={routes.home}>
                        <i className="fab fa-linkedin-in" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <OffCanvas />
          <div className="row">
            <div className="col-12">
              <div className="copy_right">
                <p>
                  {" "}
                  Copyright © 2024 jiboomba <br /> All rights are reserved and
                  protected by law
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*- footer-sec-end ---*/}
        {/* Footer end */}
      </footer>
    </div>
  );
};

export default BottomFooter;

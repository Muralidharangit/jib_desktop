import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes/route";

const StartingPage = () => {
  return (
    <div>
      <>
        <section className="container vh-100">
          <div className="h-100 d-flex align-items-center">
            <div className="card bg-transparent">
              <img src="assets/img/Sport Team Logo.png" alt="" srcSet="" />
            </div>
          </div>
        </section>
        <div className="text-center position-fixed bottom-0 w-100 my-5 start-0 ">
          <Link to={routes.StartingPage}>
            <button type="submit" className="btn btn-login w-75 my-3">
              Play <i className="ri-lock-line text-white fs-20" />
            </button>
          </Link>
        </div>
      </>
    </div>
  );
};

export default StartingPage;

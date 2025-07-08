import React from "react";

const StartingSlider = () => {
  return (
    <>
      <section className="container vh-100">
        <div className="h-100 d-flex justify-content-evenly flex-column">
          <div className="pt-3 pb-2">
            {/* Swiper */}
            <div className="swiper get-started">
              <div className="swiper-wrapper">
                {/* Slide 1 */}
                <div className="swiper-slide">
                  <div className="slide-info">
                    <div className="dz-media m-auto d-flex justify-content-center mb-4">
                      <img
                        src="https://betlio2.vercel.app/main/assets/img/slide2.png"
                        alt=""
                        className="w-100"
                        data-swiper-parallax={-700}
                      />
                    </div>
                    <div className="slide-content text-center">
                      <h3 className="dz-title" data-swiper-parallax={-300}>
                        Let’s meet our summer coffee drinks
                      </h3>
                      <p data-swiper-parallax={-100}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Slide 2 */}
                <div className="swiper-slide">
                  <div className="slide-info">
                    <div className="dz-media m-auto d-flex justify-content-center mb-4">
                      <img
                        src="https://betlio2.vercel.app/main/assets/img/slide2.png"
                        alt=""
                        className="w-100"
                        data-swiper-parallax={-700}
                      />
                    </div>
                    <div className="slide-content text-center">
                      <h3 className="dz-title" data-swiper-parallax={-300}>
                        Start your morning with great coffee
                      </h3>
                      <p data-swiper-parallax={-100}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Slide 3 */}
                <div className="swiper-slide">
                  <div className="slide-info">
                    <div className="dz-media m-auto d-flex justify-content-center mb-4">
                      <img
                        src="https://betlio2.vercel.app/main/assets/img/slide2.png"
                        alt=""
                        className="w-100"
                        data-swiper-parallax={-700}
                      />
                    </div>
                    <div className="slide-content text-center">
                      <h3 className="dz-title" data-swiper-parallax={-300}>
                        Best coffee shop in this town
                      </h3>
                      <p data-swiper-parallax={-100}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pagination */}
              <div className="swiper-pagination" />
            </div>
          </div>
          {/* Button Section */}
          <div className="w-100 d-flex justify-content-center">
            <div className="text-center position-fixed bottom-0 w-100 my-5 start-0">
              <a href="./login.html">
                <button type="submit" className="btn btn-login w-75 my-3">
                  Get Started
                  <i className="ri-lock-line text-white fs-20" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartingSlider;

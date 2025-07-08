import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import StickyHeader from "./Header/Header";
import BottomFooter from "./footer/BottomFooter";
import BASE_URL from "../../API/api";

const Provider = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${BASE_URL}/providers-list`);
        const data = await response.json();

        // console.log("API Response:", data); // Debugging step

        // console.log("API response does not contain 'allGames' array", data.allGames.images);

        // Ensure data.allGames is an array before setting it
        if (Array.isArray(data.providers)) {
          setProviders(data.providers);
        } else {
          console.error("API response does not contain 'allGames' array", data);
          setProviders([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching games:", error);
        setProviders([]); // Handle errors by setting an empty array
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <StickyHeader />

      {/*-- Provider Section --*/}
      <div className="container">
        <div className="p-1 pt-4">
          <h3 className="text-center">Providers</h3>
          <div className="row">
            {providers.length > 0 ? (
              providers.map((provider, index) => (
                <div className="col-4 px-1" key={index}>
                  {provider.image ? (
                    <>
                      <div className="game_provider_item">
                        <img
                          src={`https://staging.syscorp.in/storage/${provider.image}`} // API should return provider image URL
                          alt={provider.name}
                          style={{ height: "100%" }} // Corrected style syntax
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-white">No providers available</p>
            )}
          </div>
        </div>
      </div>

      {/*-- Provider End --*/}
      <BottomFooter />
      <Footer />
    </div>
  );
};

export default Provider;

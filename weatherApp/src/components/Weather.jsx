import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import WeatherDisplay from "./WeatherDisplay";

function Weather() {
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
 async function callSearch(event){
    event.preventDefault();
    setQuery("");
    setWeather({ ...weather, loading: true });
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const appid = "f00c38e0279b7bc85480c3fe775d518c";
    //console.log('Enter');

    await axios
      .get(url, {
        params: {
          q: query,
          units: "metric",
          appid: appid,
        },
      })
      .then((res) => {
        console.log("res", res);
        setWeather({ data: res.data, loading: false, error: false });
      })
      .catch((error) => {
        setWeather({ ...weather, data: {}, error: true });
        setQuery("");
        console.log("error", error);
      });
  }
  const search = async (event) => {
    if (event.key === "Enter") {
     callSearch(event);
    }
  };

  return (
    <div>
      <div className="header">
        <h1 className="app-name">
          WeatherNow<span>🌤</span>
        </h1>
        <div className="search-bar">
          <input
            type="text"
            className="city-search"
            placeholder="Search City.."
            name="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyPress={search}
          />
          <div className="search-btn" onClick={(e)=>callSearch(e)}>Search</div>
        </div>
      </div>
       <WeatherDisplay weather={weather}/>
    </div>
  );
}

export default Weather;

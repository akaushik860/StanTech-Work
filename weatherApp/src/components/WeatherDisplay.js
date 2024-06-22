import React from 'react'
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';

const WeatherDisplay = ({weather}) => {
    const toDate = () => {
        // let date = new Date();
        // const today = date.toDateString();
        // return today;
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "Nocvember",
          "December",
        ];
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;
        return date;
      };
  return (
    <div className="App">
    {weather.loading && (
      <div className="loader">
        <br />
        <Loader type="Oval" color="black" height={100} width={100} />
      </div>
    )}
    {weather.error && (
      <>
        <span className="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span style={{ "font-size": "40px",marginLeft:"5px" }}>
            Sorry, Not Found. Please enter correct city.
          </span>
        </span>
      </>
    )}
    {weather && weather.data && weather.data.main && !weather.loading && (
      <div>
        <div className="city-name">
          <h2>
            {weather.data.name}, <span>{weather.data.sys.country}</span>
          </h2>
          <div className="date">
            <span>{toDate()}</span>
          </div>
        </div>

        <div className="icon-temp">
          <img
            className=""
            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@4x.png`}
            alt={weather.data.weather[0].description}
            width="170px"
            height="180px"
          />
          <div>{Math.round(weather.data.main.temp)}</div>
          <sup className="deg">&deg;C</sup>
        </div>
        <div className="des-wind">
          <p>{weather.data.weather[0].description.toUpperCase()}</p>
          <p>Wind Speed: {weather.data.wind.speed}m/s</p>
        </div>
      </div>
    )}
    {console.log(!weather.loading && weather.data && !weather.error)}
    {!weather.loading &&
      Object.keys(weather.data).length === 0 &&
      !weather.error && (
        <div className="first-time">
          <h2>Welcome to WeatherNow App!!</h2>
        </div>
      )}
  </div>
  )
}

export default WeatherDisplay
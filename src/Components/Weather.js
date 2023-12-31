import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";
const APIKEY = process.env.REACT_APP_APIKEY


function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };
  return (
    <div className="weather">
      <div className="weather-container">
        <h1 className="title">Weather App</h1>
        <form>
          <input
            type="text"
            placeholder="city"
            name="city"
            onChange={(e) => handleChange(e)}
          />
          &nbsp; &nbsp; &nbsp;&nbsp;
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={(e) => handleChange(e)}
          />
          &nbsp; &nbsp; &nbsp;&nbsp;
          <button className="getweather" onClick={(e) => weatherData(e)}>
            Submit
          </button>
        </form>

        {weather.data !== undefined ? (
          <div>
            <DisplayWeather data={weather.data} />
          </div>
        ) : (<h2>sorry! Data not found.</h2>)}
      </div>
    </div>
  );
}

export default Weather;

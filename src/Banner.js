import React, { useState, useEffect } from "react";
import "./Banner.css";
import requests from "./requests";
import axios from "./axios";

function truncate(overview, n) {
  return overview?.length > n ? overview.substr(0, n - 1) + "..." : overview;
}

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_content">
        <h1>{movie.name || movie.title || movie.original_name}</h1>
        <div className="buttons">
          <button type="button">Play</button>
          <button type="button">My List</button>
        </div>
        <div className="desc">{truncate(movie?.overview, 150)}</div>
      </div>
      <div className="fader"></div>
    </header>
  );
}

export default Banner;

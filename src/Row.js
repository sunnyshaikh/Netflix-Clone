import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargePoster }) {
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargePoster && "large_poster"}`}
            src={`${base_url}${
              isLargePoster ? movie.poster_path : movie.backdrop_path
            }`}
            alt="poster_path"
            title="watch trailer"
          />
        ))}
      </div>
    </div>
  );
}

export default Row;

import React, { useState } from "react";

const MovieList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "e173f541";

  const fetchMovies = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a movie title!");
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No results found.");
        setMovies([]);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Movie Search</h1>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={fetchMovies} style={styles.searchButton}>
          Search
        </button>
      </div>

      {error && <p style={styles.errorText}>{error}</p>}

      <div style={styles.moviesGrid}>
        {isLoading ? (
          <p style={styles.loadingContainer}>Loading...</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.imdbID} style={styles.movieCard}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "src/assets/widgets/Placeholder.jpg"
                }
                alt={movie.Title}
                style={styles.moviePoster}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "30px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    textShadow: "0px 0px 2px #333",
  },
  searchContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchInput: {
    width: "60%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "3px solid #ddd",
    boxShadow: "0px 0px 5px #333",
  },
  searchButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    textShadow: "0px 0px 2px #ffff3f",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "2px 2px 3px #333",
  },
  errorText: {
    color: "#f44336",
    fontSize: "16px",
    margin: "10px 0",
  },
  loadingContainer: {
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    color: "#333",
    textShadow: "0px 0px 1px #333",
  },
  moviesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(150px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  movieCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.8)",
    textAlign: "center",
  },
  moviePoster: {
    width: "100%",
    height: "100%",
  },
};

export default MovieList;

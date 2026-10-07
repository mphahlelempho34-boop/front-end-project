 import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const API_URL = "https://learnapi-6469.onrender.com";

// Decorative book spines for the shelf (height/width in px)
const SPINES = [
  { h: 150, w: 34, c: "#b4452f" },
  { h: 190, w: 26, c: "#e8dcc0" },
  { h: 170, w: 40, c: "#2d4a7a" },
  { h: 210, w: 30, c: "#d9a441", pull: true },
  { h: 160, w: 36, c: "#6b2e4a" },
  { h: 195, w: 28, c: "#e8dcc0" },
  { h: 175, w: 38, c: "#b4452f" },
  { h: 145, w: 30, c: "#2d4a7a" },
  { h: 185, w: 32, c: "#e8dcc0", lean: true },
];

function Welcome() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `${API_URL}/api/books`;

  async function getBooks() {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url, {
        headers: { Accept: "application/json" },
      });

      console.log("API response:", response.data);
      setBooks(response.data);

      navigate("/home", {
        state: { books: response.data },
      });
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError("Couldn't load the books. Check that the API is running, then try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <div className="welcome-text">
          <h1>Your reading list starts here</h1>

          <p className="welcome-description">
            Browse the available books and save the ones you want to read.
          </p>

          <button
            onClick={getBooks}
            className="fetch-button"
            disabled={loading}
          >
            {loading ? "Loading books…" : "Browse books"}
          </button>

          {loading && (
            <p className="welcome-hint" role="status">
              The server may take a moment to wake up.
            </p>
          )}

          {error && (
            <p className="welcome-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div
          className={`shelf${loading ? " is-loading" : ""}`}
          aria-hidden="true"
        >
          {SPINES.map((s, i) => (
            <span
              key={i}
              className={`spine${s.pull ? " spine--pull" : ""}${
                s.lean ? " spine--lean" : ""
              }`}
              style={{ "--h": `${s.h}px`, "--w": `${s.w}px`, "--c": s.c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Welcome;

 import { useState } from "react";
import Books from "../../components/Books";
import "./Home.css";
import The4OfUs from "../../components/the4ofus.jpg";
import Uzalo from "../../components/Uzalo.jpg";
import Skeem from "../../components/Skeem.jpg";
import axios from "axios";

function Home({ favorites, onFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let url = "http://localhost:8080/api/books";

  async function getBooks() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, {
        headers: { Accept: "application/json" },
      });
      console.log("API response:", response.data);
      setBooks(response.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError("Couldn't load books. Check the API is running.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <br />
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a book..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <button onClick={getBooks} className="fetch-button" disabled={loading}>
        {loading ? "Loading..." : "Load Books"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <div className="books-grid">
        {books
          .filter((book) =>
            book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .map((book) => (
            <Books
              key={book.id}
              book={book}
              onFavorite={onFavorite}
              isFavorite={favorites.some((item) => item.id === book.id)}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
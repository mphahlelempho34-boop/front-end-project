import { useState , useEffect } from "react";
import Books from "../../components/Books";
import "./Home.css";
import NavBar from "./NavBar";
import axios from "axios";

const API_URL = "https://learnapi-production-9220.up.railway.app";

function Home({ favorites, onFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let url = `${API_URL}/api/books`;

    
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

  // 2. Trigger the fetch automatically when the component loads
  useEffect(() => {
    getBooks();
  }, []); // Empty array ensures this runs only once when arriving at /Home


  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <NavBar/>
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
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
// import booksService from "./service/booksService";

function App() {
  const [favorites, setFavorites] = useState([]);


  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((item) => item.id === book.id);

      if (isFavorite) {
        return prev.filter((item) => item.id !== book.id);
      }

      return [...prev, book];
    });
  };

  return (
    <>
      <nav className="navbar">
        <h1>My Books</h1>

      

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/favorites">
            Favorites ({favorites.length})
          </Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              onFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

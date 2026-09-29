import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Favorites from "./pages/Favorites";
import NavBar from "./pages/NavBar";
import Registration from "./pages/Registration"
import Navigation from "../components/Navigation";

import "./App.css"

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
     
     <NavBar/>
     <Navigation/>
     

      <Routes>
        <Route
          path="/"
          element={
            <Welcome
            />
          }
        />

        <Route
          path="/Registration"
          element={
            <Registration
            />
          }
        />


        <Route
          path="/home"
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

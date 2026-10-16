
import axios from "axios";
import "./Welcome.css";
import Home from "./Home";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from "../../components/Navigation";


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
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  

 const user  = {name : "Kamogelo Monkwe", username : "kmonkwe", password : "1234567"}

 const clicked = () => {
  
  
  if (userInput.trim() === user.username && passInput.trim() === user.password) {
    // Just log in and navigate immediately
    navigate('/Home');
  }

    else alert("Wrong details provided, please try again!!")
 }

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
      <Navigation/>
      <br/>
      <div className="welcome-content">
        <div className="welcome-text">
          <h1>Your reading list starts here •ᴗ•</h1>
            
          <p className="welcome-description">
            Login so you can be able to browse available books and save the ones you want to read!
          </p>
          <br/>

          <div id = "login">
        <form>

         <div className="form-group">  
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="loginInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            id="password"
            type="text"
            placeholder="Password"
            className="loginInput"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
          />
        </div>
           
            <button type = "submit" className = "loginBtn" onClick={clicked}> LOGIN </button>
        </form>
    </div>
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
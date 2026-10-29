
import axios from "axios";
import "./Welcome.css";
import Home from "./Home";
import React, { useState } from 'react'; // Removed unused useEffect and state blocks
import { useNavigate } from 'react-router-dom';
import Navigation from "../../components/Navigation";

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

const API_URL = "https://onrender.com";

function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 

    if (!userInput.trim() || !passInput.trim()) {
      alert("Please enter both your email and password.");
      return;
    }

    setLoading(true);

    // 1. Create a structured payload that matches standard .NET backend schemas
    const loginPayload = {
      Email: userInput.trim(),
      Password: passInput.trim()
    };

    try {
      // 2. Query a dedicated login endpoint using a clean POST route instead of filtering arrays
      const response = await axios.post(`${API_URL}/api/Users/login`, loginPayload, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      console.log("Login network response:", response.data);
      
      // If the backend accepts the request, navigate forward immediately
      navigate('/Home');

    } catch (err) {
      console.error("Login attempt failed:", err);
      
      // 3. Fallback check: If the backend does not have a dedicated /login endpoint, 
      // we gracefully fall back to the dynamic GET array search in real-time.
      if (err.response && err.response.status === 404) {
        try {
          const fallbackRes = await axios.get(`${API_URL}/api/Users`, {
            headers: { Accept: "application/json" }
          });
          
          const foundUser = fallbackRes.data.find((u) => {
            const emailField = u.email || u.Email || u.username || u.Username || "";
            const passwordField = u.password || u.Password || "";
            return (
              emailField.toString().trim().toLowerCase() === userInput.trim().toLowerCase() &&
              passwordField.toString().trim() === passInput.trim()
            );
          });

          if (foundUser) {
            navigate('/Home');
          } else {
            alert("Wrong details provided, please try again!!");
          }
        } catch (fallbackErr) {
          alert("Wrong details provided, please try again!!");
        }
      } else {
        alert("Wrong details provided, please try again!!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault(); 
    navigate('/Registration');
  };

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

          <div id="login">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  id="username"
                  type="text"
                  placeholder="Email"
                  className="loginInput"
                  disabled={loading}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="loginInput"
                  disabled={loading}
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                />
              </div>
              <button type="submit" className="loginBtn" disabled={loading}>
                {loading ? "VERIFYING..." : "LOGIN"}
              </button>
            </form>
          </div>
          <br/>
          <p>Don't have an account yet? <a href="/Registration" onClick={handleClick} className="registerMessage">
            Create an account now!
          </a></p>
          
        </div>

        <div className={`shelf${loading ? " is-loading" : ""}`} aria-hidden="true">
          {SPINES.map((s, i) => (
            <span
              key={i}
              className={`spine${s.pull ? " spine--pull" : ""}${s.lean ? " spine--lean" : ""}`}
              style={{ "--h": `${s.h}px`, "--w": `${s.w}px`, "--c": s.c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Welcome;

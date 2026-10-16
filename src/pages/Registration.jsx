import React, { useState } from "react"; // 1. Crucial import for state
import "./Registration.css";
import Welcome from "./Welcome"
import { useNavigate } from "react-router-dom";
import RegNav from "../../components/RegNav"

function Registration() {
    const navigate = useNavigate();
  // 2. Define distinct state hooks for each input field
  const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 3. Define the submission handler function so it doesn't crash
  const handleRegisterSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    
    if (!name.trim() || !username.trim() || !password.trim()) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    // Log the data to verify it works
    console.log("Registration Data Submitted:", { name, username, password });
    
    // Add your signup logic or API call here
    alert(`Welcome, ${name}! Registration successful.`);

    navigate("/");
  };
  
  return (
<>
    <RegNav/>
  <div className="registration-container">
    <div className="registration-card">
      <h2>Create an Account</h2>
      <p className="subtitle">Join Books App today</p>
      
      <form onSubmit={handleRegisterSubmit} className="userInfo-form">
        <div className="form-group">
          <label htmlFor="name">Full Name(s)</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="UserInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Surname</label>
          <input
            id="surname"
            type="text"
            placeholder="Enter your surname"
            className="UserInput"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Choose a username"
            className="UserInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
     
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            className="UserInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
     
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  </div>
  </>
);
}

export default Registration;

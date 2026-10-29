import React, { useState } from "react";
import "./Registration.css";
import Welcome from "./Welcome";
import { useNavigate } from "react-router-dom";
import RegNav from "../../components/RegNav";
import axios from "axios"; // 1. Imported Axios

function Registration() {
  const navigate = useNavigate();

  // State hooks for inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); 

    // Basic frontend validation rules
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address containing '@'.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // 2. Updated Payload mapping to support standard C# PascalCase conventions.
    // If your backend absolutely requires lowercase, change these back to lowercase keys.
    const userData = {
       // Note: .NET often maps the primary name key to 'Username'
      Email: email,
      Password: password,
      Name: name
    };

    try {
      // 3. Implemented Axios POST request
      const response = await axios.post(
        "https://learnapi-6469.onrender.com/api/Users/register", 
        userData, 
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      console.log("Registration successful response:", response.data);
      alert(`Welcome, ${name}! Registration successful.`);
      navigate("/home");

    } catch (error) {
      console.error("Full Registration Error Context:", error);

      if (error.response) {
        const status = error.response.status;
        const serverData = error.response.data;

        // Check if the server explicitly complained about validation / missing fields
        if (serverData && serverData.errors) {
          // Flatten standard .NET model validation dictionary into a readable string
          const errorDetails = Object.values(serverData.errors).flat().join("\n");
          alert(`Server Validation Issue:\n${errorDetails}`);
          return;
        }

        // Catch typical email duplicates
        const msg = serverData?.message || JSON.stringify(serverData) || "";
        if (status === 409 || msg.toLowerCase().includes("email")) {
          alert("An account with this email address already exists. Please log in instead.");
        } else {
          alert(`Registration failed (Status ${status}): ${msg}`);
        }
      } else {
        // Fallback for network drops or Render cold boots
        alert("Something went wrong connecting to the server. If this is the first load, please wait 30 seconds for the backend to wake up.");
      }
    }
  };

  return (
    <>
      <RegNav />
      <div className="registration-container">
        <div className="registration-card">
          <h2>Create an Account</h2>
          <p className="subtitle">Join Books App today</p>
          <form onSubmit={handleRegisterSubmit} className="userInfo-form">
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label> 
              <input
                id="email"
                type="email"
                placeholder="Enter your email : you@example.com"
                className="UserInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password (min 6 characters)"
                className="UserInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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


import Home from "./Home";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from "./NavBar";


function Welcome(){

  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  
  
  
 const navigate = useNavigate(); // Initialize the navigation hook

 const user  = {name : "Kamogelo Monkwe", username : "kmonkwe", password : "1234567"}

 const clicked = () => {
  if (userInput.trim() === user.username && passInput.trim() === user.password) {
    // Just log in and navigate immediately
    navigate('/Home');
  }

    else alert("Wrong details provided, please try again!!")
 }

 return (
    <>
   

    <div id = "welcome">
        <h1 > Welcome </h1>
        <br />
    </div>
    <div id = "login">
        <form>
           <input type = "text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder = " Username" className = "loginInput"/>
           <br></br>
           <input type = "text" value={passInput} onChange={(e) => setPassInput(e.target.value)} placeholder = " Password" className = "loginInput"/>
           <br></br>
           
            <button type = "submit" className = "loginBtn" onClick={clicked}> LOGIN </button>
        </form>
    </div>

   </>
 );

}

export default Welcome;
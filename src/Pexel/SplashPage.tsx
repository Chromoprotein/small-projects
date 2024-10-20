import React from "react";
import InputAndLoader from "./InputAndLoader.tsx";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './pexel.css';

export default function SplashPage() {

  const navigate = useNavigate();

  // Tracks the user input
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setUserInput(newQuery);
  }

  // Manually submit the search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userInput && userInput.length > 0) {
      navigate(`/results?q=${encodeURIComponent(userInput)}&p=1`);
    }
  }

  return (
    <div className="container light">
      <img src="hero.jpeg" alt="" className="heroImage" />

      <div className="flexboxCol paddingB heroText">
        <h1 className="title">Free Stock Photos from Pexel API</h1>

        <InputAndLoader userInput={userInput} handleUserInput={handleUserInput} handleSearch={handleSearch} />

      </div>
    </div>
  );
}
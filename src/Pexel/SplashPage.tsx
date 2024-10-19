import React from "react";
import InputAndLoader from "./InputAndLoader.tsx";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './pexel.css';

export default function SplashPage() {

  const navigate = useNavigate();

  // Tracks the user input
  const [tempQuery, setTempQuery] = useState("");

  const handleTempQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setTempQuery(newQuery);
  }

  // Debounce the search
  useEffect(() => {
    if (tempQuery.trim() === "") return; // do not search if query is empty

    const timer = setTimeout(() => navigate(`/results?q=${encodeURIComponent(tempQuery)}`), 1000);

    return () => clearTimeout(timer);
  }, [tempQuery, navigate]);


  // Manually submit the search without waiting for the debounce
  const manualSearch = () => {
    if(tempQuery && tempQuery.length > 0) {
      navigate(`/results?q=${encodeURIComponent(tempQuery)}`);
    }
  }

  return (
    <div className="container light">
      <img src="hero.jpeg" alt="" className="heroImage" />

      <div className="flexboxCol paddingB heroText">
        <h1 className="title">Free Stock Photos from Pexel API</h1>

        <InputAndLoader query={tempQuery} handleTempQuery={handleTempQuery} manualSearch={manualSearch} />

      </div>
    </div>
  );
}
import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function InputAndLoader({userInput, handleUserInput, handleSearch, loading = false}) {
  return (
      <form className="loaderAndInputContainer" onSubmit={handleSearch}>
        <div className="input-container">
          <input type="text" placeholder="Search free photos" value={userInput} onChange={handleUserInput} name="search" />
          <button type="submit"><FaMagnifyingGlass /></button>
        </div>
        {loading && <span className="loader"></span>}
      </form>
  );
}
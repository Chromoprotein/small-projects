import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function InputAndLoader({query, handleTempQuery, manualSearch, loading = false}) {
  return (
    <div className="loaderAndInputContainer">
      <div className="input-container">
        <input type="text" placeholder="Search free photos" onChange={handleTempQuery} value={query} name="search" id="search" />
        <button type="button" onClick={manualSearch}><FaMagnifyingGlass /></button>
      </div>
      {loading && <span className="loader"></span>}
    </div>
  );
}
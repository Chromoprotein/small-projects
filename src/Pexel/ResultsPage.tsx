import React from "react";
import InputAndLoader from "./InputAndLoader.tsx";
import { Photo } from "./usePhotos";
import { useSearchParams } from "react-router-dom";
import { usePhotos } from "./usePhotos.ts";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "./useDebounce.ts";

export default function ResultsPage() {

  // Because of the sticky navbar, get the navbar height so that the content can be padded that much and won't be covered by the navbar
  const navbar = document.querySelector('.navbar');
  const height = navbar ? navbar.clientHeight : 0;

  // Query params from the URL when coming from splash page
  const [searchParams] = useSearchParams();
  const queryURL = searchParams.get('q');
  const navigate = useNavigate();

  // query = search words in the API call
  // photos = search results
  // getPhotos = function for searching
  const { query, setQuery, page, setPage, photos, getPhotos, errorMessage, totalPages, loading } = usePhotos();

  // If there is a query URL params, update the query to it
  useEffect(() => {
    if(queryURL) {
      setQuery(queryURL);
    }
  }, [queryURL, setQuery])

  // Tracking user input
  const [userInput, setUserInput] = useState<string>(queryURL || "");
  // Use custom debounce hook
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setUserInput(newQuery);
  }

  const debouncedQuery = useDebounce(userInput, 1000);
  // Trigger query change when debounced value updates
  useEffect(() => {
    if (debouncedQuery) {
      navigate(`/results?q=${encodeURIComponent(debouncedQuery)}`);
      setQuery(debouncedQuery);
    }
  }, [debouncedQuery, setQuery, navigate]);

  // Trigger search when query or page changes
  useEffect(() => {
    if (query && query.length > 0) {
      getPhotos();
    }
  }, [query, page, getPhotos]);

  const paginate = (nextPage: number) => {
    setPage(nextPage);
  }

  // Manually trigger search (without debounce)
  const manualSearch = () => {
    navigate(`/results?q=${encodeURIComponent(userInput)}`);
    setQuery(userInput);
  };

  return (
    <div className="container light">
      <nav className="flexbox left dark navbar">
        <a href="/" className="smallTitle">Pexel API</a>
        <InputAndLoader query={userInput} handleTempQuery={handleUserInput} manualSearch={manualSearch} loading={loading} />
      </nav>

      {errorMessage && <p>{errorMessage}</p>}

      {(photos && photos.length > 0) &&
        <div style={{marginTop: `${height}px`}}>
          <div className="flexbox centered fullHeigthWidth">
            {photos.map((photo: Photo) => 
            <img key={photo.id} src={photo.src} alt={photo.alt} className="image" />
          )}
          </div>
          <div className="flexbox centered paddingT paddingB fullHeigthWidth">
            <button onClick={() => paginate(page-1)} disabled={page === 1} className="button">Previous</button>
            <button onClick={() => paginate(page+1)} disabled={page === totalPages} className="button">Next</button>
          </div>
        </div>
      }
    </div>
  );
}
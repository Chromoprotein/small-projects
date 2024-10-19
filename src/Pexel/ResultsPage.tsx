import React from "react";
import InputAndLoader from "./InputAndLoader.tsx";
import { Photo } from "./usePhotos";
import { useSearchParams } from "react-router-dom";
import { usePhotos } from "./usePhotos.ts";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultsPage() {

  // Because of the sticky navbar, get the navbar height so that the content can be padded that much and won't be covered by the navbar
  const navbar = document.querySelector('.navbar');
  const height = navbar ? navbar.clientHeight : 0;

  // Query params from the URL when coming from splash page
  const [searchParams] = useSearchParams();
  const queryURL = searchParams.get('q');
  const pageURL = searchParams.get('p');

  const navigate = useNavigate();

  // query = search words in the API call
  // photos = search results
  // getPhotos = function for searching
  const { query, setQuery, page, setPage, photos, getPhotos, errorMessage, totalPages, loading } = usePhotos();

  // Use the search query or page number from the URL. This will trigger the search effect
  useEffect(() => {
    if (queryURL) setQuery(queryURL);
    if (pageURL) setPage(parseInt(pageURL));
  }, [queryURL, pageURL, setQuery, setPage]);

  // Tracking user input
  const [userInput, setUserInput] = useState<string>(queryURL || "");
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setUserInput(newQuery);
  }

  // Submit the search term, this will trigger the search effect
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      navigate(`/results?q=${encodeURIComponent(userInput)}`);
    }
  }

  // Submit the page number, this will trigger the search effect
  const paginate = (nextPage: number) => {
    setPage(nextPage);
    navigate(`/results?q=${encodeURIComponent(query)}&p=${nextPage}`);
  }

  // Trigger search when query or page changes
  useEffect(() => {
    if (query && query.length > 0) {
      getPhotos();
    }
  }, [query, page, getPhotos]);

  return (
    <div className="container light">
      <nav className="flexbox left dark navbar">
        <a href="/" className="smallTitle">Pexel API</a>
        <InputAndLoader userInput={userInput} handleUserInput={handleUserInput} handleSearch={handleSearch} loading={loading} />
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
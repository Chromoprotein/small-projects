import React, { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePhotos } from './usePhotos.ts';
import { Photo } from './usePhotos.ts';

export default function Photos() {

  const { query, setQuery, page, setPage, photos, getPhotos, errorMessage, totalPages, loading } = usePhotos();
  const [tempQuery, setTempQuery] = useState(query);

  // Tracking user input, this is updated immediately
  const handleTempQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setTempQuery(newQuery);
  }

  // Debounce the search. Search query is updated to user input after delay
  useEffect(() => {
    const timer = setTimeout(() => setQuery(tempQuery), 1000);

    return () => clearTimeout(timer);
  }, [tempQuery, setQuery]);

  // When the search query is updated, run the search
  useEffect(() => {
    getPhotos();
  }, [query, page, getPhotos])

  // Manually submit search without waiting for debounce
  const manualSearch = () => {
    setQuery(tempQuery);
  }

  const paginate = (nextPage: number) => {
    setPage(nextPage);
  }

  return (
    <div className="container light">

      <div className="dark flexboxCol paddingB">
        <h1 className="title">Pexels API project</h1>

        <div className="input-container">
          <input type="text" placeholder="Search free photos" onChange={handleTempQuery} name="search" id="search" />
          <button type="button" onClick={manualSearch}><FaMagnifyingGlass /></button>
        </div>

      </div>

      {(loading || errorMessage) && <div className="flexbox grow">
        {loading && <span className="loader"></span>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>}
      
      {(photos && photos.length > 0) &&
        <div className="paddingT">
          <div className="flexbox">
            {photos.map((photo: Photo) => 
            <img key={photo.id} src={photo.src} alt={photo.alt} className="image" />
          )}
          </div>
          <div className="flexbox paddingT paddingB">
            <button onClick={() => paginate(page+1)} disabled={page === totalPages} className="button">Next</button>
            <button onClick={() => paginate(page-1)} disabled={page === 1} className="button">Previous</button>
          </div>
        </div>
      }
      
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePhotos } from './usePhotos.ts';
import { Photo } from './usePhotos.ts';

export default function Photos() {

  // query = the query sent to the API
  // page = current page of photos
  // photos = the search result, an array of photos
  const { query, setQuery, page, setPage, photos, getPhotos, errorMessage, totalPages, loading, reset } = usePhotos();

  const [showSplashPage, setShowSplashPage] = useState<boolean>(true);

  // Tracks the user input
  const [tempQuery, setTempQuery] = useState(query);
  // Tracking user input, this is updated immediately
  const handleTempQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setTempQuery(newQuery);
  }

  // Debounce the search
  // The search query (query) is updated to the user input (tempQuery) after a delay
  useEffect(() => {
    const timer = setTimeout(() => setQuery(tempQuery), 1000);

    return () => clearTimeout(timer);
  }, [tempQuery, setQuery]);

  // When the search query is updated, run the search automatically
  useEffect(() => {
    if(query) {
      setShowSplashPage(false);
      getPhotos();
    }
  }, [query, page, getPhotos])

  // Manually submit the search without waiting for the debounce
  const manualSearch = () => {
    setQuery(tempQuery);
  }

  const paginate = (nextPage: number) => {
    setPage(nextPage);
  }

  const handleReset = () => {
    reset(); // resets the query and photos array
    setTempQuery("");
    setShowSplashPage(true);
  }

  return (
    <div className="container light">

      {showSplashPage ?
        <SplashPage handleTempQuery={handleTempQuery} manualSearch={manualSearch} loading={loading} errorMessage={errorMessage} />
      :
        <ResultsPage handleTempQuery={handleTempQuery} manualSearch={manualSearch} loading={loading} photos={photos} paginate={paginate} page={page} totalPages={totalPages} reset={handleReset} />
      }
    
    </div>
    
  );
}

export function SplashPage({handleTempQuery, manualSearch, loading, errorMessage}) {
  return (
    <>
      <img src="hero.jpeg" alt="" className="heroImage" />

      <div className="flexboxCol paddingB heroText">
        <h1 className="title">Free Stock Photos from Pexel API</h1>

        <InputAndLoader handleTempQuery={handleTempQuery} manualSearch={manualSearch} loading={loading} />

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
}

export function InputAndLoader({handleTempQuery, manualSearch, loading}) {
  return (
    <div className="loaderAndInputContainer">
      <div className="input-container">
        <input type="text" placeholder="Search free photos" onChange={handleTempQuery} name="search" id="search" />
        <button type="button" onClick={manualSearch}><FaMagnifyingGlass /></button>
      </div>
      {loading && <span className="loader"></span>}
    </div>
  );
}

export function ResultsPage({handleTempQuery, manualSearch, loading, photos, paginate, page, totalPages, reset}) {

  const navbar = document.querySelector('.navbar');
  const height = navbar ? navbar.clientHeight : 0;

  return (
    <div>
      <nav className="flexbox left dark navbar">
        <span className="smallTitle" onClick={reset}>Pexel API</span>
        <InputAndLoader handleTempQuery={handleTempQuery} manualSearch={manualSearch} loading={loading} />
      </nav>

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
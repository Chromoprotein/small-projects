import React, { useEffect } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePhotos } from './usePhotos.ts';
import { Photo } from './usePhotos.ts';

export default function Photos() {

  const { query, setQuery, page, setPage, photos, getPhotos, errorMessage, totalPages, loading } = usePhotos();

  useEffect(() => {
    getPhotos();
  }, [query, page, getPhotos])

  const debounce = (callback, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  }

  const debouncedSearch = debounce(handleSearch);

  const paginate = (nextPage: number) => {
    setPage(nextPage);
  }

  console.log(page);

  return (
    <div className="container light">

      <div className="dark flexboxCol paddingB">
        <h1 className="title">Pexels API project</h1>

        <div className="input-container">
          <input type="text" placeholder="Search free photos" onChange={debouncedSearch} name="search" id="search" />
          <button type="button"><FaMagnifyingGlass /></button>
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
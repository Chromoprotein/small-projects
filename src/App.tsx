import React, { useState, useEffect, useCallback } from 'react';
import Posts from './PlaceholderPosts/Posts.tsx';
import TodoList from './ToDoList/toDoList.js';
import axios from 'axios';
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Photo {
  id: string;
  src: string;
  alt: string;
}

function usePhotos() {

  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();

  const getPhotos = useCallback(async () => {
    try {
      if(query.length > 2) {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/images", {
          params: { 
            query: query,
            page: page
          },
        });
        const mappedResults = response.data.photos.map((photo) => {
          return {
            id: photo.id,
            src: photo.src.original,
            alt: photo.alt,
          }
        });
        setPhotos(mappedResults);
        setTotalPages(Math.ceil(response.data.total_results/response.data.per_page));
        console.log(response.data)
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [query, page])

  return { query, setQuery, page, setPage, photos, getPhotos, errorMessage, totalPages, loading }
}

function App() {

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

export default App;

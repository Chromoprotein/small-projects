import axios from 'axios';
import { useState, useCallback } from 'react';

export interface Photo {
  id: string;
  src: string;
  originalSrc: string;
  alt: string;
}

export function usePhotos() {

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
            src: photo.src.medium,
            originalSrc: photo.src.original,
            alt: photo.alt,
          }
        });
        setPhotos(mappedResults);
        setTotalPages(Math.ceil(response.data.total_results/response.data.per_page));
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [query, page])

  return { query, setQuery, page, setPage, photos, getPhotos, errorMessage, totalPages, loading }
}
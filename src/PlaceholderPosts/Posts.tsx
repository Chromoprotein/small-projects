import React, { useState, useEffect, ReactNode } from 'react';
import { usePosts } from './usePosts.ts';

export default function Posts() {

  const [page, setPage] = useState(0);
  const { posts, getPosts, loading, errorMessage } = usePosts();

  useEffect(() => {
    getPosts();
  }, [getPosts])

  if(loading) return "Loading...";

  const errorElement = 
  <div>
    <p>{errorMessage}</p>
    <button onClick={() => getPosts()}>Retry</button>
  </div>

  //Pagination
  const paginate = (pageNum: number) => {
    setPage(pageNum);
  }
  const totalPages = Math.ceil(posts.length / 10);
  const postsPerPage = 10;
  const currentPosts = posts.slice(page * postsPerPage, (page+1) * postsPerPage);

  // Map the posts
  const mapPosts: ReactNode = currentPosts.map((post, index) => {
    return <div key={index}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  })

  return (
    <div>
      <h1>Placeholder posts API</h1>
      
      {errorMessage ? errorElement : mapPosts}

      {page > 0 && <button onClick={() => paginate(page-1)}>Previous</button>}
      {page < totalPages && <button onClick={() => paginate(page+1)}>Next</button>}

    </div>
  );
}
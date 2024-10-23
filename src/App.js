import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ToDoList from './ToDoList/ToDoList.js';
import Posts from './PlaceholderPosts/Posts.tsx';

const router = createBrowserRouter([
  {
    path: "/todo",
    element: <ToDoList />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
import React from 'react';
import ResultsPage from './Pexel/ResultsPage.tsx';
import SplashPage from './Pexel/SplashPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FullImagePage from './Pexel/FullImagePage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    path: "results",
    element: <ResultsPage />,
  },
  {
    path: "fullImage/:image",
    element: <FullImagePage />,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
import React from 'react';
import ResultsPage from './Pexel/ResultsPage.tsx';
import SplashPage from './Pexel/SplashPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    path: "results",
    element: <ResultsPage />,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
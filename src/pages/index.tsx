import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewsPage from './News';
import PieceOfNews from './PieceOfNews';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NewsPage />,
  },
  {
    path: '/:id',
    element: <PieceOfNews />,
  }
])
const Routing: React.FC = () => {
  // todo: add reset scroll hook here

  return (
    <RouterProvider router={router} />
  )
}

export default Routing;
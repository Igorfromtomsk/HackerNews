import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import StoriesPage from './Stories';
import Story from './Story';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <StoriesPage />,
      },
      {
        path: '/:id',
        element: <Story />,
      },
    ],
  },
]);

const Routing: React.FC = () => {
  return (
    <RouterProvider router={router} />    
  );
};

export default Routing;
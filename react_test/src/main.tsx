import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider  }  from 'react-router-dom';
import App from './App';
import Images from './pages/Images';
import ImageDetail from './pages/ImageDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        { index: true, element: <Images /> },
        { path: "images", element: <Images /> },
        { path: "images/:imageId", element: <ImageDetail /> },
      ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

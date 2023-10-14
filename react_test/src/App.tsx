import React from 'react';
import './App.css'
import { BrowserRouter, Outlet } from 'react-router-dom';
import { ImageProvider } from './context/ImageProvider';

function App() {

  return (
    <ImageProvider>
        <Outlet />
    </ImageProvider>
  )
}

export default App

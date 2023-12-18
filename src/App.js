import './App.css';

import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import NotFound from './NotFound';

import { Header, Footer } from './components';
import Temp from './Temp';
import MainPage from './pages/main/MainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

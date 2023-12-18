import './App.css';

import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import NotFound from './NotFound';

import { Header, Footer } from './components';
import Temp from './Temp.js';
// import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Temp />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

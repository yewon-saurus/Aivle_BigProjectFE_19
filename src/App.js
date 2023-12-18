import './App.css';

import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import NotFound from './NotFound';

import { Header, Footer, PrivateRoute } from './components';
import Temp from './Temp';
import Main from './pages/main/Main';
import Info from './pages/info/Info';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          {/* 로그인 O -> Main, 로그인 X -> Info(소개페이지) */}
          <Route path="/" element={<PrivateRoute isThatTrue={isLogin} isTrue={<Main />} isFalse={<Info />} />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

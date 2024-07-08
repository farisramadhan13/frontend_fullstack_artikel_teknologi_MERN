// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail'; // Import halaman detail artikel

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/article/:id" element={<ArticleDetail />} /> {/* Rute untuk detail artikel */}
      </Routes>
    </Router>
  );
};

export default App;

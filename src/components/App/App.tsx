import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from "../AppHeader";
import { ConstructorPage } from '../../pages';

import './App.module.scss';

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<ConstructorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
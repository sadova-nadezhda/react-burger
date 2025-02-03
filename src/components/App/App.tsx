import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from "../AppHeader";
import { ConstructorPage, ProfilePage, IngredientPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from '../../pages';

import './App.module.scss';

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<ConstructorPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/ingredients" element={<IngredientPage />} />
      </Routes>
    </Router>
  );
}

export default App;
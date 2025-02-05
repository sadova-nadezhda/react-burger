import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from "../AppHeader";
import { ConstructorPage, ProfilePage, IngredientPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFoundPage } from '../../pages';
import ProtectedRouteElement from "./ProtectedRouteElement";

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
        

        <Route 
          path="/reset-password" 
          element={
            <ProtectedRouteElement fallBackRoute="/forgot-password">
              <ResetPasswordPage />
            </ProtectedRouteElement>
          }
        />

        <Route 
          path="/profile" 
          element={
            <ProtectedRouteElement fallBackRoute="/login">
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />
         <Route 
          path="/profile/*" 
          element={
            <ProtectedRouteElement fallBackRoute="/login">
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />

        <Route path="/ingredients" element={<IngredientPage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
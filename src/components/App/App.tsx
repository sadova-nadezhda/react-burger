import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAppDispatch } from "../../hooks/store";
import AppHeader from "../AppHeader";
import { ConstructorPage, ProfilePage, IngredientPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFoundPage } from '../../pages';
import ProtectedRouteElement from "./ProtectedRouteElement";
import Modal from '../Modal';
import { useModal } from "../../hooks/useModal";
import IngredientDetails from '../IngredientDetails';
import { clearCurrentIngredient } from "../../services/ingredients/slice";

import './App.module.scss';


function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const { closeModal } = useModal();
  return (
    <>
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

        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                onClose={() => {
                  closeModal();
                  dispatch(clearCurrentIngredient());
                }}
                title="Детали ингредиента"
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
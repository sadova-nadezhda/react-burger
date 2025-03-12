import React, { useEffect, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "../AppHeader";
import {
  ConstructorPage,
  ProfilePage,
  IngredientPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  FeedPage,
  NotFoundPage,
} from "../../pages";
import ProfileForm from "../Form/ProfileForm";
import OrdersHistory from "../OrdersHistory";
import ProtectedRoute from "./ProtectedRoute";
import ResetPasswordRoute from "./ResetPasswordRoute";
import IngredientModal from "../Modal/IngredientModal";
import { useAppDispatch } from "../../hooks/store";
import { checkAuth } from "../../services/auth/actions";
import { fetchIngredients } from "../../services/ingredients/actions";

import "./App.module.scss";

const App = () => {
  const location = useLocation();
  const background = useMemo(() => location.state?.background, [location]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="/reset-password"
          element={
            <ResetPasswordRoute />
          }
        />

        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<OrdersHistory />} />
          {/* <Route path="orders/:id" element={<OrdersHistory />} /> */}
        </Route>

        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="/feed" element={<FeedPage />} />
        {/* <Route path="/feed/:id" element={<FeedPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
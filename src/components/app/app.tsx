import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from "../../pages/home";
import NotFound from "../../pages/notFound";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgotPassword";
import ResetPasswordPage from "../../pages/resetPassword";
import ProfilePage from "../../pages/profile";
import AppHeader from "../appHeader/appHeader";
import { ProtectedRoute } from "../protectedRoute";
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/actions';
import { RootStateOrAny } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientDetails/ingredientDetails";

export default function App() {
  const dispatch = useDispatch();
  const ingridientPopup = useSelector((store: RootStateOrAny) => ({ ingridientPopup: store.ingredient.ingridientPopup }))
  const open = Boolean(ingridientPopup);
  //console.log(open)

  React.useEffect(() => {
      dispatch(getItems());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes >
        <Route path="/*" element={ <HomePage /> }/>
        <Route path="/profile/*" element={ <ProtectedRoute><ProfilePage /></ProtectedRoute> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/forgot-password" element={ <ForgotPasswordPage />} />
        <Route path="/reset-password" element={ <ResetPasswordPage /> }/> 
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
}

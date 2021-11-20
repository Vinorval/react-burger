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
import { CLOSE_POPUP } from "../../services/actions/actions";
import { IngridientPage } from "../../pages/ingredient";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const localPopup = localStorage.getItem('popup');
  let state = location.state as { backgroundLocation?: Location };
  const {ingridientPopup, items} = useSelector((store: RootStateOrAny) => ({ ingridientPopup: store.ingredient.ingridientPopup, items: store.items.items }))
  const open = localPopup ? localPopup : Boolean(ingridientPopup);
  console.log(Location)

  React.useEffect(() => {
      dispatch(getItems());
  }, [dispatch]);

  const closePopup = () => {
    localStorage.setItem('popup', 'false')
    dispatch({
      type: CLOSE_POPUP,
      ingredient: {},
      order: {}
    });
    //localStorage.removeItem('ingr')
  }

  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/ingredients/:id" element={<IngridientPage />} />
        <Route path="/profile/*" element={ <ProtectedRoute><ProfilePage /></ProtectedRoute> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/forgot-password" element={ <ForgotPasswordPage />} />
        <Route path="/reset-password" element={ <ResetPasswordPage /> }/> 
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={
          <Modal isOpen={Boolean(open)} title='Детали ингредиента' closePopup={closePopup}>
            <IngredientDetails/>
          </Modal>} />
        </Routes>
      )}
    </>
  );
}

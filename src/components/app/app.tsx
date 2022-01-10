import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "../../services/hooks";

import AppHeader from "../appHeader/appHeader";
import { ProtectedRoute } from "../protectedRoute";
import { getItems } from '../../services/actions/actions';
import { CLOSE_POPUP } from "../../services/actions/actions";

import HomePage from "../../pages/home";
import NotFound from "../../pages/notFound";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgotPassword";
import ResetPasswordPage from "../../pages/resetPassword";
import ProfilePage from "../../pages/profile";
import FeedPage from "../../pages/feed";
import OrderPage from "../../pages/order";
import { IngridientPage } from "../../pages/ingredient";
import { Modal } from "../modal/modal";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import OrderPopup from "../orderPopup/orderPopup";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  //const { isFeddOrder, setFeedOrder } = useState<boolean>(false);
  const [ feedOrder, setFeedOrder] = useState<boolean>(false);
  const [ profileOrder, setProfileOrder ] = useState<boolean>(false);
  const localPopup = localStorage.getItem('popup');
  const feedPopup = localStorage.getItem('orderPopup');
  const profilePopup = localStorage.getItem('profilePopup');
  const state = location.state as { backgroundLocation?: Location; backgroundForFeed?: Location; backgroundForProfile?: Location };
  const {ingridientPopup} = useSelector((store) => ({ ingridientPopup: store.ingredient.ingridientPopup, items: store.items }))
  const open = localPopup ? localPopup : Boolean(ingridientPopup);
  //const openFeed = feedPopup ? feedPopup : false;
  //const openProfile = profilePopup ? profilePopup : false;

  React.useEffect(() => {
      dispatch(getItems());
  }, [dispatch]);

  const closePopup = () => {
    localStorage.setItem('popup', 'false')
    setFeedOrder(false);
    setProfileOrder(false);
    //localStorage.setItem('orderPopup', 'false')
    //localStorage.setItem('profilePopup', 'false')
    if (state.backgroundLocation) navigate('/');
    if (state.backgroundForFeed) navigate(-1);
    if (state.backgroundForProfile) navigate(-1);
    dispatch({
      type: CLOSE_POPUP,
      ingredient: {},
      order: {}
    });
  }

  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/ingredients/:id" element={<IngridientPage />} />
        <Route path="/profile/*" element={ <ProtectedRoute><ProfilePage openPopup={setProfileOrder} /></ProtectedRoute> } />
        <Route path="/profile/orders/:id" element={<OrderPage />} />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/feed" element={ <FeedPage openPopup={setFeedOrder} /> } />
        <Route path="/feed/:id" element={ <OrderPage/> } />
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
      {state?.backgroundForFeed && (
        <Routes>
          <Route path="/feed/:id" element={
          <Modal isOpen={feedOrder} closePopup={closePopup}>
            <OrderPopup/>
          </Modal>} />
        </Routes>
      )}
      {state?.backgroundForProfile && (
        <Routes>
          <Route path="/profile/orders/:id" element={
          <Modal isOpen={profileOrder} closePopup={closePopup}>
            <OrderPopup/>
          </Modal>} />
        </Routes>
      )}
    </>
  );
}

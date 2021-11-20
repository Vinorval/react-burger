import React from "react";
import appStyles from '../components/app/app.module.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CLOSE_POPUP } from '../services/actions/actions';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';
import Modal from '../components/modal/modal';
import OrderDetails from "../components/orderDetails/orderDetails";
import IngredientDetails from "../components/ingredientDetails/ingredientDetails";

export default function HomePage () {
  const popupIngr = Boolean(localStorage.getItem('popup'));
  const [popupOrder, setPopupOrder] = React.useState(false);
  const [popupIngredient, setPopupIngredient] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setPopupIngredient(popupIngr);
  }, [popupIngr])

  const handleOpenPopupOrder = () => {
    setPopupOrder(true);
  }

  const handleIngredientClick = () => {
    setPopupIngredient(true);
    localStorage.setItem('popup', true)
    console.log(popupIngredient)
  }

  const closePopup = () => {
    setPopupOrder(false);
    setPopupIngredient(false);
    localStorage.setItem('popup', false)
    dispatch({
      type: CLOSE_POPUP,
      ingredient: {},
      order: {}
    });
  };

  return (
    <div className={appStyles.App}>
    <DndProvider backend={HTML5Backend}>
      <main className={appStyles.main}>
        <h2 className={appStyles.title}>Соберите бургер</h2>
        <BurgerIngredients onClick={handleIngredientClick}/>
        <BurgerConstructor openPopup={handleOpenPopupOrder} />
      </main>
    </DndProvider>
    <Modal isOpen={popupOrder} title='' closePopup={closePopup}>
      <OrderDetails/>
    </Modal>
    <Routes>
      <Route path="ingredients/:id" element={
        <Modal isOpen={popupIngredient} title='Детали ингредиента' closePopup={closePopup}>
          <IngredientDetails/>
        </Modal>
      }/>
    </Routes>
  </div>
  )
}
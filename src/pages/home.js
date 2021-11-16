import React from "react";
import appStyles from '../components/app/app.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../components/appHeader/appHeader';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';
import Modal from '../components/modal/modal';
import OrderDetails from "../components/orderDetails/orderDetails";
import IngredientDetails from "../components/ingredientDetails/ingredientDetails";

export default function HomePage () {
  const [popupOrder, setPopupOrder] = React.useState(false);
  const [popupIngredient, setPopupIngredient] = React.useState(false);

  const handleOpenPopupOrder = () => {
    setPopupOrder(true);
  }

  const handleIngredientClick = () => {
    setPopupIngredient(true);
  }

  const closePopup = () => {
    setPopupOrder(false);
    setPopupIngredient(false);
  };

  return (
    <div className={appStyles.App}>
    <AppHeader/>
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
    <Modal isOpen={popupIngredient} title='Детали ингредиента' closePopup={closePopup}>
      <IngredientDetails/>
    </Modal>
  </div>
  )
}
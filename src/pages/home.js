import React from "react";
import appStyles from '../components/app/app.module.css';
import { useDispatch } from 'react-redux';
import { CLOSE_POPUP } from '../services/actions/actions';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../components/burgerConstructor/burgerConstructor';
import { Modal } from '../components/modal/modal';
import OrderDetails from "../components/orderDetails/orderDetails";

export default function HomePage () {
  const [popupOrder, setPopupOrder] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpenPopupOrder = () => {
    setPopupOrder(true);
  }

  const closePopup = () => {
    setPopupOrder(false);
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
        <BurgerIngredients />
        <BurgerConstructor openPopup={handleOpenPopupOrder} />
      </main>
    </DndProvider>
    <Modal isOpen={popupOrder} title='' closePopup={closePopup}>
      <OrderDetails/>
    </Modal>
  </div>
  )
}
import React from "react";
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader.js';
import BurgerIngredients from '../burgerIngredients/burgerIngredients.js';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { DataConstructor, NumberOrder } from '../../servieces/appContext';

function App() {
  const [data, setData] = React.useState([]);
  const [numberOrder, setNumberOrder] = React.useState(0);
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
      <DataConstructor.Provider value={{ data, setData}}>
        <NumberOrder.Provider value={{numberOrder, setNumberOrder}}>
          <AppHeader/>
          <main className={appStyles.main}>
            <h2 className={appStyles.title}>Соберите бургер</h2>
            <BurgerIngredients onClick={handleIngredientClick}/>
            <BurgerConstructor openPopup={handleOpenPopupOrder} />
          </main>
          <Modal isOpen={popupOrder} title='' closePopup={closePopup}>
            <OrderDetails/>
          </Modal>
          <Modal isOpen={popupIngredient} title='Детали ингредиента' closePopup={closePopup}>
            <IngredientDetails/>
          </Modal>
        </NumberOrder.Provider>
      </DataConstructor.Provider>
    </div>
  );
}

export default App;
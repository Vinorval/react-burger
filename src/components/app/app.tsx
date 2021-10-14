import React from "react";
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader.js';
import BurgerIngredients from '../burgerIngredients/burgerIngredients.js';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import ModalOverlay from "../modalOverlay/modalOverlay";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = React.useState([]);
  const [bun, setBun] = React.useState({});
  const [popupOrder, setPopupOrder] = React.useState(false);
  const [popupIngredient, setPopupIngredient] = React.useState(false);
  const [imageIngredient, setImageIngredient] = React.useState('');
  const [nameIngredient, setNameIngredient] = React.useState('');
  const [property, setProperty] = React.useState({});

  React.useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setData(data.data);
        const bunDate = () => data.data.find((item:any) => { return item.type === "bun"});
        setBun(bunDate());
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  const handleOpenPopupOrder = () => setPopupOrder(true);

  const handleIngredientClick = (image:string, name:string, property:any) => {
    setPopupIngredient(true);
    setImageIngredient(image);
    setNameIngredient(name);
    setProperty(property);

  }

  const closePopup = () => {
    setPopupOrder(false);
    setPopupIngredient(false);
  };

  return (
    <div className={appStyles.App}>
      <AppHeader/>
      <main className={appStyles.main}>
        <h2 className={appStyles.title}>Соберите бургер</h2>
        <BurgerIngredients data={data} onClick={handleIngredientClick}/>
        <BurgerConstructor bun={bun} data={data} openPopup={handleOpenPopupOrder} />
      </main>
      <ModalOverlay isOpen={popupOrder} closePopup={closePopup}>
        <Modal title='' closePopup={closePopup}>
          <OrderDetails/>
        </Modal>
      </ModalOverlay>
      <ModalOverlay isOpen={popupIngredient} closePopup={closePopup}>
        <Modal title='Детали ингредиента' closePopup={closePopup}>
          <IngredientDetails image={imageIngredient} name={nameIngredient} property={property}/>
        </Modal>
      </ModalOverlay>
    </div>
  );
}

export default App;
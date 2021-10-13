import React from "react";
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader.js';
import BurgerIngredients from '../burgerIngredients/burgerIngredients.js';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
//import data from '../../utils/data';
const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = React.useState([]);
  const [bun, setBun] = React.useState({});

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

  return (
    <div className={appStyles.App}>
      <AppHeader/>
      <main className={appStyles.main}>
        <h2 className={appStyles.title}>Соберите бургер</h2>
        <BurgerIngredients data={data}/>
        <BurgerConstructor bun={bun} data={data} />
      </main>
    </div>
  );
}

export default App;
import appStyles from './app.module.css';
import AppHeader from '../appHeader/appHeader.js';
import BurgerIngredients from '../burgerIngredients/burgerIngredients.js';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import data from '../../utils/data';

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader/>
      <main className={appStyles.main}>
        <h2 className={appStyles.title}>Соберите бургер</h2>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
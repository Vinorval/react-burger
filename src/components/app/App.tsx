import React from 'react';
import './App.css';
import AppHeader from '../appHeader/appHeader.js';
import BurgerIngredients from '../burgerIngredients/burgerIngredients.js';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import data from '../../utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main className="main">
        <h2 className="title">Соберите бургер</h2>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;

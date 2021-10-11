import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import AppHeader from '../appHeader/appHeader.js';
import BurgerIngredients from '../burgerIngredients/burgerIngredients.js';
import data from '../../utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main className="main">
        <h2 className="title">Соберите бургер</h2>
        <BurgerIngredients data={data}/>
      </main>
    </div>
  );
}

export default App;

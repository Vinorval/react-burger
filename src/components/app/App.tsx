import React from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import AppHeader from '../appHeader/appHeader.js';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main>
        <h2>Соберите бургер</h2>
      </main>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

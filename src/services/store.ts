import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middlewares/soketMiddleware';
import { rootReducer } from '../services/reducers/rootReducer';
import thunk from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));
  
export const store = createStore(rootReducer, enhancer);
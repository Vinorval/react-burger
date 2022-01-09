import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middlewares/soketMiddleware';
import { rootReducer } from '../services/reducers/rootReducer';
import thunk from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({} as any) : compose;
  
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));
  
export const store = createStore(rootReducer, enhancer);
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middlewares/soketMiddleware';
import { rootReducer } from '../services/reducers/rootReducer';
import thunk from 'redux-thunk';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_SEND_ORDER
} from './actions/wsActionTypes';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_ORDER,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS
};
  
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({} as any) : compose;
  
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));
  
export const store = createStore(rootReducer, enhancer);
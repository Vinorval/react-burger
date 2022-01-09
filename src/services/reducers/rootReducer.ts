import { combineReducers } from 'redux';
import { ingredientsReducer, burgerReducer, detailsReducer, orderReducer } from './reducers';
import { auth } from './auth';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
    burgerItems: burgerReducer,
    items: ingredientsReducer,
    ingredient: detailsReducer,
    order: orderReducer,
    orders: wsReducer,
    auth: auth,
  });
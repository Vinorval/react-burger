import { combineReducers } from 'redux';
import { ingredientsReducer, burgerReducer, detailsReducer, orderReducer } from './reducers';
import { auth } from './auth';

export const rootReducer = combineReducers({
    burgerItems: burgerReducer,
    items: ingredientsReducer,
    ingredient: detailsReducer,
    order: orderReducer,
    auth: auth,
  });
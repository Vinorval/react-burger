import { combineReducers } from 'redux';
import { ingredientsReducer, burgerReducer, detailsReducer, orderReducer } from './reducers';

export const rootReducer = combineReducers({
    burgerItems: burgerReducer,
    items: ingredientsReducer,
    ingredient: detailsReducer,
    order: orderReducer
  });
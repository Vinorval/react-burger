import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
  
    ADD_ITEM,
    DELETE_ITEM,
    CHANGE_BUN,
    CHANCE_ITEMS,
  
    OPEN_POPUP,
    CLOSE_POPUP,
  
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
  } from '../actions/actions';

import { TGetIngredientsActions, TPostOrderActions, TBurgerActions, TPopupActions } from '../actions/actions';
import { TIngredientConstructor, TIngredientMore, TIngredient, TOrder } from '../../utils/types';
  

type TInitialStatte = {
  items: readonly TIngredient[] | [];
  itemsFailed: boolean;

  burgerItems: Array<TIngredientConstructor>;
  burgerItemsFailed: boolean;
  bun: TIngredient | {};
  quantity: Array<TIngredientMore> | [];
  quantityBun: TIngredientMore | {};

  ingredient: TIngredientMore | {};
  ingridientPopup: boolean;

  order: TOrder | {};
  orderFailed: boolean;
}

  const initialState: TInitialStatte = {
    
      items: [],
      itemsFailed: false,
    
      burgerItems: [],
      burgerItemsFailed: false,
      bun: {},
      quantity: [],
      quantityBun: {},
  
      ingredient: {},
      ingridientPopup: false,
  
      order: {},
      orderFailed: false
  };
  
  export const ingredientsReducer = (state = initialState, action: TGetIngredientsActions): TInitialStatte => {
    switch (action.type) {
      case GET_ITEMS_SUCCESS: {
        return { ...state, items: action.items, itemsFailed: false };
      }
      case GET_ITEMS_FAILED: {
        return { ...state, itemsFailed: true};
      }
      default: {
        return state;
      }
    }
  };
  
  export const burgerReducer = (state = initialState, action: TBurgerActions) => {
    switch (action.type) {
      case ADD_ITEM: {
        const check = state.quantity!.find((item: TIngredientMore) => item._ID === action.item._id)
          ? state.quantity!.map((item: TIngredientMore) => item._ID === action.item._id && ++item.qt)
          : { _ID: action.item._id, qt: 1, id: Math.floor(Math.random() * 10000)};
        return {
          ...state,
          burgerItems: [...state.burgerItems, action.item],
          quantity: [...state.quantity, check] }
      }
      case DELETE_ITEM: {
        const check = state.quantity!.map((item: TIngredientMore) => item._ID === action._id && --item.qt)
        return { ...state, burgerItems: [...state.burgerItems].filter((item: TIngredientConstructor) => item.id !== action.id), quantity: [...state.quantity, check] }
      }
      case CHANGE_BUN: {
        return { ...state, bun: action.bun, quantityBun: { _ID: action.bun._id, qt: 2, id: Math.floor(Math.random() * 10000)} }
      }
      case CHANCE_ITEMS: {
        return {...state, burgerItems: action.items}
      }
      default: {
        return state;
      }
    }
  };
  
  export const detailsReducer = (state = initialState, action: TPopupActions) => {
    switch (action.type) {
      case OPEN_POPUP: {
        return { ...state, ingredient: action.ingredient, ingridientPopup: true }
      }
      case CLOSE_POPUP: {
        return { ...state, ingredient: {}, order: {}, ingridientPopup: false }
      }
      default: {
        return state;
      }
    }
  }
  
  export const orderReducer = (state = initialState, action: TPostOrderActions) => {
    switch (action.type) {
      case GET_ORDER_SUCCESS: {
        return { ...state, order: action.order, orderFailed: false };
      }
     case GET_ORDER_FAILED: {
        return { ...state, orderFailed: true, order: {} };
      }
      default: {
        return state;
      }
    }
  };
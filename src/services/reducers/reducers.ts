import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
  
    ADD_ITEM,
    DELETE_ITEM,
    CHANGE_BUN,
    CHANCE_ITEMS,
    INCREASE_ITEM_COUNT,
    DECREASE_ITEM_COUNT,
  
    OPEN_POPUP,
    CLOSE_POPUP,
  
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
  } from '../actions/actions';

import { TGetIngredientsActions, TPostOrderActions, TBurgerActions, TPopupActions } from '../actions/actions';
import { TIngredientConstructor, TIngredientMore, TIngredient, TOrder } from '../../utils/types';
  

type TInitialStatte = {
  items: readonly TIngredient[] | null;
  itemsFailed: boolean;

  burgerItems: Array<TIngredientConstructor>;
  burgerItemsFailed: boolean;
  bun: TIngredient | null;
  quantity: Array<TIngredientMore> | [];
  quantityBun: TIngredientMore | {};

  ingredient: TIngredientMore | {};
  ingridientPopup: boolean;

  order: TOrder | null;
  orderFailed: boolean;
}

  const initialState: TInitialStatte = {
    
      items: null,
      itemsFailed: false,
    
      burgerItems: [],
      burgerItemsFailed: false,
      bun: null,
      quantity: [],
      quantityBun: {},
  
      ingredient: {},
      ingridientPopup: false,
  
      order: { number: 'немного подождите' },
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
      case INCREASE_ITEM_COUNT: {
        return { ...state, items: state.items!.map(el => (el._id === action.payload.item._id ? { ...el, qty: ( el.qty ? el.qty : 0) + action.payload.qty } : el)) }
      }
      case DECREASE_ITEM_COUNT: {
        return { ...state, items: state.items!.map(el => (el._id === action.payload.item._id ? { ...el, qty: ( el.qty ? el.qty : 0) - action.payload.qty } : el)) }
      }
      default: {
        return state;
      }
    }
  };
  
  export const burgerReducer = (state = initialState, action: TBurgerActions): TInitialStatte => {
    switch (action.type) {
      case ADD_ITEM: {
        return {
          ...state,
          burgerItems: [...state.burgerItems, action.item],
        }
      }
      case DELETE_ITEM: {
        return { ...state, burgerItems: [...state.burgerItems].filter((item: TIngredientConstructor) => item.id !== action.id) }
      }
      case CHANGE_BUN: {
        return { ...state, bun: action.bun }
      }
      case CHANCE_ITEMS: {
        return {...state, burgerItems: action.items}
      }
      default: {
        return state;
      }
    }
  };
  
  export const detailsReducer = (state = initialState, action: TPopupActions): TInitialStatte => {
    switch (action.type) {
      case OPEN_POPUP: {
        return { ...state, ingredient: action.ingredient, ingridientPopup: true }
      }
      case CLOSE_POPUP: {
        return { ...state, ingredient: {}, order: null, ingridientPopup: false }
      }
      default: {
        return state;
      }
    }
  }
  
  export const orderReducer = (state = initialState, action: TPostOrderActions): TInitialStatte => {
    switch (action.type) {
      case GET_ORDER_SUCCESS: {
        return { ...state, order: action.order, orderFailed: false };
      }
     case GET_ORDER_FAILED: {
        return { ...state, orderFailed: true, order: { number: 'немного подождите' } };
      }
      case CLOSE_POPUP: {
        return { ...state, ingredient: {}, order: { number: 'немного подождите' }, ingridientPopup: false }
      }
      default: {
        return state;
      }
    }
  };
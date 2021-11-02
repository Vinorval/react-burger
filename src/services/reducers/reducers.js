import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,

  GET_BURGER_ITEMS_SUCCESS,
  GET_BURGER_ITEMS_FAILED,
  ADD_ITEM,
  DELETE_ITEM,
  CHANGE_BUN,

  OPEN_POPUP,
  CLOSE_POPUP
} from '../actions/actions';

const initialState = {
  
    items: [],
    itemsFailed: false,
  
    burgerItems: [],
    burgerItemsFailed: false,
    bun: {},

    ingredient: {},

    order: {},
    orderFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
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

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
     case GET_BURGER_ITEMS_SUCCESS: {
      return { ...state, burgerItems: action.items, burgerItemsFailed: false, bun: action.bun };
    }
    case GET_BURGER_ITEMS_FAILED: {
      return { ...state, burgerItemsFailed: true };
    }
    case ADD_ITEM: {
      return { ...state, burgerItems: [...state.burgerItems, ...state.postponed.filter(item => item.id === action.id)] }
    }
    case DELETE_ITEM: {
      return { ...state, burgerItems: [...state.burgerItems].filter(item => item.id !== action.id) }
    }
    case CHANGE_BUN: {
      return { ...state, bun: action.bun }
    }
    default: {
      return state;
    }
  }
};

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP: {
      return { ...state, ingredient: action.ingredient }
    }
    case CLOSE_POPUP: {
      return { ...state, ingredient: {} }
    }
    default: {
      return state;
    }
  }
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDER_SUCCESS': {
      return { ...state, order: action.order, orderFailed: false };
    }
   case 'GET_ORDER_FAILED': {
      return { ...state, orderFailed: true, order: {} };
    }
    default: {
      return state;
    }
  }
};
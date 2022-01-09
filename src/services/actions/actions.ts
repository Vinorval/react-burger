import { getItemsRequest, postOrderRequest } from '../api';
import { AppThunk, AppDispatch } from '../../utils/types';
import { TIngredient, TOrder, TIngredientConstructor, TIngredientMore } from '../../utils/types';

export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const CHANGE_BUN: 'CHANGE_BUN' = 'CHANGE_BUN';
export const CHANCE_ITEMS: 'CHANCE_ITEMS' = 'CHANCE_ITEMS';
export const INCREASE_ITEM_COUNT: 'INCREASE_ITEM_COUNT' = 'INCREASE_ITEM_COUNT'
export const DECREASE_ITEM_COUNT: 'DECREASE_ITEM_COUNT' = 'DECREASE_ITEM_COUNT'

export const OPEN_POPUP: 'OPEN_POPUP' = 'OPEN_POPUP';
export const CLOSE_POPUP: 'CLOSE_POPUP' = 'CLOSE_POPUP';

export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

type TGetIngredientsActionSuccess = { readonly type: typeof GET_ITEMS_SUCCESS; readonly items: readonly TIngredient[] };
type TGetIngredientsActionFailed = { readonly type: typeof GET_ITEMS_FAILED };
type TIncreaseItemAction = { readonly type: typeof INCREASE_ITEM_COUNT; payload: {item: TIngredient; qty: number}}
type TDecreaseItemAction = { readonly type: typeof DECREASE_ITEM_COUNT; payload: {item: TIngredient; qty: number}}

const getIngredientsSuccess = (items: readonly TIngredient[]): TGetIngredientsActionSuccess => {
  return {
    type: GET_ITEMS_SUCCESS,
    items: items
  };
};

const getIngredientsFailed = (): TGetIngredientsActionFailed => {
  return {
    type: GET_ITEMS_FAILED
  };
};

export const increaseItem = (item: TIngredient, qty: number): TIncreaseItemAction => {
  return {
    type: INCREASE_ITEM_COUNT,
    payload: {
    item,
    qty
  }
}}

export const decreaseItem = (item: TIngredient, qty: number): TDecreaseItemAction => {
  return {
    type: DECREASE_ITEM_COUNT,
    payload: {
    item,
    qty
  }
}}

export type TGetIngredientsActions = ReturnType<
  typeof getIngredientsSuccess | typeof getIngredientsFailed | typeof increaseItem | typeof decreaseItem
>;

export const getItems: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        getItemsRequest().then(res => {
            return dispatch(getIngredientsSuccess(res.data));
        })
        .catch(() => dispatch(getIngredientsFailed()) );
    };
}

export interface IOpenPopupAction {
  readonly type: typeof OPEN_POPUP;
  ingredient: TIngredientMore
}

export interface ICloseAction {
  readonly type: typeof CLOSE_POPUP;
  ingredient: {};
  order: {}
}

export type TPopupActions = IOpenPopupAction | ICloseAction;

type TPostOrgerActionSuccess = { readonly type: typeof GET_ORDER_SUCCESS; readonly order: TOrder };
type TPostOrderActionFailed = { readonly type: typeof GET_ORDER_FAILED };

const postOrderSuccess = (order: TOrder): TPostOrgerActionSuccess => {
  return {
    type: GET_ORDER_SUCCESS,
    order: order
  };
};

const postOrderFailed = (): TPostOrderActionFailed => {
  return {
    type: GET_ORDER_FAILED
  };
};

export type TPostOrderActions = ReturnType<
  typeof postOrderSuccess | typeof postOrderFailed
>;

export const postOrder: AppThunk = (idsData: string[]) => {
    return function(dispatch: AppDispatch) {
        postOrderRequest(idsData)
        .then(res => {
          if (res.success) {
            dispatch(postOrderSuccess(res.order));
          } else {
            dispatch({
              type: GET_ORDER_FAILED
            });
          }
        })
        .catch(() => dispatch(postOrderFailed()) );;
    };
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_ITEM;
  item: TIngredientConstructor;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_ITEM;
  id: string;
  _id: string;
}

export interface IChangeItemAction {
  readonly type: typeof CHANCE_ITEMS;
  items: TIngredientConstructor[]; 
}

export interface IChangeBunAction {
  readonly type: typeof CHANGE_BUN;
  bun: TIngredientConstructor;
}

export type TBurgerActions = IAddIngredientAction | IDeleteIngredientAction | IChangeItemAction | IChangeBunAction;
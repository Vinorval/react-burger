import { getItemsRequest, postOrderRequest } from '../api';
import { TIngredient, TOrder, TIngredientConstructor, TIngredientMore } from '../../utils/types';

export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const CHANGE_BUN: 'CHANGE_BUN' = 'CHANGE_BUN';
export const CHANCE_ITEMS: 'CHANCE_ITEMS' = 'CHANCE_ITEMS';

export const OPEN_POPUP: 'OPEN_POPUP' = 'OPEN_POPUP';
export const CLOSE_POPUP: 'CLOSE_POPUP' = 'CLOSE_POPUP';

export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

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


type TGetIngredientsActionSuccess = { readonly type: typeof GET_ITEMS_SUCCESS; readonly items: readonly TIngredient[] };
type TGetIngredientsActionFailed = { readonly type: typeof GET_ITEMS_FAILED };

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

export type TGetIngredientsActions = ReturnType<
  typeof getIngredientsSuccess | typeof getIngredientsFailed
>;

export const getItems: any = () => {
    return (dispatch: any) => {
        getItemsRequest().then(res => {
            return dispatch(getIngredientsSuccess(res.data));
        })
        .catch(() => dispatch(getIngredientsFailed()) );
    };
}



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

export const postOrder: any = (idsData: string[]) => {
    return function(dispatch: any) {
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
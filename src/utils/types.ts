import { store } from '../services/store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { rootReducer } from '../services/reducers/rootReducer';

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    qty?: number
}

export type TIngr = {
    _id: string
}

export type TIngredientConstructor = TIngredient & { id: string; }
export type TIngredientMore = TIngredient & { _ID: string; qt: number; }

export type TProfile = {
    name: string;
    email: string;
    password: string;
}

export type TResetPassword = {
    password: string;
    value: string;
}

export type TOrder = { number: number | string }

export type TOrders = {
    ingredients: string[];
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export type TError = { 
    success?: boolean;
    message?: string;
    headers?: Headers;
}

export type wsActions = {
    wsInit: string,
    wsSendMessage: string,
    onOpen: string,
    onClose:string,
    onError: string,
    onMessage: string
  }

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, Action>
>; 
export type AppDispatch = typeof store.dispatch; 
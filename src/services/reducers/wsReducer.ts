import { TOrders } from '../../utils/types';
import {
    TActions,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
} from '../actions/wsActionTypes';

type TWSState = {
    wsConnected: boolean;
    orders: Array<TOrders>;
    total: string;
    totalToday: string;
    error?: Event;
  }
  
  const initialState: TWSState = {
      wsConnected: false,
      orders: [],
      total: '',
      totalToday: ''
  }; 

  export const wsReducer = (state = initialState, action: TActions): TWSState => {
    switch (action.type) {
          // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
          // Установим флаг wsConnected в состояние true
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true
        };
  
          // Опишем обработку экшена с типом WS_CONNECTION_ERROR
          // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false
        };
  
          // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
          // Установим флаг wsConnected в состояние false
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
  
          // Опишем обработку экшена с типом WS_GET_MESSAGE
          // Обработка происходит, когда с сервера возвращаются данные
          // В messages передадим данные, которые пришли с сервера
      case WS_GET_ORDERS:
        return {
          ...state,
          error: undefined,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          orders: action.payload.orders
        };
      default:
        return state;
    }
  }; 
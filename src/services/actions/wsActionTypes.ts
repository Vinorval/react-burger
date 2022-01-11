import { TOrders } from "../../utils/types";
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_SEND_ORDER: 'WS_SEND_ORDER' = 'WS_SEND_ORDER';

type TConnectionStart = { readonly type: typeof WS_CONNECTION_START, readonly payload: string }
type TConnectionSuccess = { readonly type: typeof WS_CONNECTION_SUCCESS, readonly payload?: any }
type TConnectionError = { readonly type: typeof WS_CONNECTION_ERROR, readonly payload?: any }
type TConnectionCloser = { readonly type: typeof WS_CONNECTION_CLOSED, readonly payload?: any }
type TGetOrders = { readonly type: typeof WS_GET_ORDERS, readonly payload: { orders: Array<TOrders>, total: string, totalToday: string } }
type TSendrOder = { readonly type: typeof WS_SEND_ORDER, readonly payload: any }

export type TActions = TConnectionStart
    | TConnectionSuccess
    | TConnectionError
    | TConnectionCloser
    | TGetOrders
    | TSendrOder
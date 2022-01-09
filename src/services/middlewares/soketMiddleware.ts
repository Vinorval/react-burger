import type { Middleware, MiddlewareAPI } from 'redux';
import {
    TActions,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_SEND_ORDER
} from '../actions/wsActionTypes';
import type { AppDispatch, RootState } from '../../utils/types';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
 
      if (type === WS_CONNECTION_START) {
            // объект класса WebSocket
        socket = new WebSocket(payload);
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: WS_GET_ORDERS, payload: JSON.parse(data) });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_ORDER) {
          const order = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(order));
        }
      }

      next(action);
    };
    }) as Middleware;
}; 
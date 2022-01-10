import type { Middleware, MiddlewareAPI } from 'redux';
import { TActions } from '../actions/wsActionTypes';
import type { AppDispatch, RootState } from '../../utils/types';

export const socketMiddleware = (wsActions: any): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
 
      if (type === wsInit) {
            // объект класса WebSocket
        socket = new WebSocket(payload);
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          console.log(event)
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        //if (type === wsSendMessage) {
        //  const order = payload;
        //            // функция для отправки сообщения на сервер
        //  socket.send(JSON.stringify(order));
        //}
      }

      next(action);
    };
    }) as Middleware;
}; 
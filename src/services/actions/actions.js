import { URL } from '../../utils/utils'

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CHANGE_BUN = 'CHANGE_BUN';
export const CHANCE_ITEMS = 'CHANCE_ITEMS';

export const OPEN_POPUP = 'OPEN_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getItems() {
    return function(dispatch) {
        fetch(`${URL}/ingredients`).then(res => res.json()).then(res => {
        if (res) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      });
    };
  }

  export function postOrder(idsData) {
    return function(dispatch) {
        fetch(`${URL}/orders`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({"ingredients": idsData}),
        })
        .then(res => res.json())
        .then(res => {
          if (res) {
            dispatch({
              type: GET_ORDER_SUCCESS,
              order: res.order,
            });
          } else {
            dispatch({
              type: GET_ORDER_FAILED
            });
          }
        });
    };
  }
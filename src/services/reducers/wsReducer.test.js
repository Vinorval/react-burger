import { wsReducer } from './wsReducer';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
} from '../actions/wsActionTypes';

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(
      {
        wsConnected: false,
        orders: [],
        total: '',
        totalToday: ''
      }
    )
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
        wsReducer(undefined, {
        type: WS_CONNECTION_SUCCESS,
        error: undefined,
        wsConnected: true
      })
    ).toEqual(
      {
        error: undefined,
        wsConnected: true,
        orders: [],
        total: '',
        totalToday: ''
      }
    )
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
        wsReducer(undefined, {
            type: WS_CONNECTION_ERROR,
            error: {},
            wsConnected: false
      })
    ).toEqual(
      {
        error: undefined,
        wsConnected: false,
        orders: [],
        total: '',
        totalToday: ''
      }
    )
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
        wsReducer(undefined, {
        type: WS_CONNECTION_CLOSED,
        error: undefined,
        wsConnected: false
      })
    ).toEqual(
      {
        error: undefined,
        wsConnected: false,
        orders: [],
        total: '',
        totalToday: ''
      }
    )
  })

  it('should handle WS_GET_ORDERS', () => {
    expect(
        wsReducer(undefined, {
        type: WS_GET_ORDERS,
        error: undefined,
        payload: {
            total: '123',
            totalToday: '45',
            orders: [{id: 1}, {id: 2}]
        },
      })
    ).toEqual(
      {
        error: undefined,
        wsConnected: false,
        orders: [{id: 1}, {id: 2}],
        total: '123',
        totalToday: '45'
      }
    )
  })
})
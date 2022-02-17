import { orderReducer } from './reducers';
import {
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../actions/actions';

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
      expect(orderReducer(undefined, {})).toEqual(
        {
          items: [],
          itemsFailed: false,
      
          burgerItems: [],
          burgerItemsFailed: false,
          bun: null,
          quantity: [],
          quantityBun: {},
    
          ingredient: {},
          ingridientPopup: false,
    
          order: { number: 'немного подождите' },
          orderFailed: false
        }
      )
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            orderReducer(undefined, {
            type: GET_ORDER_SUCCESS,
            orderFailed: false ,
            order: { number: 234 }
          })
        ).toEqual(
          {
            items: [],
            itemsFailed: false,
        
            burgerItems: [],
            burgerItemsFailed: false,
            bun: null,
            quantity: [],
            quantityBun: {},
      
            ingredient: {},
            ingridientPopup: false,
      
            order: { number: 234 },
            orderFailed: false
          }
        )
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(
            orderReducer(undefined, {
            type: GET_ORDER_FAILED,
            orderFailed: true, order: { number: 'немного подождите' }
          })
        ).toEqual(
          {
            items: [],
            itemsFailed: false,
        
            burgerItems: [],
            burgerItemsFailed: false,
            bun: null,
            quantity: [],
            quantityBun: {},
      
            ingredient: {}, ingridientPopup: false,
      
            order: { number: 'немного подождите' },
            orderFailed: true
          }
        )
    })
})
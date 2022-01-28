import { ingredientsReducer, burgerReducer, detailsReducer, orderReducer } from './reducers';
import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
  
    ADD_ITEM,
    DELETE_ITEM,
    CHANGE_BUN,
    CHANCE_ITEMS,
  
    OPEN_POPUP,
    CLOSE_POPUP,
  
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    increaseItem,
    decreaseItem
  } from '../actions/actions';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(
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

  it('should handle GET_ITEMS_SUCCESS', () => {
    expect(
        ingredientsReducer(undefined, {
        type: GET_ITEMS_SUCCESS,
        items: [{id: 'ggg'}, {id: 'hghg'}], 
        itemsFailed: false
      })
    ).toEqual(
      {
        items: [{id: 'ggg'}, {id: 'hghg'}],
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

  it('should handle GET_ITEMS_FAILED', () => {
    expect(
        ingredientsReducer(undefined, {
        type: GET_ITEMS_FAILED,
        itemsFailed: true
      })
    ).toEqual(
      {
        items: [],
        itemsFailed: true,
    
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

  it('should handle INCREASE_ITEM_COUNT', () => {
    expect(
        ingredientsReducer(undefined, increaseItem(
            {
                _id: 'pppp',
                name: 'oooo',
                type: 'kkk',
                proteins: 90,
                fat: 90,
                carbohydrates: 90,
                calories: 90,
                price: 90,
                image: 'kjhgfdsa',
                image_mobile: 'hfd',
                image_large: 'jggd',
                qty: 0
            }, 9
        )
      )
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
  
        order: { number: 'немного подождите' },
        orderFailed: false
      }
    )
  })

  it('should handle DECREASE_ITEM_COUNT', () => {
    expect(
        ingredientsReducer(undefined, decreaseItem(
            {
                _id: 'pppp',
                name: 'oooo',
                type: 'kkk',
                proteins: 90,
                fat: 90,
                carbohydrates: 90,
                calories: 90,
                price: 90,
                image: 'kjhgfdsa',
                image_mobile: 'hfd',
                image_large: 'jggd',
                qty: 8
            }, 1
        )
      )
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
  
        order: { number: 'немного подождите' },
        orderFailed: false
      }
    )
  })
})



describe('burger reducer', () => {
    it('should return the initial state', () => {
      expect(burgerReducer(undefined, {})).toEqual(
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
  
    it('should handle ADD_ITEM', () => {
      expect(
        burgerReducer(undefined, {
          type: ADD_ITEM,
          burgerItems: [{id: 'hghg'}, undefined]
        })
      ).toEqual(
        {
          items: [],
          itemsFailed: false,
      
          burgerItems: [undefined],
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
  
    it('should handle DELETE_ITEM', () => {
      expect(
        burgerReducer(undefined, {
          type: DELETE_ITEM,
          id: 'kkk',
          _id: 'kjh'
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
    
          order: { number: 'немного подождите' },
          orderFailed: false
        }
      )
    })
    
    it('should handle CHANCE_ITEMS', () => {
        expect(
          burgerReducer(undefined, {
            type: CHANCE_ITEMS,
            burgerItems: [{id: 'hghg'}, {id: 'hghg'}]
          })
        ).toEqual(
          {
            items: [],
            itemsFailed: false,
        
            burgerItems: undefined,
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

      it('should handle CHANGE_BUN', () => {
        expect(
          burgerReducer(undefined, {
            type: CHANGE_BUN,
            bun: {id: 'hghg'}
          })
        ).toEqual(
          {
            items: [],
            itemsFailed: false,
        
            burgerItems: [],
            burgerItemsFailed: false,
            bun: {id: 'hghg'},
            quantity: [],
            quantityBun: {},
      
            ingredient: {},
            ingridientPopup: false,
      
            order: { number: 'немного подождите' },
            orderFailed: false
          }
        )
      })
  })

  describe('details reducer', () => {
    it('should return the initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual(
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

    it('should handle OPEN_POPUP', () => {
        expect(
            detailsReducer(undefined, {
            type: OPEN_POPUP,
            ingredient: {id: 'hghg'},
            ingridientPopup: true,
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
      
            ingredient: {id: 'hghg'},
            ingridientPopup: true,
      
            order: { number: 'немного подождите' },
            orderFailed: false
          }
        )
      })

      it('should handle CLOSE_POPUP', () => {
        expect(
            detailsReducer(undefined, {
            type: CLOSE_POPUP,
            ingredient: {}, order: null, ingridientPopup: false
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
      
            order: null,
            orderFailed: false
          }
        )
      })
  })

  describe('order reducer', () => {
    it('should return the initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual(
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

      it('should handle CLOSE_POPUP', () => {
        expect(
            detailsReducer(undefined, {
            type: CLOSE_POPUP,
            ingredient: {}, order: { number: 'немного подождите' }, ingridientPopup: false
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
      
            order: null,
            orderFailed: false
          }
        )
      })
  })
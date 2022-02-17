import { ingredientsReducer, burgerReducer, detailsReducer } from './reducers';
import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
  
    ADD_ITEM,
    DELETE_ITEM,
    CHANGE_BUN,
    CHANCE_ITEMS,
  
    OPEN_POPUP,
    CLOSE_POPUP,
    increaseItem,
    decreaseItem
  } from '../actions/actions';

const initialState = {
    
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
};

const newState = { ...initialState, items: [
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
    qty: 1
  }
],
burgerItems: [
  {
    _id: 'pppp',
    id: 'k',
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
    qty: 1
  }
]
}

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
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
        ...initialState,
        items: [{id: 'ggg'}, {id: 'hghg'}],
        itemsFailed: false,
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
        ...initialState,
        itemsFailed: true,
      }
    )
  })

  it('should handle INCREASE_ITEM_COUNT', () => {
    expect(
        ingredientsReducer(newState, increaseItem(
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
                qty: 1
            }, 9
        )
      )
    ).toEqual(
      {
        ...newState,
        items: [
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
            qty: 10
        }
        ],
      }
    )
  })

  it('should handle DECREASE_ITEM_COUNT', () => {
    expect(
        ingredientsReducer(newState, decreaseItem(
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
                qty: 1
            }, 1
        )
      )
    ).toEqual(
      {
        ...newState,
        items: [
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
        }
        ],
      }
    )
  })
})



describe('burger reducer', () => {
    it('should return the initial state', () => {
      expect(burgerReducer(undefined, {})).toEqual(initialState)
    })
  
    it('should handle ADD_ITEM', () => {
      expect(
        burgerReducer(undefined, {
          type: ADD_ITEM,
          item: {id: 'hghg'}
        })
      ).toEqual(
        {
          ...initialState,
          burgerItems: [{id: 'hghg'}],
        }
      )
    })
  
    it('should handle DELETE_ITEM', () => {
      expect(
        burgerReducer(newState, {
          type: DELETE_ITEM,
          id: 'k',
          _id: 'pppp'
        })
      ).toEqual(
        {
          ...newState,
          burgerItems: [],
        }
      )
    })
    
    it('should handle CHANCE_ITEMS', () => {
        expect(
          burgerReducer(undefined, {
            type: CHANCE_ITEMS,
            items: [{id: 'hghg'}, {id: 'hghg'}]
          })
        ).toEqual(
          {
            ...initialState,
            burgerItems: [{id: 'hghg'}, {id: 'hghg'}],
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
            ...initialState,
            bun: {id: 'hghg'},
          }
        )
      })
})

describe('details reducer', () => {
    it('should return the initial state', () => {
      expect(ingredientsReducer(undefined, {})).toEqual(initialState)
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
            ...initialState,
            ingredient: {id: 'hghg'},
            ingridientPopup: true,
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
            ...initialState,
            ingredient: {}, ingridientPopup: false,
            order: null,
          }
        )
      })
})
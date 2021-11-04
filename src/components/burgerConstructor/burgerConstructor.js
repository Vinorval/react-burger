import React, { useEffect } from "react";
import burgerConstructorStyles from './burgerConstructor.module.css'
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerItems, postOrder } from '../../services/actions/actions';
import { useDrop } from 'react-dnd';
import { ADD_ITEM, CHANGE_BUN, DELETE_ITEM } from '../../services/actions/actions';
import IngredientBurger from "../ingredientBurger/ingredientBurger";

function BurgerConstructor({ openPopup }) {
    const { burgerItems, bun, quantity } = useSelector( store => ({ burgerItems: store.burgerItems.burgerItems, bun: store.burgerItems.bun, quantity: store.burgerItems.quantity }) )
    const dispatch = useDispatch();

    //useEffect(() => {
    //    dispatch(getBurgerItems());
    //  },
    //  [dispatch]
    //);

    const [, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop(item) {
            if(item.type !== "bun") {
              dispatch({
                type: ADD_ITEM,
                item: { image: item.image, name: item.name, price: item.price, _id: item._id, id: Math.floor(Math.random() * 10000) }
              });
            } else {
                dispatch({
                    type: CHANGE_BUN,
                    bun: { image: item.image, name: item.name, price: item.price, _id: item._id, id: Math.floor(Math.random() * 10000) }
                  });
            }
          },
    }));
    const [, dropIngr] = useDrop(() => ({ accept: 'main' }));

    const returnIngredient = () => {
        return (
            burgerItems.map((item) => {
                if (item.type !== "bun") {
                    return (
                        <IngredientBurger item={item} handleDelete={handleDelete} key={item.id} />
                    )
                } else { return null }
            })
        )
    }

    const handleDelete = (id) => {
        dispatch({
            type: DELETE_ITEM,
            id
          });
    }

    const handleButton = () => {
        let idsData = [];
        idsData.push(bun._id);

        burgerItems.forEach((el) => {
          if (el.type !== "bun") return idsData.push(el._id);
        });

        dispatch(postOrder(idsData));
        openPopup();
    }

    const returnSum = () => {
        let sum = 0;
        let totalPrice = 0;
        let bunPrice = bun.price ? bun.price * 2 : 0
        burgerItems.forEach(el => {
            if (el.type !== "bun")
              { return sum = sum + el.price; }
        });
        totalPrice = sum + bunPrice
        return totalPrice
    }

    return (
        <section>
            <menu ref={drop} className={burgerConstructorStyles.burger__menu}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name ? `${bun.name} (верх)` : ''}
                    price={bun.price ? bun.price : ''}
                    thumbnail={bun.image}
                />
                <ul ref={dropIngr} className={burgerConstructorStyles.burger__list}>{returnIngredient()}</ul>  
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name ? `${bun.name} (низ)` : ''}
                    price={bun.price ? bun.price : ''}
                    thumbnail={bun.image}
                />
            </menu>
            <div className={burgerConstructorStyles.burger__price}>
                <p className={burgerConstructorStyles.sum}>{returnSum()}<CurrencyIcon type="primary" /></p>
                <Button onClick={handleButton} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    openPopup: PropTypes.func.isRequired
};

export default BurgerConstructor
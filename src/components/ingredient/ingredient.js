import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import ingredientStyle from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_POPUP } from '../../services/actions/actions';
import { useDrag } from 'react-dnd';

function Ingredient({data, onClick}) {
    const { quantity, quantityBun } = useSelector( store => ({ quantity: store.burgerItems.quantity, quantityBun: store.burgerItems.quantityBun }) );
    const dispatch = useDispatch();
    const { _id, name, image, price, type } = data;

    const returnQt = React.useMemo(() => {
        if ( type === 'bun') { return (quantityBun._ID === _id && quantityBun.qt > 0) && <p key={quantityBun.id} className={ingredientStyle.item__number}>{quantityBun.qt}</p>; }
        return quantity.map((item) => {
            return (item._ID === _id && item.qt > 0) && <p key={item.id} className={ingredientStyle.item__number}>{item.qt}</p>;
        })
    }, [quantity, _id, quantityBun, type])

    const [, drag] = useDrag({type: 'ingredient', item: { _id, name, image, price, type }});

    const clickCard = () => {
        onClick();
        dispatch({
            type: OPEN_POPUP,
            ingredient: data
          });
        };

    return (
        <li ref={drag} className={ingredientStyle.item} onClick={clickCard} >
                            {returnQt}
                            <img className={ingredientStyle.item__image} alt={data.name} src={data.image}  />
                            <p className={ingredientStyle.item__price}>{data.price} <CurrencyIcon type="primary" /></p>
                            <p className={ingredientStyle.item__text}>{data.name}</p>
                        </li>
    )
}

Ingredient.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Ingredient
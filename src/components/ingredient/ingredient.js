import React from "react";
import PropTypes from 'prop-types';
import ingredientStyle from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { OPEN_POPUP } from '../../services/actions/actions';

function Ingredient({data, onClick}) {
    const dispatch = useDispatch();

    const clickCard = () => {
        onClick();
        dispatch({
            type: OPEN_POPUP,
            ingredient: data
          });
        };

    return (
        <li className={ingredientStyle.item} onClick={clickCard} >
                            {data.__v > 0 && <p className={ingredientStyle.item__number}>{data.__v}</p>}
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
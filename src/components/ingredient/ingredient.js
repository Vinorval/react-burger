import React from "react";
import PropTypes from 'prop-types';
import ingredientStyle from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient({data, onClick}) {

    const cardClick = () => onClick(data.image, data.name, { fat: data.fat, calories: data.calories, carbohydrates: data.carbohydrates, proteins: data.proteins });

    return (
        <li className={ingredientStyle.item} onClick={cardClick} >
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
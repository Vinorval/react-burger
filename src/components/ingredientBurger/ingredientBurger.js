import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientBurger from './ingredientBurger.module.css';
import { DELETE_ITEM } from '../../services/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

function IngredientBurger ({ item }) {
    const dispatch = useDispatch();

    const handleDelete = (id, _id) => {
        dispatch({
            type: DELETE_ITEM,
            id,
            _id
          });
    }

    return (
        <li className={ingredientBurger.burger__item}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => {handleDelete(item.id, item._id)}}
            />
        </li>
    )
}

export default IngredientBurger;
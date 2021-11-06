import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientBurger from './ingredientBurger.module.css';
import { DELETE_ITEM } from '../../services/actions/actions';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd'

export default function IngredientBurger ({ item, index }) {
    const dispatch = useDispatch();

    //слушатель кнопки удалить
    const handleDelete = (id, _id) => {
        dispatch({
            type: DELETE_ITEM,
            id,
            _id
          });
    }
 
    //возращаем верстку ингредиента конструктора
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
              <li className={ingredientBurger.burger__item} ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() => {handleDelete(item.id, item._id)}}
                />
              </li>
            )}
        </Draggable>
    )
}

IngredientBurger.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number
};

import React, { FC } from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientBurger from './ingredientBurger.module.css';
import { DELETE_ITEM } from '../../services/actions/actions';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    id: string;
}

interface IIngredientProps {
    item: IIngredient;
    index: number;
}

const IngredientBurger: FC<IIngredientProps> = ({ item, index }) => {
    const dispatch = useDispatch();

    //слушатель кнопки удалить
    const handleDelete = (id: string, _id: string) => {
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

export default IngredientBurger
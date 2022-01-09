import React, { FC } from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientBurger from './ingredientBurger.module.css';
import { DELETE_ITEM, decreaseItem } from '../../services/actions/actions';
import { useDispatch } from "../../services/hooks";
import { Draggable } from 'react-beautiful-dnd';
import { TIngredientConstructor } from '../../utils/types'

interface IIngredientProps {
  item: TIngredientConstructor;
  index: number;
}

const IngredientBurger: FC<IIngredientProps> = ({ item, index }) => {
    const dispatch = useDispatch();

    //слушатель кнопки удалить
    const handleDelete = (id: string, _id: string) => {
      const qty: number = 1
        dispatch({
            type: DELETE_ITEM,
            id,
            _id
        });
        dispatch(decreaseItem(item, qty))
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
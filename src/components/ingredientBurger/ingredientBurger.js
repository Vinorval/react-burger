import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientBurger from './ingredientBurger.module.css';
import { DELETE_ITEM } from '../../services/actions/actions';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';

export default function IngredientBurger ({ item, index, moveListItem }) {
    const dispatch = useDispatch();

    //создание возможности перетаскивать ингредиента коструктора
    const [, dragRef] = useDrag({
        type: 'main',
        item: { index },
    })

    //создание возможности перенести в этот же контейнер
    const [, dropRef] = useDrop({
        accept: 'main',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
 
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
 
            moveListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const ref = React.useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

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
        <li ref={dragDropRef} className={ingredientBurger.burger__item}>
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

IngredientBurger.propTypes = {
    item: PropTypes.object.isRequired,
    moveListItem: PropTypes.func.isRequired,
    index: PropTypes.number
};

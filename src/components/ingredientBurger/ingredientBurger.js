import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientBurger from './ingredientBurger.module.css';
import { DELETE_ITEM } from '../../services/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';

function IngredientBurger ({ item, index, moveListItem }) {
    const dispatch = useDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: 'main',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [spec, dropRef] = useDrop({
        accept: 'main',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
 
            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
 
            moveListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const ref = React.useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    const handleDelete = (id, _id) => {
        dispatch({
            type: DELETE_ITEM,
            id,
            _id
          });
    }

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

export default IngredientBurger;
import React, { FC } from "react";
import ingredientStyle from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { OPEN_POPUP } from '../../services/actions/actions';
import { useDrag } from 'react-dnd';
import { TIngredientMore } from "../../utils/types";

interface IData {
    data: TIngredientMore
}

const Ingredient: FC<IData> = ({ data }) => {
    //забираем из редукса счётчики количества ингредиентов в бургере
    const { quantity, quantityBun } = useSelector( ( store: RootStateOrAny ) => ({ quantity: store.burgerItems.quantity, quantityBun: store.burgerItems.quantityBun }) );
    const dispatch = useDispatch();
    //разбиваем data на важные компоненты
    const { _id, name, image, price, type } = data;

    //реализация изменение счётчика при изменении количества ингредиента в бургере
    const returnQt = React.useMemo(() => {
        //если это булка менять её счётчик
        if ( type === 'bun') return (quantityBun._ID === _id && quantityBun.qt > 0) && <p key={quantityBun.id} className={ingredientStyle.item__number}>{quantityBun.qt}</p>;
        //если это любой другой ингредиент менять ему счётчик с помощью сравнения id
        return quantity.map((item: TIngredientMore) => {
            return (item._ID === _id && (item.qt === undefined? 0 : item.qt) > 0) && <p key={_id} className={ingredientStyle.item__number}>{item.qt}</p>;
        })
    }, [quantity, _id, quantityBun, type])

    //добавить возможность перетаскивать элемент с помощью dnd
    const [, drag] = useDrag({type: 'ingredient', item: { _id, name, image, price, type }});

    //открытие попапа с деталями ингредиента
    const clickCard = () => {
        dispatch({
            type: OPEN_POPUP,
            ingredient: data
          });
        localStorage.setItem('popup', 'true')
    };

    //возвращать верстку ингредиента
    return (
        <li ref={drag} className={ingredientStyle.item} onClick={clickCard} >
                            {returnQt}
                            <img className={ingredientStyle.item__image} alt={data.name} src={data.image}  />
                            <p className={ingredientStyle.item__price}>{data.price} <CurrencyIcon type="primary" /></p>
                            <p className={ingredientStyle.item__text}>{data.name}</p>
                        </li>
    )
}

export default Ingredient
import React, { FC } from "react";
import burgerConstructorStyles from './burgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "../../services/hooks";
import { postOrder } from '../../services/actions/actions';
import { useDrop } from 'react-dnd';
import { ADD_ITEM, CHANGE_BUN, CHANCE_ITEMS } from '../../services/actions/actions';
import IngredientBurger from "../ingredientBurger/ingredientBurger";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { TIngredientConstructor } from "../../utils/types";
import { increaseItem } from '../../services/actions/actions';

interface IConstructorProps {
    openPopup: Function;
}

const BurgerConstructor: FC<IConstructorProps> = ({ openPopup }) => {
    //из редуса забираем ингредиенты конструктора и булку
    const { burgerItems, bun} = useSelector( ( store ) => ({ burgerItems: store.burgerItems.burgerItems, bun: store.burgerItems.bun }) )
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //узнаем: был ли пользователь авторизован
    const auth = localStorage.getItem('authorization');

    //контейнер куда перетаскивают инредиенты с поиощью библиотеки dnd
    const onDragEnd = (result: any) => {
        if (!result.destination) {
          return;
        }
    
        const returnItems = reorder(burgerItems, result.source.index, result.destination.index)
        dispatch({
            type: CHANCE_ITEMS,
            items: returnItems
        })
    }

    const reorder = (items: object[], startIndex: number, endIndex: number) => {
        const newArr = Array.from(items)
        const [removed] = newArr.splice(startIndex, 1)
        newArr.splice(endIndex, 0, removed)
        return newArr
    }

    const [, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop(item: TIngredientConstructor) {
            if(item.type !== "bun") {
              const qty: number = 1;
              dispatch({
                type: ADD_ITEM,
                item: { image: item.image, name: item.name, price: item.price, _id: item._id, id: `${Math.floor(Math.random() * 10000)}` }
              });
              dispatch(increaseItem(item, qty))
            } else {
                const qty: number = 2
                dispatch({
                    type: CHANGE_BUN,
                    bun: { image: item.image, name: item.name, price: item.price, _id: item._id, id: `${Math.floor(Math.random() * 10000)}` }
                });
                dispatch(increaseItem(item, qty))
            }
          },
    }));

    //создание ингредиентов коструктора из списка
    const returnIngredient = () => {
        return (
            burgerItems.map((item: TIngredientConstructor, index: number) => {
                if (item.type !== "bun") {
                    return (
                        <IngredientBurger item={item} key={index} index={index} />
                    )
                } else { return null }
            })
        )
    }

    //создание заказа, где на сервер отправляется массив с _id всех ингредиентов
    const handleButton = () => {
        //создаем массив для отправки
        let idsData: string[] = [];
        //записываем id булки
        bun !== null && idsData.push(bun._id);
        //записываем id всех остальных инредиентов
        burgerItems.forEach((el: TIngredientConstructor) => {
          if (el.type !== "bun") return idsData.push(el._id);
        });

        //если пользователь не авторизован, то отправлять на страницу входа
        if(!auth) { return navigate('/login') }

        //отправляем запрос через редакс
        if( !bun?._id ) {
            idsData = [];
            dispatch(postOrder(idsData));
            //dispatch({ type: WS_SEND_ORDER, payload: idsData })
        } else {
            dispatch(postOrder(idsData))
            //dispatch({ type: WS_SEND_ORDER, payload: idsData })
        };
        openPopup();
    }

    //подсчёт итоговой стоимости
    const returnSum = () => {
        //сумма нигредиентов
        let sum = 0;
        //полная стоимость
        let totalPrice = 0;

        //записываем стоимость булки
        const bunPrice = bun !== null && bun.price ? bun.price * 2 : 0
        //записываем стоимость всех ингредиентов
        burgerItems.forEach((el: TIngredientConstructor) => {
            if (el.type !== "bun")
              { return sum = sum + el.price; }
        });
        //записываем итоговую стоимость
        totalPrice = sum + bunPrice
        return totalPrice
    }

    //возвращаем верстку всего конструктора
    return (
        <section>
            <DragDropContext onDragEnd={onDragEnd}>
            <menu ref={drop} className={burgerConstructorStyles.burger__menu}>
                { bun !== null && <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name ? `${bun.name} (верх)` : ''}
                    price={bun.price ? bun.price : 0}
                    thumbnail={bun.image}
                />}
                <Droppable droppableId='droppable'>
                {(provided, snapshot) => (
                <ul id='burger' className={burgerConstructorStyles.burger__list} {...provided.droppableProps} ref={provided.innerRef} >{returnIngredient()} {provided.placeholder}</ul>  
                )}
                </Droppable>
                { bun !== null && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name ? `${bun.name} (низ)` : ''}
                    price={bun.price ? bun.price : 0}
                    thumbnail={bun.image}
                />}
            </menu>
            <div className={burgerConstructorStyles.burger__price}>
                <p className={burgerConstructorStyles.sum}>{returnSum()}<CurrencyIcon type="primary" /></p>
                <Button onClick={handleButton} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            </DragDropContext>
        </section>
    )
}

export default BurgerConstructor
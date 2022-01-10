import React from "react";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "../services/hooks";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../services/actions/wsActionTypes";
import { useLocation } from "react-router-dom";
import { TIngredient } from "../utils/types";
import Style from './order.module.css';
import { getDate } from "../utils/utils";

export default function OrderPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    let { id } = useParams();
    const { items, orders } = useSelector((store ) => ({ items: store.items.items, orders: store.orders.orders }));

    const order = React.useMemo(() => {
        return orders.find(item => item._id === id);
      }, [id, orders]);

      React.useEffect(() => {
        if (!location.state) dispatch({ type: WS_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all' });
        return () => {
          if (!location.state) dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, []);

    const orderInfo = (items: readonly TIngredient[] | null) => {
        let result: Array<TIngredient> = [];
        order?.ingredients.map(item => {
          items!.forEach(element => {
            if (element._id === item) result.push(element);
          });
        });
        return result;
      };
    
    const orderIngredients = orderInfo(items);
    const orderPrice = React.useCallback(() => {
        let price: number = 0;
        orderIngredients.forEach(item => (price += item.price));
        return price;
      }, [orderIngredients]);

    return (
        <>
        {Boolean(order) && <div className={Style.page}>
          <p className={Style.order__number}>{order?.number}</p>
          <h2 className={Style.order__name}>{order?.name}</h2>
          <p className={Style.order__status}>{order?.status}</p>
          <div className={Style.info}>
              <p className={Style.info__title}>Состав:</p>
              {orderIngredients.map(item => (
            <div className={Style.item} key={item._id + Math.random()}>
              <div className={Style.item__info}>
                <img className={Style.item__img} src={item.image_mobile} alt='ingredientLogo' />
                <span className={Style.item__text}>{item.name}</span>
              </div>
              <div className={Style.item__sum}>
                <p className={Style.price}>{item.price}</p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          ))}
          </div>
          <div className={Style.total}>
              <p className={Style.date}>{getDate(order?.createdAt!)}</p>
              <p className={Style.sum}>{orderPrice()} <CurrencyIcon type='primary'/></p>
          </div>
        </div>}
        </>
    )
}
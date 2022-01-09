import React from "react";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "../../services/hooks";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions/wsActionTypes";
import { useLocation } from "react-router-dom";
import { TIngredient } from "../../utils/types";
import Style from './orderPopup.module.css';

export default function OrderPopup() {
    const location = useLocation();
    const dispatch = useDispatch();
    let { id } = useParams();
    const { items, orders } = useSelector((store ) => ({ items: store.items.items, orders: store.orders.orders }));

    const order = React.useMemo(() => {
        return orders.find(item => item._id === id);
      }, [id, orders]);

      React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all' });
        return () => {
          dispatch({ type: WS_CONNECTION_CLOSED });
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
    const orderPrice = React.useMemo(() => {
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
            <div className={Style.item} key={item._id}>
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
              <p className={Style.date}>Вчера, 13:50 i-GMT+3</p>
              <p className={Style.sum}>510 <CurrencyIcon type='primary'/></p>
          </div>
        </div>}
        </>
    )
}
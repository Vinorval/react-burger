import React from "react";
import orderDetailsStyles from './orderDetails.module.css';
//import { useSelector, RootStateOrAny } from 'react-redux';
import { useSelector } from '../../services/hooks';
import icon from '../../images/graphics.png'

export default function OrderDetails() {
    //const { order, orderFailed } = useSelector( ( store: RootStateOrAny) => ({ order: store.order.order, orderFailed: store.order.orderFailed }) )
    const { order, orderFailed } = useSelector( ( store ) => ({ order: store.order.order, orderFailed: store.order.orderFailed }) )

    return (
        (!orderFailed) ? 
            <div className={orderDetailsStyles.popup__conteiner}>
              <p className={orderDetailsStyles.number}>{order?.number}</p>
              <p className={orderDetailsStyles.order}>идентификатор заказа</p>
              <img alt='Icon' src={icon} className={orderDetailsStyles.image} />
              <div className={orderDetailsStyles.conteiner}>
                  <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
                  <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_type_last}`}>Дождитесь готовности на орбитальной станции</p>
              </div>
            </div> :
            <div className={orderDetailsStyles.popup__conteiner_err}>
              <p className={`${orderDetailsStyles.order} ${orderDetailsStyles.order_err}`}>Пожалуйста, добавьyте в конструктор булку и ингредиенты</p>
            </div>
    )
}
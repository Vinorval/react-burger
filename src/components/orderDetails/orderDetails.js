import React from "react";
import orderDetailsStyles from './orderDetails.module.css';
import icon from '../../images/graphics.png'
import { useSelector } from 'react-redux';

function OrderDetails() {
    const { order } = useSelector( store => ({ order: store.order.order }) )

    return (
        <div className={orderDetailsStyles.popup__conteiner}>
            <p className={orderDetailsStyles.number}>{order.number}</p>
            <p className={orderDetailsStyles.order}>идентификатор заказа</p>
            <img alt='Icon' src={icon} className={orderDetailsStyles.image} />
            <div className={orderDetailsStyles.conteiner}>
                <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
                <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_type_last}`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>
    )
}

export default OrderDetails
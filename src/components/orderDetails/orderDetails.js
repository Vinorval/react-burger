import React from "react";
//import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderDetailsStyles from './orderDetails.module.css';
import icon from '../../images/graphics.png'

function OrderDetails() {
    return (
        <div className={orderDetailsStyles.popup__conteiner}>
            <p className={orderDetailsStyles.number}>034536</p>
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
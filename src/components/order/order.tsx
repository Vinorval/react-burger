import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './order.module.css';
import ingredients from '../../images/ingredients.png';

export default function Order(props: any) {
    return (
        <li className={Styles.order}>
            <div className={Styles.order__info}>
                <p className={Styles.order__id}>{props.number}</p>
                <p className={Styles.order__data}>{props.createdAt}</p>
            </div>
            <h3 className={Styles.order__title}>{props.name}</h3>
            <div className={Styles.order__menu}>
                <img alt='ff' src={ingredients} className={Styles.images} />
                <p className={Styles.total} >480 <CurrencyIcon type="primary" /></p>
            </div>
        </li>
    )
}
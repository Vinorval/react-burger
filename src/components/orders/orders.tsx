import React from "react";
import { ordersArr } from "../../utils/utils";
import Order from "../order/order";
import Styles from './orders.module.css'
//import { useSelector, RootStateOrAny } from 'react-redux';

export default function Orders() {
    //const { items } = useSelector( ( store: RootStateOrAny) => ({ items: store.items.items }) );

    return (
        <ul className={Styles.orders}>
            {ordersArr.orders.map((item) => {
                return <Order id={item._id} createdAt={item.createdAt} ></Order>
            })}
        </ul>
    )
}
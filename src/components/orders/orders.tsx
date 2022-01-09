import React from "react";
import { ordersArr } from "../../utils/utils";
import Order from "../order/order";
import Styles from './orders.module.css'
//import { useSelector, RootStateOrAny } from 'react-redux';
import { useSelector } from "../../services/hooks";

export default function Orders() {
    //const { items } = useSelector( ( store: RootStateOrAny) => ({ items: store.items.items }) );
    const { orders } = useSelector( store => ({ orders: store.orders.orders }) )

    return (
        <ul className={Styles.orders}>
            {orders.map((item) => {
                return <Order key={item._id} number={item.number} createdAt={item.createdAt} name={item.name} ></Order>
            })}
        </ul>
    )
}
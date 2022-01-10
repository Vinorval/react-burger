import React from "react";
//import { ordersArr } from "../../utils/utils";
import Order from "../order/order";
import Styles from './orders.module.css'
//import { useSelector, RootStateOrAny } from 'react-redux';
import { useSelector } from "../../services/hooks";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
//import { TOrders } from "../../utils/types";

type TProps = { openPopup: Function }

export default function Orders(props: TProps) {
    const location = useLocation()
    //const { items } = useSelector( ( store: RootStateOrAny) => ({ items: store.items.items }) );
    const { orders } = useSelector( store => ({ orders: store.orders.orders }) )
    //const path = (item: TOrders) => location.pathname === '/profile/orders' ? `/profile/orders/${item._id}` : `/feed/${item._id}`
    const clickOrder = () => props.openPopup(true);
    const clickProfileOrder = () => localStorage.setItem('profilePopup', 'true')
    return (
        <ul className={Styles.orders}>
            {orders.map((item) => {
                return location.pathname === '/feed' ? 
                <Link className={Styles.link} key={item._id} to={`/feed/${item._id}`} state={{ backgroundForFeed: location }} onClick={clickOrder}>
                    <Order number={item.number} createdAt={item.createdAt} name={item.name} ></Order>
                </Link> :
                <Link className={Styles.link} key={item._id} to={`/profile/orders/${item._id}`} state={{ backgroundForProfile: location }} onClick={clickOrder}>
                    <Order number={item.number} createdAt={item.createdAt} name={item.name} ></Order>
                </Link>
            })}
        </ul>
    )
}
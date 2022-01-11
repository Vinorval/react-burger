import React from "react";
import Order from "../order/order";
import Styles from './orders.module.css'
import { useSelector } from "../../services/hooks";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type TProps = { openPopup: Function }

export default function Orders(props: TProps) {
    const location = useLocation()
    const { orders } = useSelector( store => ({ orders: store.orders.orders }) )
    const clickOrder = () => props.openPopup(true);
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
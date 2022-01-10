import React from "react";
import Styles from './feed.module.css';
import Orders from "../components/orders/orders";
import { useDispatch } from "../services/hooks";
//import { useSelector, RootStateOrAny } from 'react-redux';
import { useSelector } from "../services/hooks";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../services/actions/wsActionTypes";

export default function FeedPage (props: any) {
    const dispatch = useDispatch();
    const { total, totalToday, orders } = useSelector((state ) => state.orders);

    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all' });
        return () => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        };
      }, []);
    //React.useEffect(() => console.log(orders), [orders])

    const doneOrders = React.useCallback(() => {
        return orders.filter(item => item.status === 'done').slice(0, 5);
    }, [orders])

    const pendingOrders = React.useCallback(() => {
        return orders.filter(item => item.status === 'pending').slice(0, 5);
    }, [orders])

    return (
        <section className={Styles.page} >
          <h2 className={Styles.title} >Лента заказов</h2>
          <div className={Styles.context} >
              <Orders openPopup={props.openPopup} />
              <div className={Styles.statistics}>
                  <div className={Styles.statistics__now}>
                      <div className={Styles.inWork}>
                          <h3 className={Styles.inWork__title}>Готовы:</h3>
                          <div className={Styles.inWork__numbers}>
                              {doneOrders().map((order, index) => <p className={Styles.inWork__number} key={index} >{order.number}</p>)}
                          </div>
                      </div>
                      <div className={Styles.inWork}>
                          <h3 className={Styles.inWork__title}>В работе:</h3>
                          <div className={Styles.inWork__numbers}>
                              {pendingOrders().map((order, index) => <p className={Styles.inWork__number} key={index} >{order.number}</p>)}
                          </div>
                      </div>
                  </div>
                  <div className={Styles.statistics__orders}>
                      <p className={Styles.statistics__orders__title}>Выполнено за все время:</p>
                      <p className={Styles.statistics__orders__number}>{total}</p>
                  </div>
                  <div className={Styles.statistics__orders}>
                      <p className={Styles.statistics__orders__title}>Выполнено за сегодня:</p>
                      <p className={Styles.statistics__orders__number}>{totalToday}</p>
                  </div>
              </div>
          </div>
        </section>
    )
} 
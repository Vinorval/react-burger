import React, { useContext } from "react";
import burgerConstructorStyles from './burgerConstructor.module.css'
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataConstructor, NumberOrder } from '../../servieces/appContext';
import { URL } from '../../utils/utils';

function BurgerConstructor({ bun, openPopup }) {
    const { data } = useContext(DataConstructor);
    const {setNumberOrder} = useContext(NumberOrder);

    const returnIngredient = () => {
        return (
            data.map((item) => {
                if (item.type !== "bun") {
                    return (
                        <li className={burgerConstructorStyles.burger__item} key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    )
                } else { return null }
            })
        )
    }

    const handleButton = () => {
        let idsData = [];
        idsData.push(bun._id);

        data.forEach((el) => {
          if (el.type !== "bun") return idsData.push(el._id);
        });

        fetch(`${URL}/orders`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({"ingredients": idsData}),
        }).then(res => res.json())
          .then((res) => {
              setNumberOrder(res.order.number);
          })
          .catch(e => {
            console.log(e);
          })

          openPopup();
    }

    const returnSum = () => {
        let sum = 0;
        let totalPrice = 0;
        data.forEach(el => {
            if (el.type !== "bun")
              { return sum = sum + el.price; }
        });
        totalPrice = ( bun.price * 2) + sum;
        return totalPrice
    }

    return (
        <section>
            <menu className={burgerConstructorStyles.burger__menu}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                <ul className={burgerConstructorStyles.burger__list}>{returnIngredient()}</ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </menu>
            <div className={burgerConstructorStyles.burger__price}>
                <p className={burgerConstructorStyles.sum}>{returnSum()}<CurrencyIcon type="primary" /></p>
                <Button onClick={handleButton} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    bun:PropTypes.object.isRequired,
    openPopup: PropTypes.func.isRequired
};

export default BurgerConstructor
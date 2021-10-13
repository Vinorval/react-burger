import React from "react";
import burgerConstructorStyles from './burgerConstructor.module.css'
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {

    const returnBun = () => {
        const newBun = props.data.find((item) => item.type === "bun");
        return newBun

    }

    const returnIngredient = () => {
        return (
            props.data.map((item) => {
                if (item.type !== "bun")
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
                })
        )
    }

    return (
        <section>
            <menu className={burgerConstructorStyles.burger__menu}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${returnBun().name} (верх)`}
                    price={returnBun().price}
                    thumbnail={returnBun().image}
                />
                <ul className={burgerConstructorStyles.burger__list}>{returnIngredient()}</ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${returnBun().name} (низ)`}
                    price={returnBun().price}
                    thumbnail={returnBun().image}
                />
            </menu>
            <div className={burgerConstructorStyles.burger__price}>
                <p className={burgerConstructorStyles.sum}>610 <CurrencyIcon type="primary" /></p>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BurgerConstructor
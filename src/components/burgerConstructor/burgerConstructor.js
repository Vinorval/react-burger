import React from "react";
import burgerConstructorStyles from './burgerConstructor.module.css'
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor({ data, bun, openPopup }) {

    const returnIngredient = () => {
        return (
            data.map((item) => {
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
                <p className={burgerConstructorStyles.sum}>610 <CurrencyIcon type="primary" /></p>
                <Button onClick={openPopup} type="primary" size="large">
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
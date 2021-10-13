import React from "react";
import burgerIngredientsStyles from './burgerIngredients.module.css'
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('Булки');

    const clickOnBun = () => setCurrent('Булки' );

    const clickOnSauces = () => setCurrent('Соусы' );

    const clickOnMain = () => setCurrent('Начинки' );

    const returnIngredient = (name) => {
        return (
            props.data.map((item) => {
                if (item.type === name) {
                    return (
                        <li className={burgerIngredientsStyles.item} key={item._id}>
                            {item.__v > 0 && <p className={burgerIngredientsStyles.item__number}>{item.__v}</p>}
                            <img className={burgerIngredientsStyles.item__image} alt={item.name} src={item.image} />
                            <p className={burgerIngredientsStyles.item__price}>{item.price} <CurrencyIcon type="primary" /></p>
                            <p className={burgerIngredientsStyles.item__text}>{item.name}</p>
                        </li>
                    )
                }
            })
        )
    }

    return (
        <section>
            <div style={{ display: 'flex' }}>
                <Tab value="Булки" active={current === 'Булки'} onClick={clickOnBun}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={clickOnSauces}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={clickOnMain}>
                    Начинки
                </Tab>
            </div>
            <menu className={burgerIngredientsStyles.menu}>
                <div className={burgerIngredientsStyles.menu__item}>
                    <h3 className={burgerIngredientsStyles.menu__title}>Булки</h3>
                    <ul className={burgerIngredientsStyles.menu__list}>{returnIngredient("bun")}</ul>
                </div>
                <div className={burgerIngredientsStyles.menu__item}>
                    <h3 className={burgerIngredientsStyles.menu__title}>Соусы</h3>
                    <ul className={burgerIngredientsStyles.menu__list}>{returnIngredient("sauce")}</ul>
                </div>
                <div className={burgerIngredientsStyles.menu__item}>
                    <h3 className={burgerIngredientsStyles.menu__title}>Начинки</h3>
                    <ul className={burgerIngredientsStyles.menu__list}>{returnIngredient("main")}</ul>
                </div>
            </menu>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BurgerIngredients
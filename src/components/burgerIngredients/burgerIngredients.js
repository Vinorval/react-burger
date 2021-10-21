import React, { useContext } from "react";
import burgerIngredientsStyles from './burgerIngredients.module.css'
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/ingredient";
import { DataConstructor } from '../../servieces/appContext';

function BurgerIngredients({ onClick }) {
    const { data } = useContext(DataConstructor);
    const [current, setCurrent] = React.useState('Булки');

    const clickOnBun = () => setCurrent('Булки' );

    const clickOnSauces = () => setCurrent('Соусы' );

    const clickOnMain = () => setCurrent('Начинки' );

    const returnIngredient = (name) => {
        return (
            data.map((item) => {
                if (item.type === name) {
                    return (
                        <Ingredient data={item} onClick={onClick} key={item._id}/>
                    )
                } else { return null }
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
    onClick: PropTypes.func.isRequired
};

export default BurgerIngredients
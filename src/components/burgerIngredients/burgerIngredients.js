import React, { useEffect, useRef } from "react";
import burgerIngredientsStyles from './burgerIngredients.module.css'
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/ingredient";
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/actions'

function BurgerIngredients({ onClick }) {
    const { items } = useSelector( store => ({ items: store.items.items }) )
    const [current, setCurrent] = React.useState('Булки');
    const bunRef = useRef(null);
    const saucesRef = useRef(null);
    const mainRef = useRef(null);
    const blockRef = useRef(null);
    const dispatch = useDispatch();

    const clickOnBun = () => setCurrent('Булки');

    const clickOnSauces = () => setCurrent('Соусы');

    const clickOnMain = () => setCurrent('Начинки');

    React.useEffect(() => {
        const scrollBlock = () => {
            let coordsBun = bunRef.current.getBoundingClientRect().top;
            let coordsSauces = saucesRef.current.getBoundingClientRect().top;
            let coordsMain = mainRef.current.getBoundingClientRect().top;
            if ( 250 < coordsBun && coordsBun < 350 ) setCurrent('Булки');
            else if ( 250 < coordsSauces && coordsSauces < 350 ) setCurrent('Соусы');
            else if ( 250 < coordsMain && coordsMain < 350 ) setCurrent('Начинки');
        }
        const block = blockRef.current
        block.addEventListener('scroll', scrollBlock);

        return () => block.removeEventListener('scroll', scrollBlock);
    })

    useEffect(() => {
        dispatch(getItems());
      }, [dispatch]);

    const returnIngredient = (name) => {
        return (
            items.map((item) => {
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
            <menu className={burgerIngredientsStyles.menu} ref={blockRef}>
                <div className={burgerIngredientsStyles.menu__item} ref={bunRef}>
                    <h3 className={burgerIngredientsStyles.menu__title}>Булки</h3>
                    <ul className={burgerIngredientsStyles.menu__list}>{returnIngredient("bun")}</ul>
                </div>
                <div className={burgerIngredientsStyles.menu__item} ref={saucesRef}>
                    <h3 className={burgerIngredientsStyles.menu__title}>Соусы</h3>
                    <ul className={burgerIngredientsStyles.menu__list}>{returnIngredient("sauce")}</ul>
                </div>
                <div className={burgerIngredientsStyles.menu__item} ref={mainRef}>
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
import React, { useRef, FC, useEffect } from "react";
import burgerIngredientsStyles from './burgerIngredients.module.css'
import { useSelector, RootStateOrAny } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/ingredient";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TIngredientMore } from "../../utils/types";

const BurgerIngredients: FC = () => {
    const location = useLocation();
    //забираем из редакс ингредиенты
    const { items } = useSelector( ( store: RootStateOrAny) => ({ items: store.items.items }) );
    //создаём стейт для разделения ингредиентов
    const [current, setCurrent] = React.useState<string>('Булки');
    //создание рефов
    const bunRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const blockRef = useRef<HTMLMenuElement>(null);
    
    //активация кнопки в меню
    const clickOnBun = () => setCurrent('Булки');
    const clickOnSauces = () => setCurrent('Соусы');
    const clickOnMain = () => setCurrent('Начинки');

    //активация кнопки в меню при скролле контейнерa
    useEffect(() => {
        const menu = document.getElementById('menu');
        const scrollBlock = () => {
            //записываем координаты блоков в контейнере
            let coordsBun = ( null !== bunRef.current ) && bunRef.current.getBoundingClientRect().top;
            let coordsSauces = ( null !== saucesRef.current ) && saucesRef.current.getBoundingClientRect().top;
            let coordsMain = ( null !== mainRef.current ) && mainRef.current.getBoundingClientRect().top;
            //активация необходимой кнопки при скролле с помощью координат блоков
            if ( 250 < coordsBun && coordsBun < 350 ) setCurrent('Булки');
            else if ( 250 < coordsSauces && coordsSauces < 350 ) setCurrent('Соусы');
            else if ( 250 < coordsMain && coordsMain < 350 ) setCurrent('Начинки');
        }
        //const block = blockRef.current
        menu && menu.addEventListener('scroll', scrollBlock);
        
        return () => {
            menu && menu.removeEventListener('scroll', scrollBlock);
        }
    })

    //перебираем массив ингредиентов и возвращаем их
    const returnIngredient = (name: string) => {
        return (
            items.map((item: TIngredientMore) => {
                if (item.type === name) {
                    return (
                        <Link className={burgerIngredientsStyles.link} key={item._id} to={`/ingredients/${item._id}`} state={{ backgroundLocation: location }}>
                          <Ingredient data={item} key={item._id}/>
                        </Link>
                    )
                } else { return null }
            })
        )
    }

    //возвращаем верстку контейнера ингредиентов
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
            <menu className={burgerIngredientsStyles.menu} ref={blockRef} id='menu'>
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

export default BurgerIngredients
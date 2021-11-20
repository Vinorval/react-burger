import React from "react";
import IngredientDetails from "../components/ingredientDetails/ingredientDetails";
import { Routes, Route, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Styles from './ingredient.module.css'

export function IngridientPage() {
    let { id } = useParams('id');
    const { items } = useSelector(store => ({ items: store.items.items }))
    console.log(items)
        
      return (
        <div className={Styles.conteiner}>
            <img className={Styles.image} alt='{}' src='{}'></img>
            <h3 className={Styles.title}>{}</h3>
            <ul className={Styles.list}>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Калории,ккал</p>
                    <p className={Styles.item__number}>{}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Белки, г</p>
                    <p className={Styles.item__number}>{}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Жиры, г</p>
                    <p className={Styles.item__number}>{}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Углеводы, г</p>
                    <p className={Styles.item__number}>{}</p>
                </li>
            </ul>
        </div>
    )
}
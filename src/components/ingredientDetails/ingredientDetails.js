import React from "react";
import ingredientDetailsStyles from './ingredientDetails.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
    //забираем из редукса данные о передоваемом ингредиенте
    const { ingredient } = useSelector(store => ({ ingredient: store.ingredient.ingredient }))

    //возвращаем верстку модала с деталями ингредиента
    return (
        <div className={ingredientDetailsStyles.conteiner}>
            <img className={ingredientDetailsStyles.image} alt={ingredient.name} src={ingredient.image}></img>
            <h3 className={ingredientDetailsStyles.title}>{ingredient.name}</h3>
            <ul className={ingredientDetailsStyles.list}>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Калории,ккал</p>
                    <p className={ingredientDetailsStyles.item__number}>{ingredient.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Белки, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{ingredient.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Жиры, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{ingredient.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Углеводы, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

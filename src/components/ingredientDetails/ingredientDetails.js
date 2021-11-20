import React from "react";
import ingredientDetailsStyles from './ingredientDetails.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { OPEN_POPUP } from '../../services/actions/actions';

export default function IngredientDetails() {
    const dispatch = useDispatch();
    let params = useParams();
    
    //забираем из редукса данные о передоваемом ингредиенте
    const { ingredient, items } = useSelector(store => ({ ingredient: store.ingredient.ingredient, items: store }))

    //React.useEffect(() => {
    //    if (Boolean({id: params.id})) return console.log(params.id)
    //    console.log(ingredient)
    //    let result = items.find(item => item._id === params.id)
    //    console.log(items)
    //}, [items])

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

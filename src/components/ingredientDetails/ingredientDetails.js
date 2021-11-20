import React from "react";
import ingredientDetailsStyles from './ingredientDetails.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { OPEN_POPUP } from '../../services/actions/actions';

export default function IngredientDetails() {
    let { id } = useParams('id');
    const { ingredient, items } = useSelector(store => ({ ingredient: store.ingredient.ingredient, items: store.items.items }))
    const rett = React.useCallback(() => {
        const returnIngredient = () => {
         return items.find(item => item._id === id)
       }
       return returnIngredient()
     }, [items])
    
    //console.log(params)
    //let result = {}
    
    //забираем из редукса данные о передоваемом ингредиенте
    

    //возвращаем верстку модала с деталями ингредиента
    return (
        <>
        {Boolean(rett()) && <div className={ingredientDetailsStyles.conteiner}>
            <img className={ingredientDetailsStyles.image} alt={rett().name} src={rett().image}></img>
            <h3 className={ingredientDetailsStyles.title}>{rett().name}</h3>
            <ul className={ingredientDetailsStyles.list}>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Калории,ккал</p>
                    <p className={ingredientDetailsStyles.item__number}>{rett().calories}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Белки, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{rett().proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Жиры, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{rett().fat}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Углеводы, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{rett().carbohydrates}</p>
                </li>
            </ul>
        </div>}
        </>
    )
}

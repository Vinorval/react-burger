import React from "react";
import ingredientDetailsStyles from './ingredientDetails.module.css';
//import { useSelector, RootStateOrAny } from 'react-redux';
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router";
import { TIngredient } from "../../utils/types";

export default function IngredientDetails() {
    const { id } = useParams();
    const { items } = useSelector(( store ) => ({ items: store.items.items }))
    //const rett = React.useCallback(() => {
    //    const returnIngredient = () => {
    //     return items !== null && items.find((item: TIngredient) => item._id === id)
    //   }
    //   return returnIngredient()
    //}, [items, id])

    const returnIngredient = React.useMemo(() => {
        return items && items.find((item: TIngredient) => item._id === id);
    }, [items, id]);
    
    //возвращаем верстку модала с деталями ингредиента
    return (
        <>
        {Boolean(returnIngredient) &&
        <div className={ingredientDetailsStyles.conteiner}>
            <img className={ingredientDetailsStyles.image} alt={returnIngredient?.name} src={returnIngredient?.image}></img>
            <h3 className={ingredientDetailsStyles.title}>{returnIngredient?.name}</h3>
            <ul className={ingredientDetailsStyles.list}>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Калории,ккал</p>
                    <p className={ingredientDetailsStyles.item__number}>{returnIngredient?.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Белки, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{returnIngredient?.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Жиры, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{returnIngredient?.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Углеводы, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{returnIngredient?.carbohydrates}</p>
                </li>
            </ul>
        </div>}
        </>
    )
}
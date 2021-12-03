import React from "react";
import ingredientDetailsStyles from './ingredientDetails.module.css';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useParams } from "react-router";

interface IIngredient {
    _id: string;
    id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
}

export default function IngredientDetails() {
    let { id } = useParams();
    const { items } = useSelector(( store: RootStateOrAny) => ({ items: store.items.items }))
    const rett = React.useCallback(() => {
        const returnIngredient = () => {
         return items.find((item: IIngredient) => item._id === id)
       }
       return returnIngredient()
     }, [items, id])
    
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
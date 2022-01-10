import React from "react";
import { useParams } from 'react-router-dom';
//import { useSelector, RootStateOrAny } from 'react-redux';
import { useSelector } from "../services/hooks";
import Styles from './ingredient.module.css';
import { TIngredient } from '../utils/types'

export function IngridientPage() {
    const { id } = useParams();
    const { items } = useSelector((store ) => ({ items: store.items.items }))
 
    //const rett = React.useCallback(() => {
    //   const returnIngredient = () => {
    //    return items.find((item: TIngredient) => item._id === id)
    //  }
    //  return returnIngredient()
    //}, [items, id])
    const returnIngredient = React.useMemo(() => {
        return items && items.find((item: TIngredient) => item._id === id);
    }, [items, id]);
    
        
      return (
        <>
        {Boolean(returnIngredient) && <div className={Styles.conteiner}>
            <img className={Styles.image} alt={returnIngredient?.name} src={returnIngredient?.image}></img>
            <h3 className={Styles.title}>{returnIngredient?.name}</h3>
            <ul className={Styles.list}>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Калории,ккал</p>
                    <p className={Styles.item__number}>{returnIngredient?.calories}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Белки, г</p>
                    <p className={Styles.item__number}>{returnIngredient?.proteins}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Жиры, г</p>
                    <p className={Styles.item__number}>{returnIngredient?.fat}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Углеводы, г</p>
                    <p className={Styles.item__number}>{returnIngredient?.carbohydrates}</p>
                </li>
            </ul>
        </div>}
        </>
    )
}
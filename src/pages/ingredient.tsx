import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import Styles from './ingredient.module.css';

interface IIngredient {
    _id: string;
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

export function IngridientPage() {
    let { id } = useParams();
    const { items } = useSelector((store: RootStateOrAny) => ({ items: store.items.items }))
 
    const rett = React.useCallback(() => {
       const returnIngredient = () => {
        return items.find((item: IIngredient) => item._id === id)
      }
      return returnIngredient()
    }, [items, id])
    
        
      return (
        <>
        {Boolean(rett()) && <div className={Styles.conteiner}>
            <img className={Styles.image} alt={rett().name} src={rett().image}></img>
            <h3 className={Styles.title}>{rett().name}</h3>
            <ul className={Styles.list}>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Калории,ккал</p>
                    <p className={Styles.item__number}>{rett().calories}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Белки, г</p>
                    <p className={Styles.item__number}>{rett().proteins}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Жиры, г</p>
                    <p className={Styles.item__number}>{rett().fat}</p>
                </li>
                <li className={Styles.item}>
                    <p className={Styles.item__text}>Углеводы, г</p>
                    <p className={Styles.item__number}>{rett().carbohydrates}</p>
                </li>
            </ul>
        </div>}
        </>
    )
}
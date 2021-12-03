import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Styles from './ingredient.module.css'

export function IngridientPage() {
    let { id } = useParams('id');
    const { items } = useSelector(store => ({ items: store.items.items }))
 
    const rett = React.useCallback(() => {
       const returnIngredient = () => {
        return items.find(item => item._id === id)
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
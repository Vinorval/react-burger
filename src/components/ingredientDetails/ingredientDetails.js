import React from "react";
import ingredientDetailsStyles from './ingredientDetails.module.css';

function IngredientDetails({image, name, property}) {
    return (
        <div className={ingredientDetailsStyles.conteiner}>
            <img className={ingredientDetailsStyles.image} alt={name} src={image}></img>
            <h3 className={ingredientDetailsStyles.title}>{name}</h3>
            <ul className={ingredientDetailsStyles.list}>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Калории,ккал</p>
                    <p className={ingredientDetailsStyles.item__number}>{property.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Белки, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{property.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Жиры, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{property.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={ingredientDetailsStyles.item__text}>Углеводы, г</p>
                    <p className={ingredientDetailsStyles.item__number}>{property.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails
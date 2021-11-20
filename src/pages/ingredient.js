import React from "react";
import IngredientDetails from "../components/ingredientDetails/ingredientDetails";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function IngridientPage() {
    const { ingredient } = useSelector(store => ({ ingredient: store.ingredient.ingredient }))

    return (
        
          <h2>Guten Morgen</h2>
        
    )
}
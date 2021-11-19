import React from "react";
import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredientDetails/ingredientDetails";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function IngridientPage() {
    const { ingredient } = useSelector(store => ({ ingredient: store.ingredient.ingredient }))

    return (
        
          <Routes >
            <Route path={`${ingredient._id}`} element={ <IngredientDetails/> } />
          </Routes>
        
    )
}
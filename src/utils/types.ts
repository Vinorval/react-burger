export type TIngredient = {
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

export type TIngredientConstructor = TIngredient & { id: string; }
export type TIngredientMore = TIngredient & { _ID: string; qt: number; }

export type TProfile = {
    name: string;
    email: string;
    password: string;
}

export type TOrder = { number: number }

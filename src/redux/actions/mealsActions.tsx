import { Meal } from "../../interfaces/Meal";

export enum MealsActions {
    ADD_MEAL = 'ADD_MEAL'
}

interface AddMeal {
    type: MealsActions.ADD_MEAL,
    meal: Meal
}

export const addMeal = (meal: Meal): AddMeal => ({type: MealsActions.ADD_MEAL, meal});

export type MealsActionType = AddMeal;
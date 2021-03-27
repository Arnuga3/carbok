import { IMeal } from "../../interfaces/IMeal";

export enum MealsActions {
    ADD_MEAL = 'ADD_MEAL'
}

interface AddMeal {
    type: MealsActions.ADD_MEAL,
    meal: IMeal
}

export const addMeal = (meal: IMeal): AddMeal => ({type: MealsActions.ADD_MEAL, meal});

export type MealsActionType = AddMeal;
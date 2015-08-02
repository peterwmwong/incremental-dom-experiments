import {NEW_RECIPE, EDIT_RECIPE} from "../constants/ActionTypes";

export function newRecipe(){
  return {type: NEW_RECIPE};
}

export function editRecipe(updatedProperties){
  return {
    type: EDIT_RECIPE,
    updatedProperties
  };
}

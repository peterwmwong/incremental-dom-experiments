import {VIEW_RECIPE, VIEW_RECIPE_LIST} from "../constants/ActionTypes";

export function viewRecipeList(){
  return {
    type: VIEW_RECIPE_LIST
  };
}

export function viewRecipe(recipe){
  return {
    type: VIEW_RECIPE,
    recipe
  };
}

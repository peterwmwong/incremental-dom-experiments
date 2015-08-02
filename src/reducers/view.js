import {VIEW_RECIPE, VIEW_RECIPE_LIST} from "../constants/ActionTypes.js";
import {RECIPE_PAGE, RECIPE_LIST_PAGE} from "../constants/Pages.js";

const INITIAL_STATE = {
  page:RECIPE_LIST_PAGE
};

export default function(state = INITIAL_STATE, action){
  switch (action.type){
    case VIEW_RECIPE_LIST:
      return INITIAL_STATE;

    case VIEW_RECIPE:
      return {page:RECIPE_PAGE, recipe:action.recipe};

    default:
      return state;
  }
}

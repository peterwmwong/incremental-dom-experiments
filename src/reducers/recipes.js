import Recipe from "../models/Recipe";
import { NEW_RECIPE, EDIT_RECIPE } from "../constants/ActionTypes";

const INITIAL_STATE = [
  new Recipe({
    title:"Sausage Gumbo",
    ingredients:[
      "1 onion",
      "2 carrots",
      "1 pepper",
      "1 cup chicken stock",
      "1/4 cup flour"
    ],
    directions:[
      "Cook the sausages",
      "Move the cooked sausages to the crockpot",
      "Cook the veggies",
      "Add the flour and chicken stock to the veggies",
      "Move the veggies to the crockpot"
    ]
  }),
  new Recipe({
    title:"Broccoli Macaroni",
    ingredients:[
      "1 broccoli head",
      "1 cup of cheese",
      "1 bundle of noodles"
    ],
    directions:[
      "Boil noodles",
      "Move the cooked sausages to the crockpot",
      "Cook the veggies",
      "Add the flour and chicken stock to the veggies",
      "Move the veggies to the crockpot"
    ]
  })
];

export default function todos(state = INITIAL_STATE, action){
  switch (action.type){
    case NEW_RECIPE:
      return [new Recipe({title:undefined}), ...state];

    case EDIT_RECIPE:
      return state.map(recipe=>
        recipe.id !== action.id ? todo : {...todo, ...action.updatedProperties}
      );

    default:
      return state;
  }
}

import "./App.css";

import component      from "../helpers/component.js";
import RecipeListPage from "./pages/RecipeListPage.jsx";
import RecipePage     from "./pages/RecipePage.jsx";
import Recipe         from "../models/Recipe.js";

const PAGE_LIST   = "List";
const PAGE_RECIPE = "Recipe";
const ALL_RECIPES = Recipe.query();

export default component({
  constructor(props){
    this.state = {
      // page           : PAGE_RECIPE,
      // selectedRecipe : ALL_RECIPES[0]

      page:PAGE_LIST,
      recipes:ALL_RECIPES
    };
  },

  render(props, {page, selectedRecipe, recipes}){
    return (
      <div className="App">
        {page === PAGE_LIST &&
          <RecipeListPage
            key="APP_RECIPE_LIST_PAGE"
            recipes={recipes}
            onSelect={::this.handleRecipeSelect} />, ""}
        {page === PAGE_RECIPE &&
          <RecipePage
            key="APP_RECIPE_PAGE"
            recipe={selectedRecipe}
            onClose={::this.handleCloseRecipe} />, ""}
      </div>
    );
  },

  handleRecipeSelect(selectedRecipe){
    this.setState({page:PAGE_RECIPE, selectedRecipe});
  },

  handleCloseRecipe(){
    this.setState({page:PAGE_LIST, recipes:Recipe.query()});
  }
});

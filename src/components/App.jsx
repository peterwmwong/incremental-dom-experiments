import "./App.css";

import component                       from "../helpers/component.js";
import rerenderNode                    from "../helpers/rerenderNode.js";
import RecipeListPage                  from "./pages/RecipeListPage.jsx";
import RecipePage                      from "./pages/RecipePage.jsx";

import {RECIPE_PAGE, RECIPE_LIST_PAGE}  from "../constants/Pages.js";
import {viewRecipe, viewRecipeList}     from "../actions/ViewActions.js";
import { createStore, combineReducers } from "redux/lib/index.js";
import * as reducers                    from "../reducers";

const STORE    = createStore(combineReducers(reducers));
const dispatch = STORE.dispatch;

function connect(render){
  function doRender(){ return render(STORE.getState()); }

  const node = doRender();
  if(!node.__connect_unsubscribe){
    node.__connect_unsubscribe = STORE.subscribe(()=>{
      if(node.parentNode){
        rerenderNode(node, doRender);
      }
      else{
        node.__connect_unsubscribe();
      }
    });
  }
  return node;
}

export default connect(state=>({view:state.view}))(
  component({
    render({view}){
      return (
        <div className="App">
          {view.page === RECIPE_LIST_PAGE &&
            <RecipeListPage
              key="APP_RECIPE_LIST_PAGE"
              recipes={recipes}
              onSelect={::this.handleRecipeSelect}
              onNew={::this.handleNewRecipe} />, ""}
          {view.page === RECIPE_PAGE &&
            <RecipePage
              key="APP_RECIPE_PAGE"
              recipe={view.recipe}
              onClose={::this.handleCloseRecipe} />, ""}
        </div>
      );
    },

    handleRecipeSelect(selectedRecipe){
      dispatch(viewRecipe(selectedRecipe));
    },

    handleNewRecipe(){
      // const newRecipe = new Recipe({});
      // newRecipe.id = null;
      // this.setState({page:PAGE_RECIPE, selectedRecipe:newRecipe});
    },

    handleCloseRecipe(){
      dispatch(viewRecipeList());
    }
  })
);

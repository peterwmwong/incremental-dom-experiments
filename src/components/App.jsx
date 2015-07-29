import "./App.css";

import statefulComponent from "../helpers/statefulComponent";
import RecipeList        from "./RecipeList.jsx";
import Recipe            from "../models/Recipe.js";

const PAGE_LIST   = "List";
const PAGE_RECIPE = "Recipe";

function renderPage({page, recipes}){
  if(page === PAGE_LIST){
    <div>
      <header className="App-toolbar">
        Recipes
        <span className='App-toolbar__icon App-toolbar__right-item'>+</span>
      </header>
      <section className="App-content">
        <RecipeList recipes={recipes} />
      </section>
    </div>;
  }
  else if(page === PAGE_RECIPE){
    <div>
      <header className="App-toolbar">
        Recipes
        <span className='App-toolbar__icon App-toolbar__right-item'>+</span>
      </header>
      <section className="App-content">
        <RecipeList recipes={recipes} />
      </section>
    </div>;
  }
  return "";
}

export default statefulComponent({
  getInitialState:props=>({
    page: PAGE_LIST,
    recipes: [
      new Recipe({
        title:"Recipe One",
        ingredients:[
          "onion",
          "carrots"
        ]
      })
    ]
  }),

  render:(props, state)=>
    <div className="App">
      {renderPage(state)}
    </div>
});

import "./App.css";
import statefulComponent from "../helpers/StatefulComponent";
import RecipeList from "./RecipeList.jsx";

const App = statefulComponent({
  render({recipes}){
    return (
      <div className="App">
        <header className="App-header">Recipes</header>
        <section className="App-content">
          <RecipeList recipes={recipes} />
        </section>
        <aside className="App-drawer">
          drawer
        </aside>
      </div>
    );
  }
});

let nextRecipeId = 0;
function Recipe({id, title, ingredients, directions}){
  this.id          = id || ++nextRecipeId;
  this.title       = title;
  this.ingredients = ingredients || [];
  this.directions  = directions || [];
}

export default statefulComponent({
  reduce:(props, recipes)=>([
    new Recipe({
      title:"Recipe One",
      ingredients:[
        "onion",
        "carrots"
      ]
    })
  ]),
  render:(props, recipes)=>
    <App recipes={recipes}/>
});

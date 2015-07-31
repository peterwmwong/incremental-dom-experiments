import component from "../../helpers/component.js";
import RecipeList        from "../RecipeList.jsx";

export default component({
  render:({key, recipes, onSelect})=>
    <div key={key}>
      <header className="App-toolbar">
        Recipes
        <span className="App-toolbar__icon App-toolbar__right-item">+</span>
      </header>
      <section className="App-content">
        <RecipeList recipes={recipes} onSelect={onSelect} />
      </section>
    </div>
});

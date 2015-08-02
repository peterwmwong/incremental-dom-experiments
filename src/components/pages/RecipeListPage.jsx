import component from "../../helpers/component.js";
import RecipeList        from "../RecipeList.jsx";

export default component({
  render:({key, recipes, onSelect, onNew})=>
    <div key={key}>
      <header className="App-toolbar">
        Recipes
        <a
          className="App-toolbar__icon App-toolbar__right-item"
          onclick={onNew}>+</a>
      </header>
      <section className="App-content">
        <RecipeList recipes={recipes} onSelect={onSelect} />
      </section>
    </div>
});

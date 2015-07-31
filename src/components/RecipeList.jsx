import component from "../helpers/component.js";

export default component({
  render:({recipes, onSelect})=>
    <ul className="List">
      <li className="List__item List__item--header" key="RECIPE_HEADER">
        Recipes
      </li>
      {recipes.forEach(recipe=>
        <li className="List__item" key={recipe.id}>
          <a onclick={()=>onSelect(recipe)}>
            {recipe.title}
          </a>
        </li>
      ), ""}
    </ul>
});

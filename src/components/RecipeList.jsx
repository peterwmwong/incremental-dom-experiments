import statefulComponent from "../helpers/statefulComponent";

export default statefulComponent({
  render:({recipes})=>
    <ul className="List">
      <li className="List__item List__item--header" key="RECIPE_HEADER">
        Recipes
      </li>
      {recipes.forEach(recipe=>
        <li className="List__item" key={recipe.id}>{recipe.title}</li>
      ), ""}
    </ul>
});

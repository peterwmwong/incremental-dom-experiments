import statefulComponent from "../helpers/StatefulComponent";

export default statefulComponent({
  render:({recipes})=>
    <ul className="todo-list">
      {recipes.forEach(recipe=>
        <li>{recipe.title}</li>
      ), ""}
    </ul>
});

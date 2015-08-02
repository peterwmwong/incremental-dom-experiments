import component from "../../helpers/component.js";

export default component({
  render({key, recipe, onClose}){
    return (
      <div key={key}>
        <header className="App-toolbar">
          {recipe.title || ""}
          <a className="App-toolbar__icon" onclick={onClose}>&lt;</a>
          {!this.isNewRecipe(recipe) ? "" :
            <a className="App-toolbar__icon App-toolbar__right-item">Save</a>}
        </header>

        <section className="App-content">
          <ul className="List">
            <li className="List__item List__item--header" key="RECIPE_INGREDIENTS">
              Ingredients
            </li>
            {recipe.ingredients.forEach((ingredient, i)=>
              <li className="List__item" key={ingredient + i}>
                {ingredient}
              </li>
            ), ""}
            <li className="List__item" key="RECIPE_ADD_INGREDIENT">
              <input
                placeholder="add an ingredient"
                onchange={::this.handleAddIngredient} />
            </li>

            <li className="List__item List__item--header" key="RECIPE_DIRECTIONS">
              Directions
            </li>
            {recipe.directions.forEach((direction, i)=>
              <li className="List__item" key={direction + i}>
                {direction}
              </li>
            ), ""}
            <li className="List__item" key="RECIPE_ADD_DIRECTION">
              <input
                placeholder="add a direction"
                onchange={::this.handleAddDirection} />
            </li>
          </ul>
        </section>
      </div>
    );
  },

  isNewRecipe:recipe=>!!recipe.id,

  handleAddIngredient({target}){
    this.props.recipe.ingredients.push(target.value);
    target.value = "";
    this.setState();
  },

  handleAddDirection({target}){
    this.props.recipe.directions.push(target.value);
    target.value = "";
    this.setState();
  }
});

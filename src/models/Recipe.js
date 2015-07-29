let nextRecipeId = 0;

export default function({id, title, ingredients, directions}){
  this.id          = id || ++nextRecipeId;
  this.title       = title;
  this.ingredients = ingredients || [];
  this.directions  = directions || [];
}

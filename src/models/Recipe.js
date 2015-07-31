let nextRecipeId = 0;

function Recipe({id, title, ingredients, directions}){
  this.id          = id || ++nextRecipeId;
  this.title       = title;
  this.ingredients = ingredients || [];
  this.directions  = directions || [];
}

Recipe.query = function(){
  return [
    new Recipe({
      title:"Sausage Gumbo",
      ingredients:[
        "1 onion",
        "2 carrots",
        "1 pepper",
        "1 cup chicken stock",
        "1/4 cup flour"
      ],
      directions:[
        "Cook the sausages",
        "Move the cooked sausages to the crockpot",
        "Cook the veggies",
        "Add the flour and chicken stock to the veggies",
        "Move the veggies to the crockpot"
      ]
    }),
    new Recipe({
      title:"Broccoli Macaroni",
      ingredients:[
        "1 broccoli head",
        "1 cup of cheese",
        "1 bundle of noodles"
      ],
      directions:[
        "Boil noodles",
        "Move the cooked sausages to the crockpot",
        "Cook the veggies",
        "Add the flour and chicken stock to the veggies",
        "Move the veggies to the crockpot"
      ]
    })
  ];
};

export default Recipe;

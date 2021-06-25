const recipes = [];

module.exports = {
  addRecipe: (req, res) => {
    const { recipe } = req.body;
    recipes.push(recipe);
    res.status(200).json(recipes);
  },

  getRecipes: (req, res) => res.status(200).json(recipes)
}
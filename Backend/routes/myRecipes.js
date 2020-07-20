var express = require("express");
var router = express.Router();
const DButils = require("../modules/DButils");

const users_recipes = require("./utils/users_recipes");



router.get("/previews", async (req, res, next) => {
    try {
        let recipes_previews = await users_recipes.getUserRecipesPreviews(req.user_details.user_id);

        res.status(200).send(recipes_previews);
    } catch (error) {
        next(error);
    }
});

router.get("/recipeID/:recipeId", async (req, res, next) => {
    try {
        let recipe_details = await users_recipes.getUserRecipeDetails(req.params.recipeId, req.user_details.user_id);
        console.log("hello");
        console.log(recipe_details.ingredients);
        recipe_details.ingredients = JSON.parse(recipe_details.ingredients);
        console.log(recipe_details.ingredients)
        res.status(200).send(recipe_details);
    } catch (error) {
        next(error);
    }
});

router.get("/detailedInstructions/recipeID/:recipeId", async (req, res, next) => {
    try {
      const detailed_instructions = await users_recipes.getUserDetailedInstructions(req.user_id, req.params.recipeId);
      res.status(200).send(detailed_instructions);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
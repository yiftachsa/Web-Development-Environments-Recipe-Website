var express = require("express");
var router = express.Router();
const DButils = require("../modules/DButils");

const users_recipes = require("./utils/users_recipes");

//all familyRecipes
router.get("/all", async function (req, res, next) {
  try {
    let family_recipes = await users_recipes.getUserFamilyRecipes(
      req.user_details.user_id
    );
    res.status(200).send(family_recipes);
  } catch (error) {
    next(error);
  }
});

router.get("/detailedInstructions/recipeID/:recipeId",
  async (req, res, next) => {
    try {
      const detailed_instructions = await users_recipes.getFamilyDetailedInstructions(
        req.user_id,
        req.params.recipeId
      );
      res.status(200).send(detailed_instructions);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/recipeID/:recipeId", async (req, res, next) => {
    try {
        let recipe_details = await users_recipes.getFamilyRecipeDetails(req.params.recipeId, req.user_details.user_id);
        recipe_details.ingredients = JSON.parse(recipe_details.ingredients);
        res.status(200).send(recipe_details);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

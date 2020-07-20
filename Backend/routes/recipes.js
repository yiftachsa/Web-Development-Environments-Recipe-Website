var express = require("express");
var router = express.Router();
const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const search_module = require("./utils/search");
const recipes_util = require("./utils/recipes_util");


/**
 * Router - Returns three random recipes simple previews
 */
router.get("/preview/threeRandom", async (req, res, next) => {
  try {
    let recipes_ids = await recipes_util.get3RandomRecipeIds();

    let recipe_preview_list = await recipes_util.getRecipesPreviewsList(recipes_ids, true);
    res.status(200).send(recipe_preview_list);
  } catch (error) {
    next(error);
  }
});

/**
 * Router - Returns a simple preview of the recipe with the given recipe id
 */
router.get("/preview/simplePreview/recipeID/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_util.getSimplePreview(req.params.recipeId);
    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * Router - Returns a simple preview of the recipe with the given recipe id
 */
router.get("/recipeID/:recipeId", async (req, res, next) => {
  try {
    const recipe_details = await recipes_util.getRecepieDetails(req.params.recipeId);

    res.status(200).send(recipe_details);
  } catch (error) {
    next(error);
  }
});
/**
 * Router - Searchs based on the given query and filters 
 * and returns a recipe preview list the size of the chosen amount (or smaller - based on the search results) 
 */
router.get("/search/userSearchQuery/:searchQuery/amount/:numberOfRecpies", async (req, res, next) => {
  try {

    let search_params = search_module.extractQueryParams(req.params, req.query);

    let preview_list = await search_module.search_recipes(search_params);
    res.send(preview_list);
  } catch (error) {
    next(error);
  }
});
/**
 * Router - Returns the cooking instructions of the recipe with the given recipe id
 */
router.get("/instructions/recipeID/:recipeId", async (req, res, next) => {
  try {
    const instructions = await recipes_util.getInstructions(req.params.recipeId);
    res.status(200).send(instructions);
  } catch (error) {
    next(error);
  }
});

router.get("/detailedInstructions/recipeID/:recipeId", async (req, res, next) => {
  try {
    const detailed_instructions = await recipes_util.getDetailedInstructions(req.params.recipeId);
    res.status(200).send(detailed_instructions);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
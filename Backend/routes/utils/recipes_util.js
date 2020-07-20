const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";


/**
 * Recieves a recipe id and returns a simple preview for the recipe matching the given id
 * @param {*} recipe_id 
 */
async function getSimplePreview(recipe_id) {
    let recipe_info = await retreiveRecipeInformation(recipe_id);
    return extractRecipePreview(recipe_info);
}

async function getSimplePreviewContainingInstructions(recipe_id) {
    let recipe_info = await retreiveRecipeInformation(recipe_id);
    let { instructions } = recipe_info.data;
    while (instructions === "") {
        let random_recipe_id = Math.floor(Math.random() * (10000 - 1)) + 1; //The maximum is exclusive and the minimum is inclusive
        recipe_info = await retreiveRecipeInformation(random_recipe_id);
        let { new_instructions } = recipe_info.data;
        instructions = new_instructions;
    }
    return extractRecipePreview(recipe_info);
}
/**
 *  * Recieves a list of recipes ids and returns a list of simple previews for the recipes matching the given ids.
 * @param {*} recipes_ids a list of recipes ids
 * @param {*} require_instructions 
 */
async function getRecipesPreviewsList(recipes_ids, require_instructions) {
    let promises = [];
    recipes_ids.forEach(recipe_id => {
        if (require_instructions) {
            promises.push(getSimplePreviewContainingInstructions(recipe_id));
        } else {
            promises.push(getSimplePreview(recipe_id));
        }
    });
    let simple_previews = await Promise.all(promises);
    return simple_previews;
}
/**
 * Returns three random recipes' ids
 */
async function get3RandomRecipeIds() {
    let results = await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return extractIDsFromResults(results.data.recipes);
}

/**
 * Returns the cooking instructions of the recipe with the given recipe id
 * @param {*} recipe_id 
 */
async function getInstructions(recipe_id) {
    let recipe_info = await retreiveRecipeInformation(recipe_id);
    let { instructions } = recipe_info.data;
    return instructions;
}

async function getDetailedInstructions(recipe_id) {
    let recipe_info = await axios.get(`${api_domain}/${recipe_id}/analyzedInstructions`, {
        params: {
            stepBreakdown: false,
            apiKey: process.env.spooncular_apiKey
        }
    });

    let stages = recipe_info.data;
    let results = [];
    stages.forEach(steps => {
        let steps_result = [];
        steps.steps.forEach(step_i => {
            let step_equipment = [];
            let { number, step } = step_i;
            step_i.equipment.forEach(eq => {
                step_equipment.push(eq.name);
            });
            let step_ingredients = [];
            step_i.ingredients.forEach(ingredient => {
                step_ingredients.push(ingredient.name);
            });
            let step_result = {
                number: number,
                step: step,
                step_equipment: step_equipment,
                step_ingredients: step_ingredients
            };

            steps_result.push( step_result );
        });
        let { name } = steps;
        results.push({
            name: name,
            steps: steps_result
        });
    });

    return results;
}

async function getRecepieDetails(recipe_id) {
    let recipe_info = await retreiveRecipeInformation(recipe_id);
    let { instructions, servings, summary } = recipe_info.data;

    let recipe_preview = extractRecipePreview(recipe_info);
    let ingredients = extractRecipeIngredients(recipe_info);
    let recipe_details = {
        preview: recipe_preview,
        summary: summary,
        instructions: instructions,
        yeild: servings,
        ingredients: ingredients
    };
    return recipe_details;
}

async function retreiveRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

/**
 * Recieves a list of objects with the field "id"
 * and returns a list of all the values of this field
 * from all the objects in the given list
 * @param {*} results 
 */
function extractIDsFromResults(results) {
    let recipes_ids = [];
    results.forEach(recipe => {
        recipes_ids.push(recipe.id);
    });
    return recipes_ids;
}

/**
 * recives a response from spooncular and extract the relevant details for recipe preview
 * @param {*} recipe_info 
 */
function extractRecipePreview(recipe_info) {
    const { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
    let vegan_vegetarian = "non";
    if (vegetarian) {
        vegan_vegetarian = "vegetarian";
    }
    if (vegan) {
        vegan_vegetarian = "vegan";
    }
    let result = {
        recipeId: id,
        photo: image,
        title: title,
        time: readyInMinutes,
        likes: aggregateLikes,
        veganVegetarian: vegan_vegetarian,
        glutenFree: glutenFree
    };
    return result;
}

function extractRecipeIngredients(recipe_info) {
    let recipe_ingredients = [];
    let { extendedIngredients } = recipe_info.data;
    extendedIngredients.forEach(ingredientDetails => {
        let ingredient = {
            amount: ingredientDetails.measures.us.amount,
            unit: ingredientDetails.measures.us.unitShort,
            name: ingredientDetails.originalName
        }
        recipe_ingredients.push(ingredient);
    });
    return recipe_ingredients;
}

exports.getSimplePreview = getSimplePreview;
exports.getRecipesPreviewsList = getRecipesPreviewsList;
exports.extractIDsFromResults = extractIDsFromResults;
exports.get3RandomRecipeIds = get3RandomRecipeIds;
exports.getInstructions = getInstructions;
exports.getRecepieDetails = getRecepieDetails;
exports.getDetailedInstructions = getDetailedInstructions;
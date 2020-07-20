const recipes_util = require("./recipes_util");
const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";

/**
 * Recives the search request params and the request body and returns a list of all the arguments combined 
 * @param {*} req_params 
 * @param {*} req_query 
 */
function extractQueryParams(req_params, req_query) {
    let search_params = {};
    const { searchQuery, numberOfRecpies } = req_params;
    if (numberOfRecpies != 5 && numberOfRecpies != 10 && numberOfRecpies != 15) {
        throw { status: 400, message: "invalid input" };
    }
    search_params.query = searchQuery;
    search_params.number = numberOfRecpies;
    search_params.instructionsRequired = true;
    search_params.apiKey = process.env.spooncular_apiKey;

    let parameters_names = ["cuisine", "diet", "intolerances"];
    parameters_names.forEach((parameter_name) => {
        if (req_query[parameter_name]) {
            search_params[parameter_name] = req_query[parameter_name];
        }
    });
    return search_params;
}

/**
 * Executes a search based on the given search parameters.
 * Returns a list containing previews of the recipes that matched the search.
 * @param {*} search_params 
 */
async function search_recipes(search_params) {
    let search_response = await axios.get(`${api_domain}/search`, {
        params: search_params,
    });
    let recipes_ids = recipes_util.extractIDsFromResults(search_response.data.results);

    let recipe_preview_list = await recipes_util.getRecipesPreviewsList(recipes_ids, false);
    return recipe_preview_list;
}

exports.extractQueryParams = extractQueryParams;
exports.search_recipes = search_recipes;
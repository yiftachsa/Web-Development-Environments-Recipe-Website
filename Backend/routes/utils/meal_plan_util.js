const DButils = require("../../modules/DButils");



async function addRecipeToMealPlan(user_id, recipe_id) {
    let recipe_number = await getNumberOfRecipesInMealPlan(user_id);
    recipe_number = recipe_number + 1;
    await DButils.execQuery(`INSERT INTO dbo.meal_plan (user_id,recipe_id,position)
     VALUES ('${user_id}', '${recipe_id}','${recipe_number}')`);
}

async function getNumberOfRecipesInMealPlan(user_id) {
    let results = await DButils.execQuery(`SELECT * FROM dbo.meal_plan WHERE user_id = '${user_id}'`);
    return results.length;
}

async function isAlreadyInMealPlan(user_id, recipe_id) {
    let results = await DButils.execQuery(`SELECT * FROM dbo.meal_plan WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);
    if (results.length > 0) {
        return true;
    }
    return false;
}

async function removeRecipeFromMealPlan(user_id, recipe_id) {
    let results = await DButils.execQuery(`SELECT position FROM dbo.meal_plan WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);
    let { position } = results[0];
    results = await DButils.execQuery(`SELECT * FROM dbo.meal_plan WHERE user_id = '${user_id}' AND position > '${position}'`);
    let promises = [];
    results.forEach(element => {
        let { position, recipe_id } = element;
        position = position - 1;
        promises.push(DButils.execQuery(`UPDATE dbo.meal_plan SET position = '${position}' WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`));
    });
    await Promise.all(promises);

    await DButils.execQuery(`Delete FROM dbo.meal_plan WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);
}


async function clearMealPlan(user_id) {
    await DButils.execQuery(`Delete FROM dbo.meal_plan WHERE user_id = '${user_id}'`);
}

async function getMealPlanSize(user_id) {
    let results = await DButils.execQuery(`SELECT * FROM dbo.meal_plan WHERE user_id = '${user_id}'`);
    return results.length;
}

async function getMealPlanRecipes(user_id) {
    let results = await DButils.execQuery(`SELECT position,recipe_id FROM dbo.meal_plan WHERE user_id = '${user_id}'`);
    let meal_plan_recipes_order = [];
    results.forEach(element => {
        let { position, recipe_id } = element;
        meal_plan_recipes_order.push({
            position: position,
            recipe_id: recipe_id
        })
    });
    return meal_plan_recipes_order;
}
async function reorderMealPlan(user_id, newMealOrder) {
    let promises = [];
    newMealOrder.forEach(element => {
        let { position, recipe_id } = element;
        promises.push(DButils.execQuery(`UPDATE dbo.meal_plan SET position = '${position}' WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`))
    });
    await Promise.all(promises);
}


exports.addRecipeToMealPlan = addRecipeToMealPlan;
exports.isAlreadyInMealPlan = isAlreadyInMealPlan;
exports.removeRecipeFromMealPlan = removeRecipeFromMealPlan;
exports.clearMealPlan = clearMealPlan;
exports.getMealPlanSize = getMealPlanSize;
exports.getMealPlanRecipes = getMealPlanRecipes;
exports.reorderMealPlan = reorderMealPlan;
const DButils = require("../../modules/DButils");
const recipes_util = require("./recipes_util");

async function getUserFamilyRecipes(user_id) {
  let results = await DButils.execQuery(
    `SELECT * FROM dbo.family_recipes WHERE author = '${user_id}'`
  );
  let family_recipes = [];
  results.forEach((result) => {
    let recipe_details = getRecepieDetails(result);
    recipe_details.ingredients = JSON.parse(recipe_details.ingredients);
    family_recipes.push(recipe_details);
  });
  return family_recipes;
}

async function getUserRecipesPreviews(user_id) {
  let results = await DButils.execQuery(
    `SELECT * FROM dbo.users_recipes WHERE author = '${user_id}'`
  );
  let promises = [];
  for (let index = 0; index < results.length; index++) {
    const result = results[index];
    promises.push(getUserRecipePreview(result));
  }
  let user_recipes_previews = await Promise.all(promises);
  return user_recipes_previews;
}

async function getUserRecipePreview(rerecipe_info) {
  let recipe_simple_preview = getUserRecepieSimplePreview(rerecipe_info);
  // let recipe_additionalInfo = await getUserRecepieAdditionalInfo(rerecipe_info);
  let recipe_preview = {
    preview: recipe_simple_preview,
    //additionalInfo: recipe_additionalInfo
  };
  return recipe_preview;
}

async function getUserRecepieAdditionalInfo(rerecipe_info) {
  let { recipe_id, author } = rerecipe_info;
  await isRecipeExists(recipe_id);

  //TODO: MERAV!!
  let favorite = await DButils.execQuery(
    `SELECT * FROM dbo.favorite WHERE author = '${author}' AND recipe_id = '${recipe_id}'`
  );
  if (favorite.length == 0) {
    favorite = false;
  } else {
    favorite = true;
  }
  //let favorite = true;
  //TODO: MERAV!!
  let watched = await DButils.execQuery(
    `SELECT * FROM dbo.watched WHERE author = '${author}' AND recipe_id = '${recipe_id}'`
  );
  if (watched.length == 0) {
    watched = false;
  } else {
    watched = true;
  }
  //let watched = true;

  let recipeId = JSON.parse(recipe_id);
  let additional_info = {
    recipeId: recipeId,
    watched: watched,
    favorite: favorite,
  };
  return additional_info;
}

async function getUserRecipeDetails(recipe_id, user_id) {
  let result = await DButils.execQuery(
    `SELECT * FROM dbo.users_recipes WHERE author = '${user_id}' AND recipe_id = '${recipe_id}'`
  );
  let recipe_details = getRecepieDetails(result[0]);
  return recipe_details;
}

async function getFamilyRecipeDetails(recipe_id, user_id) {
  let result = await DButils.execQuery(
    `SELECT * FROM dbo.family_recipes WHERE author = '${user_id}' AND recipe_id = '${recipe_id}'`
  );
  let recipe_details = getRecepieDetails(result[0]);
  return recipe_details;
}

function getRecepieDetails(rerecipe_info) {
  let {
    recipe_id,
    title,
    photoLink,
    time,
    veganVegetarian,
    glutenFree,
    details,
    instructions,
    yeild,
    ingredients,
  } = rerecipe_info;

  let recipe_preview = {
    recipeId: recipe_id,
    photo: photoLink,
    title: title,
    time: time,
    likes: -1,
    veganVegetarian: veganVegetarian,
    glutenFree: glutenFree,
  };
  let recipe_details = {
    preview: recipe_preview,
    summary: details,
    instructions: instructions,
    yeild: yeild,
    ingredients: ingredients,
  };
  return recipe_details;
}

function getUserRecepieSimplePreview(rerecipe_info) {
  let {
    recipe_id,
    title,
    photoLink,
    time,
    veganVegetarian,
    glutenFree,
  } = rerecipe_info;

  let recipe_preview = {
    recipeId: recipe_id,
    photo: photoLink,
    title: title,
    time: time,
    likes: -1,
    veganVegetarian: veganVegetarian,
    glutenFree: glutenFree,
  };
  return recipe_preview;
}

async function addRecipeToFavorite(user_id, recipeId) {
  await isRecipeExists(recipeId);
  let result = await DButils.execQuery(
    `SELECT * FROM dbo.favorite WHERE author = '${user_id}' AND recipe_id = '${recipeId}'`
  );
  //already added to favorite
  if (result.length != 0) {
    return false;
  }
  //otherwise
  else {
    await DButils.execQuery(`INSERT INTO dbo.favorite (author , recipe_id)
        VALUES ('${user_id}' , '${recipeId}')`);
    return true;
  }
}

async function addRecipeToWatched(user_id, recipeId) {
  await isRecipeExists(recipeId);
  let result = await DButils.execQuery(
    `SELECT * FROM dbo.watched WHERE author = '${user_id}' AND recipe_id = '${recipeId}'`
  );
  //already added to watched
  if (result.length != 0) {
    await DButils.execQuery(
      `UPDATE dbo.watched SET date = GETDATE() WHERE author = '${user_id}' AND recipe_id = '${recipeId}'`
    );
    return false;
  }
  //otherwise
  else {
    await DButils.execQuery(`INSERT INTO dbo.watched (author , recipe_id ,date)
        VALUES ('${user_id}' , '${recipeId}' , GETDATE())`);
    return true;
  }
}

async function getThreeLastWatch(user_id) {
  let result = await DButils.execQuery(
    `SELECT TOP (3) [recipe_id] FROM dbo.watched WHERE author = '${user_id}'  ORDER BY [date] DESC`
  );
  let recipes_ids = [];
  let i = 0;
  for (i = 0; i < result.length; i++) {
    recipes_ids.push(result[i].recipe_id);
  }
  let promises = [];
  for (i = 0; i < recipes_ids.length; i++) {
    let rerecipe_info = { recipe_id: recipes_ids[i], author: user_id };

    promises.push(getRecipesFullInfo(rerecipe_info));
  }
  let recipes_info = await Promise.all(promises);

  return recipes_info;
}

async function getRecipesFullInfo(rerecipe_info) {
  let { recipe_id, author } = rerecipe_info;
  let simpleInfo = await recipes_util.getSimplePreview(recipe_id);
  let additionalInfo = await getUserRecepieAdditionalInfo(rerecipe_info);
  let allInfo = {
    preview: simpleInfo,
    additionalInfo: additionalInfo,
  };
  return allInfo;
}
async function getFavorite(user_id) {
  let result = await DButils.execQuery(
    ` SELECT [recipe_id] FROM dbo.favorite WHERE author = '${user_id}'`
  );
  let recipes_ids = [];
  let i = 0;
  for (i = 0; i < result.length; i++) {
    recipes_ids.push(result[i].recipe_id);
  }
  let promises = [];
  for (i = 0; i < recipes_ids.length; i++) {
    let rerecipe_info = {
      recipe_id: recipes_ids[i],
      author: user_id,
    };

    promises.push(getRecipesFullInfo(rerecipe_info));
  }
  let recipes_info = await Promise.all(promises);
  return recipes_info;
}

async function getMultiRecipesInfo(recipesIds) {
  let { recipes_ids, author } = recipesIds;
  let promises_recipe_exists = [];
  let i = 0;
  for (i = 0; i < recipes_ids.length; i++) {
    promises_recipe_exists.push(isRecipeExists(recipes_ids[i]));
  }
  await Promise.all(promises_recipe_exists);
  let promises_recipe_info = [];
  i = 0;
  for (i = 0; i < recipes_ids.length; i++) {
    let recipeInfo = {
      recipe_id: recipes_ids[i],
      author: author,
    };
    promises_recipe_info.push(getUserRecepieAdditionalInfo(recipeInfo));
  }
  let result = await Promise.all(promises_recipe_info);
  return result;
}

// async function getUserAdditionalInfo(recipeId, author) {
//     await isRecipeExists(recipeId);

//     result.push(await getUserRecepieAdditionalInfo(recipeInfo));

// }

async function isRecipeExists(recipe_id) {
  await recipes_util.getSimplePreview(recipe_id);
}

async function getUserDetailedInstructions(user_id, recipe_id) {
  let results = await DButils.execQuery(
    `SELECT detailedInstructions FROM dbo.users_recipes WHERE author = '${user_id}' AND recipe_id = '${recipe_id}'`
  );
  let { detailedInstructions } = results[0];
  let recipe_details = JSON.parse(detailedInstructions);

  return recipe_details;
}
async function getFamilyDetailedInstructions(user_id, recipe_id) {
  let results = await DButils.execQuery(
    `SELECT detailedInstructions FROM dbo.family_recipes WHERE author = '${user_id}' AND recipe_id = '${recipe_id}'`
  );
  let { detailedInstructions } = results[0];
  let recipe_details = JSON.parse(detailedInstructions);

  return recipe_details;
}

exports.getUserFamilyRecipes = getUserFamilyRecipes;
exports.getUserRecipeDetails = getUserRecipeDetails;
exports.getUserRecipesPreviews = getUserRecipesPreviews;
exports.getUserRecepieAdditionalInfo = getUserRecepieAdditionalInfo;
exports.addRecipeToFavorite = addRecipeToFavorite;
exports.addRecipeToWatched = addRecipeToWatched;
exports.getThreeLastWatch = getThreeLastWatch;
exports.getFavorite = getFavorite;
exports.getMultiRecipesInfo = getMultiRecipesInfo;
exports.getUserDetailedInstructions = getUserDetailedInstructions;
exports.getFamilyDetailedInstructions = getFamilyDetailedInstructions;
exports.getFamilyRecipeDetails = getFamilyRecipeDetails;



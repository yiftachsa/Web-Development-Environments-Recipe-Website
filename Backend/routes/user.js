var express = require("express");
var router = express.Router();
const DButils = require("../modules/DButils");

const users_details_module = require("./utils/users_details");
const users_recipes = require("./utils/users_recipes");
const myRecipes = require("./myRecipes");
const mealPlan = require("./mealPlan");
const familyRecipes = require("./familyRecipes");




//#region cookie middleware
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    // or findOne Stored Procedure
    let user_exists = await users_details_module.doesUserExists(req.session.user_id);
    if (user_exists) {
      req.user_id = req.session.user_id;
      console.log("req.user_id" + req.user_id);
      req.user_details = await users_details_module.getUserRecordById(req.session.user_id);
      console.log("req.user_details" + req.user_details);
    }
  }
  next();
});
//#endregion

//TODO: check if this need to stay or just move the "throw" to the firs function
router.use((req, res, next) => {
  if (req.user_id) {
    next();
  } else {
    throw { status: 401, message: "unauthorized" };
  }
});

/**
 * receives a recipe Id and a user's cookie and returns additional info
 */
router.get("/loggedPreview/recipeID/:recipeId", async function (req, res , next) {
  try{
  const recipeId = JSON.parse(req.params.recipeId); //todo: must be integer with spooncalur recipe id.
  
  const user_id = req.user_id;
  let recipe_info = {
    recipe_id: recipeId,
    author: user_id
};
  const userInformationOnRecipe = await users_recipes.getUserRecepieAdditionalInfo(recipe_info);
  res.status(200).send(userInformationOnRecipe); // todo: chack
  }catch (error) {
    next(error);
  }
});

router.put("/addToFavorite/recipeID/:recipeId" , async function (req, res , next){
  try{
  const recipeId = req.params.recipeId; //store recipeId as varchar in db. chack if you can add to favotire my recipe
  /*todo: check if recipe id is exists*/ 
  const user_id = req.user_id;
  const addToFavorite = await users_recipes.addRecipeToFavorite(user_id,recipeId);
  if(addToFavorite == false)
  {
    res.status(400).send("Already in favorite"); // todo: chack
  }else{
    res.status(200).send("Added successfully to favorite"); // todo: chack
  }
  }catch (error){
    next(error);
  }
});

router.put("/addToWatched/recipeID/:recipeId" , async function (req, res , next){
  try{
  const recipeId = req.params.recipeId; //store recipeId as varchar in db. chack if you can add to favotire my recipe
  /*todo: check if recipe id is exists*/ 
  const user_id = req.user_id;
  const addToWatched = await users_recipes.addRecipeToWatched(user_id,recipeId);
  if(addToWatched == false)
  {
    res.status(200).send("Updated watched successfully"); // todo: chack
  }else{
    res.status(200).send("Added successfully to watched"); // todo: chack
  }
  }catch (error){
    next(error);
  }
});

router.use("/threeLastWatched" , async function (req , res , next){
  try{
  const user_id = req.user_id;
  let result = await users_recipes.getThreeLastWatch(user_id);
  

  res.status(200).send(result);

  }catch(error){
    next(error);
  }

});

router.use("/myRecipes", myRecipes);
router.use("/mealPlan", mealPlan);
router.use("/familyRecipes", familyRecipes);


router.get("/favorites", async function (req, res, next) {
  try{
    const user_id = req.user_id;
    let result = await users_recipes.getFavorite(user_id);
    res.status(200).send(result);
    }catch(error){
      next(error);
    }
  //console.log("favorites" + req.user_details.username);
});

router.get("/multipleLoggedPreviews/recipesIDs/:recipesIds" ,async function(req , res , next )
{
    try{
    let recipesIds = JSON.parse(req.params.recipesIds);
    let userId = req.user_id;
    let recipe_info = {
      recipes_ids: recipesIds,
      author: userId
  };
    let userInformationOnRecipes = await users_recipes.getMultiRecipesInfo(recipe_info);
    res.status(200).send(userInformationOnRecipes);
  }catch(error){
      next(error);
    }

});


//#region example2 - make add Recipe endpoint

//#region complex
// router.use("/addPersonalRecipe", function (req, res, next) {
//   if (req.session && req.session.user_id) {
//     // or findOne Stored Procedure
//     DButils.execQuery("SELECT user_id FROM dbo.users").then((users) => {
//       if (users.find((x) => x.user_id === req.session.user_id)) {
//         req.user_id = user_id;
//         // req.session.user_id = user_id; //refresh the session value
//         // res.locals.user_id = user_id;
//         next();
//       } else throw { status: 401, message: "unauthorized" };
//     });
//   } else {
//     throw { status: 401, message: "unauthorized" };
//   }
// });
//#endregion

//#region simple
// function valid_cookie(cookie) {
//   return true;
// }

// router.use("/addPersonalRecipe", (req, res, next) => {
//   const { cookie } = req.body; // but the request was GET so how come we have req.body???
//   if (cookie && valid_cookie(cookie)) {
//     req.username = cookie.username;
//     next();
//   } else throw { status: 401, message: "unauthorized" };
// });
//#endregion

router.get("/photoLink", async (req, res, next) => {
  try {
    const user_id = req.user_id;
    let result = await users_details_module.getPhotoLink(user_id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});
//#endregion




module.exports = router;

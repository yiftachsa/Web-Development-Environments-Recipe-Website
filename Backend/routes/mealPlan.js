var express = require("express");
var router = express.Router();
const DButils = require("../modules/DButils");
const meal_plan_util = require("./utils/meal_plan_util");


router.put("/addRecipe/recipeID/:recipeId", async (req, res, next) => {
    try {
        if (await meal_plan_util.isAlreadyInMealPlan(req.user_id, req.params.recipeId)) {
            throw { status: 409, message: "the recipe is already in meal plan" };
        }
        await meal_plan_util.addRecipeToMealPlan(req.user_id, req.params.recipeId);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
});

router.put("/removeRecipe/recipeID/:recipeId", async (req, res, next) => {
    try {
        if (!(await meal_plan_util.isAlreadyInMealPlan(req.user_id, req.params.recipeId))) {
            throw { status: 404, message: "recipe not found in the meal plan" };
        }
        await meal_plan_util.removeRecipeFromMealPlan(req.user_id, req.params.recipeId);
        res.status(200).send();
    } catch (error) {
        if (error.status === 404) {
            res.send(error);
        } else {
            next(error);
        }
    }
});

router.put("/clear", async (req, res, next) => {
    try {
        if ((await meal_plan_util.getMealPlanSize(req.user_id)) == 0) {
            throw { status: 409, message: "the meal plan is already empty" };
        }
        await meal_plan_util.clearMealPlan(req.user_id);
        res.status(200).send();
    } catch (error) {
        if (error.status === 409) {
            res.send(error);
        } else {
            next(error);
        }
    }
});

router.get("/getMealPlan", async (req, res, next) => {
    try {
        let meal_plan_recipes_order = await meal_plan_util.getMealPlanRecipes(req.user_id);
        res.status(200).send(meal_plan_recipes_order);
    } catch (error) {
        next(error);
    }
});
router.put("/reorder/recipesNewOrder", async (req, res, next) => {
    try {
        if ((await meal_plan_util.getMealPlanSize(req.user_id)) == 0) {
            throw { status: 409, message: "the meal plan is already empty" };
        }
        await meal_plan_util.reorderMealPlan(req.user_id, req.body);
        res.status(200).send();
    } catch (error) {
        if (error.status === 409) {
            res.send(error);
        } else {
            next(error);
        }
    }
});
router.get("/getMealPlanSize", async (req, res, next) => {
    try {
        let meal_plan_size = await meal_plan_util.getMealPlanSize(req.user_id);
        res.status(200).send({ size: meal_plan_size });
    } catch (error) {
        next(error);
    }
});


module.exports = router;
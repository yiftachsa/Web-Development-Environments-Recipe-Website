<template>
  <div class="container">
    <div v-if="recipe">
     <ImageAndTitlePageDisplay :title="recipe.title" :photo="recipe.photo"/>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3 normal">
              <div  v-if="recipeType=='regular'">
                <div v-if="$cookies.get('session')">
                <AddRecipeToMeal v-on:updateSize="updateSize"
                  v-if="recipe != null"
                  :recipe="recipe.recipeId"
                  :recipeType="recipeType"
                />
              </div>
                <b>
                  Ready in {{ this.recipe.time }} minutes
                  <b-icon font-scale="1.25" icon="alarm" variant="dark"></b-icon>
                </b>
              </div>
              <div v-if="typeof recipe.recipeId === 'number'">
                <b>Likes:</b>
                {{ this.recipe.likes }}
                <b-icon font-scale="1.5" icon="hand-thumbs-up" variant="primary"></b-icon>
                <div>
              <br />
                  <RecipePreviewAdditionalInfo
                    class="additionalInfoStyle"
                    :recipeId="recipe.recipeId"
                    v-if="$cookies.get('session')"
                  />
                </div>
              </div>
              <br />
              <img
                v-if="recipe.veganVegetarian == 'vegetarian'"
                src="../assets/Vegetarian.png"
                class="icon"
              />
              <img v-if="recipe.veganVegetarian == 'vegan'" src="../assets/vegan.jpg" class="icon" />
              <img v-if="recipe.glutenFree == true" src="../assets/gluten free.jpg" class="icon" />
              <div>
                <b>Yield:</b>
                {{ this.recipe.yeild }}
              </div>
              <div>
                <RecipePrepButton v-on:updateSize="updateSize"
                  v-if="recipe != null"
                  :recipeId="recipe.recipeId"
                  :recipeType="recipeType"
                />
              </div>
              <div>
                <b>Summery:</b>
                <ol v-html="recipe.summary"></ol>
              </div>
            </div>
          </div>
          <div class="wrapped normal">
            <Ingredients :ingredients="recipe.ingredients" />
            <div>
              <b>Instructions:</b>
              <ol v-html="recipe.instructions"></ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FoodSigns />
  </div>
</template>

<script>
import RecipePreviewAdditionalInfo from "../components/RecipePreviewAdditionalInfo";
import Ingredients from "../components/Ingredients";
import FoodSigns from "../components/FoodSigns";
import RecipePrepButton from "../components/RecipePrepButton";
import ImageAndTitlePageDisplay from "../components/ImageAndTitlePageDisplay";
import AddRecipeToMeal from "../components/AddRecipeToMeal";

export default {
  components: {
    RecipePreviewAdditionalInfo,
    Ingredients,
    FoodSigns,
    RecipePrepButton,
    ImageAndTitlePageDisplay,
    AddRecipeToMeal
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    recipeType: {
      type: String,
      required: true
    }
  },
  methods:{
    updateSize()
    {
      this.$emit("updateSize");
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.wrapped {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 4%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}



.normal {
  font-family: "Dosis", sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: black;
}

.summery {
  font-family: "Dosis", sans-serif;
  font-size: 1.5rem;
  color: black;
}

.icon {
  width: 10%;
  height: auto;
}

.border {
  padding: 2px;
  border: 2px solid grey;
  background-color: #e1ad01;
}

.additionalInfoStyle {
  display: flex;
  display: inline-block;
}
</style>

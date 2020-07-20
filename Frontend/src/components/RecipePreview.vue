<template>
  <div class="polaroid recipe-preview">
    <router-link
      v-if="typeof recipe.recipeId === 'number'"
      :to="{ name: 'recipe', params: { recipeId: recipe.recipeId } }"
    >
      <ImageAndTitle :photo="recipe.photo" :title="recipe.title" />
    </router-link>
    <router-link
      v-if="typeof recipe.recipeId === 'string'"
      :to="{ name: 'user_recipe', params: { recipeId: recipe.recipeId } }"
    >
      <ImageAndTitle :photo="recipe.photo" :title="recipe.title" />
    </router-link>
    <div v-if="typeof recipe.recipeId ==='number'">
      <div class="bold container" v-if="$cookies.get('session')">
        <RecipePreviewAdditionalInfo class="additionalInfoStyle"
          :recipeId="recipe.recipeId"
          :additionalInfoProp="recipe.additionalInfo"
          v-if="recipe.additionalInfo"
        />
        <RecipePreviewAdditionalInfo :recipeId="recipe.recipeId" v-else />
      </div>
    </div>
    <div class="recipe-footer">
      <div class="container">
        <ul class="recipe-overview">
          <li>
              <div class="bold">
                {{ recipe.time }} min. <b-icon font-scale="1.25" icon="alarm" variant="dark"></b-icon>
              </div>
          </li>
          <li>
            <div v-if="typeof recipe.recipeId ==='number'">
              <div class="bold">
                {{ recipe.likes }} <b-icon font-scale="1.5" icon="hand-thumbs-up" variant="primary"></b-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ul class="vertical-center">
        <img
          v-if="recipe.veganVegetarian == 'vegetarian'"
          src="../assets/Vegetarian.png"
          class="icon"
        />
        <img v-if="recipe.veganVegetarian == 'vegan'" src="../assets/vegan.jpg" class="icon" />
        <img v-if="recipe.glutenFree == true" src="../assets/gluten free.jpg" class="icon" />
      </ul>
    </div>
  </div>
</template>

<script>
import RecipePreviewAdditionalInfo from "./RecipePreviewAdditionalInfo";
import ImageAndTitle from "./ImageAndTitle";

export default {
  components: {
    RecipePreviewAdditionalInfo,
    ImageAndTitle
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}
.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
div.polaroid {
  width: 80%;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  display: block;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
div.container {
  text-align: center;
  padding: 10px 20px;
}
strong {
  position: relative;
  font-family: "Dosis", sans-serif;
  max-width: 800px;
  margin: 0 5% 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/664131/underline.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
.normal {
  font-family: "Dosis", sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: black;
}
.bold {
  font-family: "Dosis", sans-serif;
  font-size: 1.2rem;
  color: black;
  font-weight: 800;
}
.icon {
  width: 25%;
  height: auto;
}
.vertical-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.additionalInfoStyle{
    display: flex;
    justify-content: center;
}
</style>
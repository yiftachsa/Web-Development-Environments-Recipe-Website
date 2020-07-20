<template>
<div>
  <h3 class="toLeft title" >
      {{ title }}:
      <slot></slot>
    </h3>
  <b-container>
    <div v-for="(r,index) in recipes" :key="r.recipeId">
    <b-row v-if="index%3==0">
      <b-col v-for="(recipe) in recipes.slice(index,index+3)" :key="recipe.recipeId">
        <RecipePreview class="recipePreview" :recipe="recipe" />
      </b-col>
    </b-row>
    </div>
  </b-container>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}

.toLeft {
    float: left;
}

.title {
  font-family: Dosis, Helvetica, Arial, sans-serif;
    max-width: 800px;;
    font-size: 2.25rem;
    font-weight: 400;
}
</style>

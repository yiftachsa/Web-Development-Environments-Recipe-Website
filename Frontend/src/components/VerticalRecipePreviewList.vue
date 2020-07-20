<template>
<div>
  <h3 class="toLeft title" >
      {{ title }}:
      <slot></slot>
    </h3>
    <br>
    <br>
    <br>
    <br>
    <div v-for="recipe in recipes" :key="recipe.recipeId">
    <b-col>
      <b-row>
        <RecipePreview class="recipePreview" :recipe="recipe" />
      </b-row>
    </b-col>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
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

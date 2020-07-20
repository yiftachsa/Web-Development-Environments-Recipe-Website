<template>
  <div>
    <RecipeDisplay
      v-if="recipe != null"
      :recipe="recipe"
      recipeType="personal"
    />
  </div>
</template>

<script>
import RecipeDisplay from "../components/RecipeDisplay";

export default {
  components: {
    RecipeDisplay,
  },
  data() {
    return {
      recipe: null,
      componentKey: 0,
    };
  },
  async created() {
    try {
      let response_1;
      try {
        response_1 = await this.axios.get(
          `${this.$root.store.baseUrl}/user/myRecipes/recipeID/` +
            this.$route.params.recipeId,
          this.$route.params.recipeId,
          { withCredentials: true }
        );
        if (response_1.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response", error.response_1);
        this.$router.replace("/NotFound");
        return;
      }

      this.recipe = this.$root.store.extractRecipe(response_1);
      //add the recipe to the store
      this.$root.store.insertRecipe(this.recipe.recipeId, this.recipe);
      //add the preview to the store
      // this.$root.store.insertPreview(recipeId, response_1.data.preview);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>

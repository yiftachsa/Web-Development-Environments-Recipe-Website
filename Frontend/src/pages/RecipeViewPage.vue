<template>
  <div>
    <RecipeDisplay
      v-if="recipe != null"
      :recipe="recipe"
      :key="componentKey"
      recipeType="regular" v-on:updateSize="updateSize"
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
      recipePreview: null,
      componentKey: 0,
    };
  },

  async mounted() {
    try {
      let response_1;
      try {
        response_1 = await this.axios.get(
          `${this.$root.store.baseUrl}/recipes/recipeID/` +
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
      this.addToWatch();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addToWatch() {
      if ($cookies.get("session")) {
        try {
          let response = await this.axios.put(
            `${this.$root.store.baseUrl}/user/addToWatched/recipeID/${this.recipe.recipeId}`
          );
          this.forceRerender();
        } catch (error) {
          console.log(error);
        }
      }
    },
    forceRerender() {
      this.componentKey += 1;
    },
    updateSize()
    {
      this.$emit("updateSize");
    }
  },
};
</script>

<style></style>

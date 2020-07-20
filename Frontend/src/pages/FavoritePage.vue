<template>
  <div>
    <h1 class="title">My favorite recipes</h1>
    <div v-if="recipes.length != 0">
      <RecipePreviewList title="my favorites" :recipes="this.recipes" />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "FavoritePage",
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      if ($cookies.get("session")) {
        try {
          const response = await this.axios.get(
            `${this.$root.store.baseUrl}/user/favorites`
          );
          const registeredRecipes = response.data;
          this.recipes = [];
          for (let index = 0; index < registeredRecipes.length; index++) {
            this.recipes.push(this.mergePreview(registeredRecipes[index]));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    },
    mergePreview(registered_recipe) {
      let { preview, additionalInfo } = registered_recipe;
      preview.additionalInfo = additionalInfo;
      return preview;
    },
  },
};
</script>

<style></style>

<template>
  <div>
    <div v-if="(recipes.length != 0) & finishedRetrival">
      <VerticalRecipePreviewList :title="this.title" :recipes="this.recipes" />
    </div>
    <div class="va" v-else-if="finishedRetrival">
      You haven't watched any recipe yet
      <p class="summary">
        Check out those cool random recipes to the left or search for some
        recipes yourself.
      </p>
    </div>
    <div class="va" v-else>
      Retrieving last watched recipes
      <b-icon icon="arrow-clockwise" animation="spin" font-scale="4"></b-icon>
    </div>
  </div>
</template>

<script>
import VerticalRecipePreviewList from "./VerticalRecipePreviewList.vue";
export default {
  name: "RecipePreviewLastWatched",
  components: {
    VerticalRecipePreviewList,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
      finishedRetrival: false,
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          `${this.$root.store.baseUrl}/user/threeLastWatched`
        );
        const recipes = response.data;
        this.recipes = [];
        for (let index = 0; index < recipes.length; index++) {
          this.recipes.push(this.mergePreview(recipes[index]));
        }
        this.finishedRetrival = true;
      } catch (error) {
        console.log(error);
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

<style lang="scss" scoped>
.va {
  font-family: Dosis, Helvetica, Arial, sans-serif;
  max-width: 800px;
  font-size: 2.25rem;
  font-weight: 400;
}
.summary {
  font-family: "Dosis", sans-serif;
  font-size: 1.5rem;
  color: black;
  position: center;
}
</style>

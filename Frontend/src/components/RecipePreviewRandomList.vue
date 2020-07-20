<template>
  <div>
    <div v-if="recipes.length != 0">
      <VerticalRecipePreviewList :title="this.title" :recipes="this.recipes" />
    </div>
  </div>
</template>

<script>
import VerticalRecipePreviewList from "./VerticalRecipePreviewList.vue";
export default {
  name: "RecipePreviewRandomList",
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
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          `${this.$root.store.baseUrl}/recipes/preview/threeRandom`
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

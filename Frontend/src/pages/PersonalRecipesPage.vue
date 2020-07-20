<template>
  <div>
    <h1 class="title">Personal recipes</h1>
    <div v-if="recipes.length != 0">
      <RecipePreviewList title="my recipes" :recipes="this.recipes" />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "PersonalRecipes",
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
            `${this.$root.store.baseUrl}/user/myRecipes/previews`
          );
          const personalRecipes = response.data;
          this.recipes = [];
          for (let index = 0; index < personalRecipes.length; index++) {
            this.recipes.push(personalRecipes[index].preview);
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
  },
};
</script>

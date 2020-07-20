<template>
  <div class="layoutPage">
    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        v-model="slide"
        :interval="2000"
        controls
        indicators
        img-width="1024"
        img-height="480"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          v-for="recipe in recipes"
          :key="recipe.id"
          :img-src="recipe.preview.photo"
          class="carouselImage"
        >
          <a class="title" :href="'#' + recipe.preview.recipeId">
            <strong
              class="centerTitle"
              style="color: rgba(50, 171, 212, 0.822)"
              >{{ recipe.preview.title }}</strong
            >
          </a>
          <div class="normal">{{ recipe.summary }}</div>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div
      v-for="recipe in recipes"
      :key="recipe.id"
      :id="recipe.preview.recipeId"
    >
      <RecipeDisplay :recipe="recipeToDisplay(recipe)" recipeType="family" />
    </div>
  </div>
</template>

<script>
import RecipeDisplay from "../components/RecipeDisplay";

export default {
  name: "FamilyPage",
  components: {
    RecipeDisplay,
    // RecipePreview,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    recipeToDisplay(recipe) {
      let response = {};
      response.data = recipe;
      let recipeDetails = this.$root.store.extractRecipe(response);

      //add the preview to the store
      // this.$root.store.insertPreview(recipe.preview.recipeId, recipe.preview);
      //add the recipe to the store
      this.$root.store.insertRecipe(recipeDetails.recipeId, recipeDetails);
      return recipeDetails;
    },
    async updateRecipes() {
      if ($cookies.get("session")) {
        try {
          const response = await this.axios.get(
            `${this.$root.store.baseUrl}/user/familyRecipes/all`
          );
          const familyRecipes = response.data;
          this.recipes = [];
          this.recipes.push(...familyRecipes);
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.carouselImage {
  max-height: 480px;
  object-fit: cover;
}

.layoutPage {
  margin-right: 0px;
  margin-left: 0px;
}
.normal {
  font-family: "Dosis", sans-serif;
  font-size: 1.2rem;
  color: whitesmoke;
  text-shadow: -1px 1px 1px black;
  border-radius: 25px;
}
</style>

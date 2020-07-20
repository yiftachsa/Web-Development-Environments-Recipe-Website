<template>
  <div class="text">
    <!-- <RecipePreview v-if="recipePreview != null" :recipe="recipePreview" class="recipePreview" /> -->
    <b-container v-if="recipe">
      <h3 class="title">Cooking instructions:</h3>
      <ImageAndTitlePageDisplay class="imageAndtitle" :photo="recipe.photo" :title="recipe.title" />
    </b-container>
    <b-container v-if="recipe">
      <Ingredients
        class="textBold"
        :scale="true"
        :yeild="recipe.yeild"
        :ingredients="recipe.ingredients"
      />
    </b-container>

    <RecipePrep
      class="text"
      v-if="detailedInstructions != null"
      :detailedInstructions="detailedInstructions"
      :previousProgress="getProgress()"
      :recipeId="recipeId"
      @progress-changed="updateProgress"
    />
  </div>
</template>

<script>
import RecipePrep from "./RecipePrep";
import ImageAndTitlePageDisplay from "./ImageAndTitlePageDisplay";
import Ingredients from "./Ingredients";
export default {
  components: {
    RecipePrep,
    ImageAndTitlePageDisplay,
    Ingredients
  },
  props: {
    recipeId: {
      required: true
    },
    recipeProp: {
      type: Object,
      required: false
    },
    recipeType: {
      type: String,
      required: true
    },
    added: {
      type: Boolean
    }
  },
  data() {
    return {
      detailedInstructions: null,
      recipe: null
    };
  },
  async mounted() {
    await this.getRecipeDetails();
  },
  methods: {
    async getRecipeDetails() {
      try {
        let promises = [];
        if ((this.recipeType == "personal") | (this.recipeType == "family")) {
          if (!$cookies.get("session")) {
            this.$router.push("/").catch(() => {
              this.$forceUpdate();
            });
            return;
          }
          //checking the type of recipe
          if (this.recipeType == "personal") {
            promises = this.UserRecipeDetails();
          } else {
            promises = this.FamilyRecipeDetails();
          }
        } else {
          promises = this.RecipeDetails();
        }
        let responseContainsRecipe = false;
        if (promises.length == 2) {
          responseContainsRecipe = true;
        }
        let responses = await Promise.all(promises);
        this.detailedInstructions = responses[0].data;
        if (responseContainsRecipe) {
          this.recipe = this.$root.store.extractRecipe(responses[1]);
        } else {
          this.recipe = this.recipeProp;
        }
        if ($cookies.get("session")) {
          this.$emit("updateSize");
        }
      } catch (error) {
        console.log("error ", error);
        this.$router.replace("/NotFound");
        return;
      }
    },
    RecipeDetails() {
      let promises = [];
      promises.push(
        this.axios.get(
          `${this.$root.store.baseUrl}/recipes/detailedInstructions/recipeID/${this.recipeId}`
        )
      );
      if (!this.recipeProp) {
        promises.push(
          this.axios.get(
            `${this.$root.store.baseUrl}/recipes/recipeID/${this.recipeId}`
          )
        );
      }
      return promises;
    },
    UserRecipeDetails() {
      let promises = [];
      promises.push(
        this.axios.get(
          `${this.$root.store.baseUrl}/user/myRecipes/detailedInstructions/recipeID/${this.recipeId}`
        )
      );
      if (!this.recipeProp) {
        promises.push(
          this.axios.get(
            `${this.$root.store.baseUrl}/user/myRecipes/recipeID/${this.recipeId}`
          )
        );
      }
      return promises;
    },
    FamilyRecipeDetails() {
      let promises = [];
      promises.push(
        this.axios.get(
          `${this.$root.store.baseUrl}/user/familyRecipes/detailedInstructions/recipeID/${this.recipeId}`
        )
      );
      if (!this.recipeProp) {
        promises.push(
          this.axios.get(
            `${this.$root.store.baseUrl}/user/familyRecipes/recipeID/${this.recipeId}`
          )
        );
      }
      return promises;
    },
    updateProgress(progressInfo) {
      if ($cookies.get("session")) {
        this.$root.store.updateProgress(this.recipeId, progressInfo);
      }
    },
    getProgress() {
      return this.$root.store.getProgress(this.recipeId);
    }
  }
};
</script>

<style>
.imageAndtitle {
  font-family: Dosis, Helvetica, Arial, sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
}

.text {
  font-family: Dosis, Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
}

.textBold {
  font-weight: 450;
  font-size: 1.65rem;
}
</style>

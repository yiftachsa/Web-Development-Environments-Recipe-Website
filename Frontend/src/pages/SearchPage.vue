<template >
  <div>
    <div class="container">
      <div>
        <br />
        <br />
        <div class="search">
          <b-form-input v-model="text" placeholder="Recipe search"></b-form-input>
          <b-dropdown :text="'Number of recipes: '+this.numberOfRecipes" variant="info">
            <b-dropdown-item @click="changeNumberOfRecipes(5)">Number of recipes: 5</b-dropdown-item>
            <b-dropdown-item @click="changeNumberOfRecipes(10)">Number of recipes: 10</b-dropdown-item>
            <b-dropdown-item @click="changeNumberOfRecipes(15)">Number of recipes: 15</b-dropdown-item>
          </b-dropdown>
          <div>
            <b-button
              class="searchButton"
              variant="outline-secondary"
              @click="updateRecipes(text) "
            >
              <b-icon icon="search"></b-icon>Search
            </b-button>
          </div>
        </div>
      </div>
      <br />
      <div class="filter">
        <b-dropdown :text="this.chosenCuisine" variant="info">
          <b-dropdown-item value="Cuisine" @click="changeCuisine('Cuisine')">Cuisine</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            v-for="iterator in this.cuisines"
            :key="iterator"
            :value="iterator"
            @click="changeCuisine(iterator)"
          >{{iterator}}</b-dropdown-item>
        </b-dropdown>
      </div>

      <div class="filter">
        <b-dropdown :text="this.chosenDiet" variant="info">
          <b-dropdown-item value="Diet" @click="changeDiet('Diet')">Diet</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            v-for="iterator in this.diets"
            :key="iterator"
            :value="iterator"
            @click="changeDiet(iterator)"
          >{{iterator}}</b-dropdown-item>
        </b-dropdown>
      </div>

      <div class="filter">
        <b-dropdown :text="chosenIntolerance" variant="info">
          <b-dropdown-item value="intolerance" @click="changeIntolerance('intolerance')">intolerance</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item
            v-for="iterator in this.intolerances"
            :key="iterator"
            :value="iterator"
            @click="changeIntolerance(iterator)"
          >{{iterator}}</b-dropdown-item>
        </b-dropdown>
      </div>
      <br />
    </div>
    <br />
    <div v-if="recipes.length!=0" class="bigContainer">
      <SortRecipes v-on:timeSort="timeSort" v-on:likesSort="likesSort" :key="recipes[0].title" />
      <RecipePreviewList title="Recipes" :recipes="this.recipes" />
    </div>
    <div v-if="recipeNotFound">
      <br />
      <br />
      <br />
      <b-alert show dismissible fade>No recipe found</b-alert>
    </div>
    <br />
    <br />
    <br />
    <FoodSigns />
  </div>
</template>


<script>
import Cuisines from "@/assets/Cuisines.js";
import Diets from "@/assets/Diets.js";
import Intolerances from "@/assets/intolerances.js";
import RecipePreviewList from "../components/RecipePreviewList";
import FoodSigns from "../components/FoodSigns";
import SortRecipes from "../components/SortRecipes";

export default {
  components: {
    RecipePreviewList,
    FoodSigns,
    SortRecipes
  },
  data() {
    return {
      text: "",
      cuisines: [],
      diets: [],
      intolerances: [],
      chosenCuisine: "Cuisine",
      chosenDiet: "Diet",
      chosenIntolerance: "intolerance",
      numberOfRecipes: 5,
      recipes: [],
      recipeNotFound: false
    };
  },
  mounted() {
    this.cuisines.push(...Cuisines);
    this.diets.push(...Diets);
    this.intolerances.push(...Intolerances);
    if(this.$root.store.query)
    {
      let lastQuery = JSON.parse(this.$root.store.query);
      this.text = lastQuery.query;
      this.numberOfRecipes = lastQuery.NumberResult;
      this.chosenCuisine = lastQuery.Cuisines;
      this.chosenDiet = lastQuery.Diet;
      this.chosenIntolerance = lastQuery.Intolerance
      let recipes = JSON.parse(this.$root.store.getLastSearchRecipes());
      if(recipes != undefined)
      {
        this.recipes = recipes;
      }
    }

  },
  methods: {
    timeSort() {
      this.recipes.sort(function(a, b) {
        return a.time - b.time;
      });
    },
    likesSort() {
      this.recipes.sort(function(a, b) {
        return b.likes - a.likes;
      });
    },
    changeNumberOfRecipes(number) {
      this.numberOfRecipes = number;
    },
    changeCuisine(iterator) {
      this.chosenCuisine = iterator;
    },
    changeDiet(iterator) {
      this.chosenDiet = iterator;
    },
    changeIntolerance(iterator) {
      this.chosenIntolerance = iterator;
    },
    async updateRecipes(query) {
      try {
        this.recipeNotFound = false;
        let cuisine = this.chosenCuisine != "Cuisine" ? this.chosenCuisine : "";
        let diet = this.chosenDiet != "Diet" ? this.chosenDiet : "";
        let intolerance =
          this.chosenIntolerance != "intolerance" ? this.chosenIntolerance : "";
        const response = await this.axios.get(
          `${this.$root.store.baseUrl}/recipes/search/userSearchQuery/` +
            query +
            "/amount/" +
            this.numberOfRecipes,
          {
            params: {
              cuisine: cuisine,
              diet: diet,
              intolerances: intolerance
            }
          }
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        if (this.recipes.length == 0) {
          this.recipeNotFound = true;
        }
        else if($cookies.get('session'))
        {
          let queryWithFilter={
            query:query,
            Cuisines: this.chosenCuisine,
            Diet: this.chosenDiet,
            Intolerance : this.chosenIntolerance,
            NumberResult: this.numberOfRecipes
          }
          this.$root.store.saveLastQuery(queryWithFilter);
          this.$root.store.saveSearchRecipes(this.recipes);
        }

      } catch (error) {
        console.log(error);
      }
      this.chosenCuisine = "Cuisine";
      this.chosenDiet = "Diet";
      this.chosenIntolerance = "intolerance";
    }
  }
};
</script>


<style lang="scss" scoped>
.search {
  width: 80%;
  display: inline-flex;
}

.searchButton {
  display: inline-flex;
}

.filter {
  display: inline-block;
  margin-right: 10px;
}

.container {
  max-width: 1200px;
}

.bigContainer {
  margin: auto;
  width: 80%;
  max-width: 1200px;
}
</style>
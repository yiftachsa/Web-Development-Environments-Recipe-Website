<template>
  <div class="textStyle">
    <h1 class="title">My Meal</h1>
    <br />
    <br />
    <div v-if="noMealPlan">
      <br />
      <b-alert show dismissible fade>No recipes in meal plan</b-alert>
    </div>
    <draggable v-else v-model="recipes" ghost-class="ghost" @end="onEnd">
      <transition-group type="transition" name="flip-list">
        <div
          class="sortable"
          :id="element.recipeId"
          v-for="(element,counter) in recipes"
          :key="element.recipeId"
        >
          <RemoveMealRecipe
            :recipe="element.recipeId"
            v-on:recipe-removed="updateRecipesAfterRemove"
          />

          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <router-link
                :to="{
                name: 'prepare-recipe',
                params: { recipeId: element.recipeId, type: recipeType },
               }"
              >
                <b-col md="2.5">
                  <b-card-img :src="element.photo" alt="Image" class="rounded-0 imgStyle"></b-card-img>
                </b-col>
              </router-link>
              <b-col md="6">
                <b-card-body :title="element.title">
                  <b-card-text>
                    {{counter+1}}
                    <RecipeProgress :recipe="element.recipeId" />
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>

          <span class="right"></span>
        </div>
      </transition-group>
    </draggable>
    <RemoveAllMeal v-if="noMealPlan == false" v-on:recipes-clear="clearData" />
    <!-- <VerticalRecipePreview :recipes="recipes" v-on:Clear-Recipes="clearAllRecipes" /> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import RemoveMealRecipe from "../components/RemoveMealRecipe";
import RemoveAllMeal from "../components/RemoveAllMeal.vue";
import RecipeProgress from "../components/recipeProgress";

export default {
  name: "MyMealPage",
  components: {
    //VerticalRecipePreview,
    draggable,
    RemoveMealRecipe,
    RemoveAllMeal,
    RecipeProgress
  },
  data() {
    return {
      recipes: [],
      oldIndex: "",
      newIndex: "",
      noMealPlan: false,
      recipeType: "Number"
    };
  },
  async mounted() {
    if(this.$root.store.getMyMeal()!=undefined)
    {
      this.recipes = this.$root.store.getMyMeal();
      let size = await this.size()
      if(this.recipes.length != size)
      {
        this.updateRecipes();
      }
    }
    else
    {
      this.updateRecipes();

    }
  },

  methods: {
    async size()
    {
      if ($cookies.get("session")) {
        try {
          const response = await this.axios.get(
            `${this.$root.store.baseUrl}/user/mealPlan/getMealPlanSize`
          );
          const mealSize = response.data;
          return mealSize.size;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    },
    async updateRecipes() {
      if ($cookies.get("session")) {
        try {
          const response = await this.axios.get(
            `${this.$root.store.baseUrl}/user/mealPlan/getMealPlan`
          );
          const recipesDetails = response.data;
          this.recipes = [];
          this.recipesDetails = [];
          let recipes = [];
          for (let index = 0; index < recipesDetails.length; index++) {
            recipes.push(
              this.axios.get(
                `${this.$root.store.baseUrl}/recipes/preview/simplePreview/recipeID/${recipesDetails[index].recipe_id}`
              )
            );
          }
          if (recipesDetails.length == 0) {
            this.noMealPlan = true;
          }
          let recipesAfter = [];
          await Promise.all(recipes).then(values => {
            recipesAfter.push(...values);
          });
          let recipesAfterLoad = [];

          for (let index = 0; index < recipesAfter.length; index++) {
            recipesAfterLoad.push(recipesAfter[index].data);
          }
          let orderdRecipes = [];
          for (let index = 1; index <= recipesAfterLoad.length; index++) {
            let position = recipesDetails.find(
              element => element.position == index
            ).recipe_id;

            orderdRecipes.push(
              recipesAfterLoad.find(element => element.recipeId === position)
            );
          }

          this.recipes.push(...orderdRecipes);
          this.$root.store.saveMyMeal(this.recipes);

        } catch (error) {
          console.log(error);
        }
      } else {
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    },
    clearData() {
      this.recipes = [];
      this.$emit("updateSize");
    },
    async updateOrder() {
      let reorderRecipes = [];
      for (let index = 0; index < this.recipes.length; index++) {
        let recipeId = this.recipes[index].recipeId;
        let recipeOrderInfo = {
          position: index + 1,
          recipe_id: recipeId
        };
        reorderRecipes.push(recipeOrderInfo);
      }
      let request = JSON.stringify(reorderRecipes);
      if ($cookies.get("session")) {
        const response = await this.axios.put(
          `${this.$root.store.baseUrl}/user/mealPlan/reorder/recipesNewOrder`,
          reorderRecipes
        );
      this.$root.store.saveMyMeal(this.recipes);
      } else {
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
      // },
    },
    updateRecipesAfterRemove(recipeId) {
      let recipeIndexToRemove = this.recipes.find(
        element => element.recipeId === recipeId
      );
      let idx = this.recipes.indexOf(recipeIndexToRemove);
      this.recipes.splice(idx, 1);
      this.$emit("updateSize");
    },
    onEnd: async function(evt) {
      this.oldIndex = evt.oldIndex;
      this.newIndex = evt.newIndex;

      await this.updateOrder();
    }
  }
};
</script>


<style>
.sortable {
  width: 100%;
  background: rgb(231, 231, 231);
  padding: 1em;
  border-radius: 5px;
  cursor: move;
  margin-bottom: 3px;
}

.flip-list-move {
  transition: transform 0.5s;
}
.right {
  float: right;
}

.ghost {
  border-left: 6px solid rgb(0, 183, 255);
  box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);
  opacity: 0.7;
}
.hello .sortable-drag {
  opacity: 0;
}

.imgStyle {
  /* border: 1px solid rgba(74, 75, 75, 0.5);
  padding: 5px;
  width: 150px; */
  border-radius: 10px;
  cursor: pointer;
  width: 220px;
}

.imgStyle:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);

}
.textStyle {
  font-family: Dosis, Helvetica, Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
}
</style>
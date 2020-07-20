<template>
<div>

  <div >
      <h1 class="title">Main Page</h1>
      <b-container>
      <b-row>
        <b-col>
    <RecipePreviewRandomList title="Explore these recipes" class="RandomRecipes" :key="randRecipes" />
    <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    {{ $root.store.username }} -->
    <randomRecipesButton  v-on:updateRandom="updateRandom"/>
    </b-col>
    <b-col>

    <div :key="componentKey">
    <div v-if="$cookies.get('session')">
    <RecipePreviewLastWatched title="Last watched recipes" class="RandomRecipes" v-if="$cookies.get('session')"/>
    </div>
    <div v-else>
      <br>
      <br>
      <br>
      <br>
      <br>
      <LoginForm v-on:updateSize="updateSize" class="loginForm" v-on:rerenderLogout="render"/>
    </div>
    </div>
    </b-col>
      </b-row>
        </b-container>
  </div>


<br>
<br>
<br>
<br>
  <FoodSigns/>
  </div>
</template>

<script>
import RecipePreviewRandomList from "../components/RecipePreviewRandomList";
import RecipePreviewLastWatched from "../components/RecipePreviewLastWatched";
import FoodSigns from "../components/FoodSigns";
import LoginForm from "../components/LoginForm";
import randomRecipesButton from "../components/randomRecipesButton"

export default {
  components: {
    RecipePreviewRandomList,
    FoodSigns,
    RecipePreviewLastWatched,
    LoginForm,
    randomRecipesButton
  },
    data() {
    return {
      randRecipes: 100000,
      componentKey: 0
    };
  },
  methods: {
    render()
    {
      this.componentKey += 1;
      this.$emit("rerenderLogout")
    },
    updateRandom()
    {
      this.randRecipes+= 1;
    },
    updateSize()
    {
        this.$emit("updateSize");
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.loginForm {
  max-width: 400px;
}

.layoutPage{
    margin-right: 20px;
    margin-left: 20px;
}
</style>
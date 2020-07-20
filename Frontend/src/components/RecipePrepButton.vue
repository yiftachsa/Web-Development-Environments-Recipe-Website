<template>
  <div @click="addRecipe">
    <router-link
      :to="{
        name: 'prepare-recipe',
        params: { recipeId: recipeId, type: recipeType },
      }"
    >
      <b-icon icon="receipt" aria-hidden="true"></b-icon>Cook this recipe
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    recipeId: {
      required: true,
    },
    recipeType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async addRecipe() {
      if ($cookies.get("session") && (this.recipeType == "regular")) {
        try {
          const response = await this.axios.put(
            `${this.$root.store.baseUrl}/user/mealPlan/addRecipe/recipeID/${this.recipeId}`
          );
          let responseStatus = response.status;
          if (responseStatus == 200) {
            this.$emit("updateSize");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

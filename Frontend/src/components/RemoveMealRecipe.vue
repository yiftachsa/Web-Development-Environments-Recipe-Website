<template>
  <div>
    <b-icon
      icon="x-circle"
      style="float: right"
      class="point"
      @click="remove"
    ></b-icon>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async remove() {
      if ($cookies.get("session")) {
        try {
          const response = await this.axios.put(
            `${this.$root.store.baseUrl}/user/mealPlan/removeRecipe/recipeID/${this.recipe}`
          );
          this.$emit("recipe-removed", this.recipe);
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
<style>
.point {
  cursor: pointer;
}
</style>

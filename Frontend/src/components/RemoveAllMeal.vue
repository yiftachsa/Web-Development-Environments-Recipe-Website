<template>
  <div>
    <b-button variant="outline-info" @click="remove">
      remove all recipes from meal
    </b-button>
  </div>
</template>>

<script>
export default {

  methods: {
    async remove() {
      if ($cookies.get("session")) {
        try {
          const response = await this.axios.put(
            `${this.$root.store.baseUrl}/user/mealPlan/clear`
          );
          this.$emit("recipes-clear");
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  }
};
</script>>
<style>
</style>
<template>
  <div>
    <br />
    <RecipeCooking
      :recipeId="recipeId"
      :recipeProp="recipe"
      :recipeType="type"
      v-on:RecipeCooking="updateSize"
    />
  </div>
</template>

<script>
import RecipeCooking from "../components/RecipeCooking";
export default {
  name: "PrepareRecipe",
  components: {
    RecipeCooking,
  },
  data() {
    return {
      recipeId: this.$route.params.recipeId,
      type: this.$route.params.type,
    };
  },
  mounted() {
    this.$emit("updateSize");
  },
  computed: {
    recipe() {
      //check in store if the preview exists
      if (this.$root.store.getPreLoadedRecipe(this.recipeId)) {
        return this.$root.store.getPreLoadedRecipe(this.recipeId);
      }
      return undefined;
    },
  },
  methods: {
    updateSize() {
      if ($cookies.get("session")) {
        this.$emit("updateSize");
      }
    },
  },
};
</script>

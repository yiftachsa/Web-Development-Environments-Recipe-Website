<template>
  <div>
    <ProgressAlert v-if="clicked" :message="message" :key="counter" />
    <b-button pill variant="info" @click="this.addRecipe">
      <b-icon icon="file-earmark-plus" />Add Recipe To My Meal
    </b-button>
  </div>
</template>

<script>
import ProgressAlert from "./ProgressAlert";

export default {
  components: {
    ProgressAlert,
  },
  props: {
    recipe: {
      type: Number,
      require: true,
    },
    recipeType: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      clicked: false,
      message: "",
      counter: 0,
    };
  },

  methods: {
    async addRecipe() {
      if ($cookies.get("session")) {
        try {
          const response = await this.axios.put(
            `${this.$root.store.baseUrl}/user/mealPlan/addRecipe/recipeID/${this.recipe}`
          );
          if (response.status == 200) {
            //added
            this.counter++;
            this.message = "recipe is being added to meal plan";
            this.clicked = true;
            this.$emit("updateSize");
          } else {
            console.log(error);
          }
        } catch (error) {
          let toString = error + "";
          if (toString.includes("409")) {
            //already in meal
            this.counter++;
            this.message = "recipe already in meal plan";
            this.clicked = true;
          } else {
            console.log(error);
          }
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
>

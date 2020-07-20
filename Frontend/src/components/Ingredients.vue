<template>
  <div>
    <b>Ingredients:</b>
    <div v-if="!scale">
      <ul>
        <li v-for="(r, index) in this.ingredients" :key="index + '_' + r.id">
          {{ ingredientDisplay(r) }}
        </li>
      </ul>
    </div>
    <div v-else>
      <b-input-group prepend="Portions" class="center-width">
        <b-form-input
          type="number"
          min="0.1"
          :value="placeholder"
          :placeholder="placeholder"
          @input="scaleChanged"
        >
        </b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="reset">Reset</b-button>
          <b-button variant="info" @click="double">Double</b-button>
        </b-input-group-append>
      </b-input-group>
      <ul>
        <li v-for="(r, index) in this.ingredients" :key="index + '_' + r.id">
          {{ ingredientDisplay(r) }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    scale: {
      type: Boolean,
      default: false,
    },
    yeild: {
      type: Number,
      required: false,
    },
  },
  mounted() {
    this.portions = this.yeild;
  },
  data() {
    return {
      portions: 0,
    };
  },
  computed: {
    placeholder: function() {
      return "" + this.portions;
    },
    multiply: function() {
      return this.portions / this.yeild;
    },
  },
  methods: {
    scaleChanged(value) {
      this.portions = parseInt(value);
    },
    ingredientDisplay(ingredient) {
      let amount;
      if (this.scale) {
        amount = ingredient.amount * this.multiply;
      } else {
        amount = ingredient.amount;
      }
      return `${amount} ${ingredient.unit} ${ingredient.name}`;
    },
    double() {
      this.portions = this.portions * 2;
    },
    reset() {
      if (this.scale) {
        this.portions = this.yeild;
      } else {
        this.portions = 1;
      }
    },
  },
};
</script>

<style>
.center-width {
  margin-left: 0ptx;
  margin-right: auto;
  width: 50%;
}
</style>

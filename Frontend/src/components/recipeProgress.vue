<template>
  <b-progress v-if="updateProgressBar()" :max="max" animated>
    <b-progress-bar :value="value" :label="`${value} steps of ${max} completed`"></b-progress-bar>
  </b-progress>
</template>

<script>
export default {
  data(){
    return{
      value: 0,
      max: 0
    }
  },
  props:{
    recipe:
    {
      type:Number,
      required:true
    }
  },

  methods:{
    updateProgressBar() {
      this.max = this.$root.store.getNumberOfInstruction(this.recipe);
      this.value = this.$root.store.getProgressInteger(this.recipe);
      return true;
    }
  }
  
}
</script>>
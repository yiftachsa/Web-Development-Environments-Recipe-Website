<template>
  <div>
    <b-container>
      <div class="textBold">
        number Of Steps {{ numberOfSteps }} progress {{ progress }} finished
        {{ finished }}
      </div>
      <b-progress :max="numberOfSteps" animated>
        <b-progress-bar
          :value="progress"
          :label="`${progress} steps of ${numberOfSteps} completed`"
          v-if="!finished"
        ></b-progress-bar>
        <b-progress-bar
          :value="progress"
          label="Enjoy your meal"
          v-else
        ></b-progress-bar>
      </b-progress>
      <h5>check every step you complete to track your progress</h5>
      <div v-for="detailedIns in detailedInstructions" :key="detailedIns.id">
        <b-card v-for="step in detailedIns.steps" :key="step.id">
          <input
            type="checkbox"
            :id="'checkBox' + step.number"
            @click="checked(step)"
          />

          {{ step.number }})

          {{ step.step }}
          <div v-if="step.step_equipment.length > 0">
            <strong class="bold">Equipment:</strong>
            <ul>
              <li v-for="equipment in step.step_equipment" :key="equipment.id">
                {{ equipment }}
              </li>
            </ul>
          </div>
          <div v-if="step.step_ingredients.length > 0">
            <strong class="bold">Ingredients:</strong>
            <ul>
              <li
                v-for="ingredient in step.step_ingredients"
                :key="ingredient.id"
              >
                {{ ingredient }}
              </li>
            </ul>
          </div>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    detailedInstructions: {
      type: Array,
      requierd: true,
    },
    previousProgress: {
      type: Object,
      requierd: false,
    },
    recipeId: {
      required: true,
    },
  },
  data() {
    return {
      progress: 0,
    };
  },
  computed: {
    numberOfSteps() {
      let count = 0;
      for (let i = 0; i < this.detailedInstructions.length; i++) {
        for (let j = 0; j < this.detailedInstructions[i].steps.length; j++) {
          count++;
        }
      }
      if ($cookies.get("session")) {
        this.$root.store.updateNumberOfInstructions(this.recipeId, count);
        if (!this.$root.store.isAlreadyProgress(this.recipeId)) {
          this.$root.store.updateIntegerProgress(this.recipeId, 0);
        }
      }
      return count;
    },
    finished() {
      if (this.progress < this.numberOfSteps) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.initProgress();
  },
  methods: {
    initProgress() {
      let currentProgress = 0;
      if (this.previousProgress) {
        for (const [key, value] of Object.entries(this.previousProgress)) {
          let checkBox = document.getElementById(`checkBox${key}`); //key is stepNumber
          checkBox.checked = value; //value is isChecked
          if (value) {
            currentProgress++;
          }
        }
      }
      this.progress = currentProgress;
    },
    checked(checkBoxStep) {
      let checkBox = document.getElementById(`checkBox${checkBoxStep.number}`);
      if (checkBox.checked == true) {
        this.progress++;
        this.$root.store.updateIntegerProgress(this.recipeId, this.progress);
      } else {
        this.progress--;
        this.$root.store.updateIntegerProgress(this.recipeId, this.progress);
      }
      let progressInfo = {
        stepNumber: checkBoxStep.number,
        isChecked: checkBox.checked,
      };
      this.$emit("progress-changed", progressInfo);
    },
  },
};
</script>

<style>
.bold {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>

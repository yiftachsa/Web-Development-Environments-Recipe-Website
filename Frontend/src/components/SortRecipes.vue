<template>
  <div>
    <b-dropdown
      split
      split-variant="outline-info"
      variant="info"
      :text="text"
      class="m-2"
    >
      <b-dropdown-item @click="timeSort">Preparation time</b-dropdown-item>
      <b-dropdown-item @click="likesSort">Likes</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "Sort",
    };
  },
  methods: {
    timeSort() {
      this.text = "Preparation time";
      this.$emit("timeSort");
    },
    likesSort() {
      this.text = "Likes";
      this.$emit("likesSort");
    },
  },
};
</script>
>

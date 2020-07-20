<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <LoginForm v-on:updateSize="updateSize" v-on:rerenderLogout="rerenderLogout"/>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm,
  },
  methods:
  {
    rerenderLogout(){
      this.$emit("rerenderLogout")
    },
     updateSize()
    {
        this.$emit("updateSize");
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>

<template>
   <b-button variant="outline-light" class="mb-2" @click="Logout">
      <b-icon icon="power" aria-hidden="true"></b-icon> Logout
    </b-button>
</template>

<script>
export default {
  methods: {
    async Logout() {
      this.$root.store.logout();
      const response = await this.axios.post(
        `${this.$root.store.baseUrl}/logout`
      );
      this.$cookies.remove("session");
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$emit("logoutEvent");
      this.$forceUpdate();
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

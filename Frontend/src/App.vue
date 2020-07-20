<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Dosis"
      rel="stylesheet"
    />
    <div>
      <NavBar
        class="navbar"
        v-on:rerenderLogin="forceRerenderLogout"
        :key="logoutKey"
        :size="size"
      />
    </div>
    <router-view
      class="layoutPage"
      v-on:updateSize="updateSize"
      v-on:rerenderLogout="forceRerenderLogout"
      :key="logoutKey"
    />
    <footer class="normal">
      <p>
        <strong> Authors:</strong> Yiftach And Merav
        <br />
        <strong> Contact us: </strong>
        <a href="mailto:shmera@post.bgu.ac.il">Merav Shaked</a>
        ,
        <a href="mailto:yiftachs@post.bgu.ac.il">Yiftach Savransky</a>
      </p>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      loginKey: 0,
      logoutKey: 0,
      size: "0",
    };
  },
  watch: {
    $route: function(to, from) {
      this.forceRerenderLogout();
      if (!this.$cookies.get("session")) {
        this.$root.store.logout();
      } else {
        this.updateSize();
      }
    },
  },
  mounted() {
    this.updateSize();
  },
  methods: {
    forceRerenderLogin() {
      this.loginKey += 1;
    },
    forceRerenderLogout() {
      this.logoutKey += 1;
    },
    async updateSize() {
      if ($cookies.get("session")) {
        try {
          const response = await this.axios.get(
            `${this.$root.store.baseUrl}/user/mealPlan/getMealPlanSize`
          );
          const mealSize = response.data;
          this.size = mealSize.size + "";
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.title {
  font-family: Dosis, Helvetica, Arial, sans-serif;
  max-width: 1000px;
  font-size: 2.5rem;
  font-weight: 800;
}

.navbar {
  font-family: Dosis, Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.icon {
  width: 5%;
  height: auto;
}

.layoutPage {
  margin-right: 20px;
  margin-left: 20px;
}
</style>

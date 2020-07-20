<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item router-link :to="{ name: 'main' }">Recipes</b-nav-item>
        <b-nav-item router-link :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item router-link :to="{ name: 'about' }">About us</b-nav-item>

      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="!$cookies.get('session')">
        <b-navbar-brand>hello guest</b-navbar-brand>
        <b-button variant="outline-light" class="mb-2" router-link :to="{ name: 'register' }">
          <b-icon icon="person-plus" aria-hidden="true"></b-icon>Register
        </b-button>
        <b-nav-item />
        <b-button variant="outline-light" class="mb-2" router-link :to="{ name: 'login' }">
          <b-icon icon="person-fill" aria-hidden="true"></b-icon>Login
        </b-button>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <!-- AVATAR -->
        <b-navbar-brand>{{ JSON.parse($root.store.username) }}:</b-navbar-brand>
            <b-avatar size="3rem" :src="JSON.parse($root.store.photo)"></b-avatar>
        <b-nav-item-dropdown text="Personal" class="dropDown" right>
          <b-dropdown-item router-link :to="{ name: 'favorite' }">Favorites</b-dropdown-item>
          <b-dropdown-item router-link :to="{ name: 'personal-recipes' }">My recipes</b-dropdown-item>
          <b-dropdown-item router-link :to="{ name: 'family-recipes' }">Family recipes</b-dropdown-item>
          <b-dropdown-item router-link :to="{ name: 'my-meal' }">
            My Meal
            <b-icon icon="basket-fill" style="margin-left:5%"></b-icon>
                  <b-avatar size="1.35rem" style="margin-left:20%" button variant="info" :text="size" class="align-baseline" ></b-avatar>

          </b-dropdown-item>
        </b-nav-item-dropdown>

        <LogoutButton variant="outline-light" @logoutEvent="refresh" />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>>

<script>
import LogoutButton from "../components/LogoutButton";

export default {
  name: "NavBar",
  components: {
    LogoutButton
  },
  props:{
    size:{
      type: String
    }
  },
  data() {
    return {
    };
  },
  methods: {
    refresh() {
      this.$forceUpdate();
      this.$emit("rerenderLogin");
    },

  }
};

</script>
<style>
.dropDown {
  font-family: "Dosis", sans-serif;
  font-size: 1.5rem;
  color: white;
}
</style>>
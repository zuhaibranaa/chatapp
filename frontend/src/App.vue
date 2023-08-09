<template>
  <nav>
    <router-link to="/">Home | </router-link>
    <router-link v-if="!authToken" to="/login">Login | </router-link>
    <router-link v-if="!authToken" to="/register">Register | </router-link>
    <router-link to="/about">About | </router-link>
    <router-link v-if="authToken" to="/dashboard">Dashboard</router-link>
  </nav>
  <router-view />
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["authToken"]),
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

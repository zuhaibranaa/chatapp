<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Photos</v-app-bar-title>
      <router-link to="/">Home</router-link>
      <router-link v-if="!authToken" to="/login">Login</router-link>
      <router-link v-if="!authToken" to="/register">Register</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="authToken" to="/dashboard">Dashboard</router-link>

      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["authToken"]),
  },
};
</script>
<style></style>

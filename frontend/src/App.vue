<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Chat App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="navigateTo('/')">Home</v-btn>
      <v-btn text v-if="!authToken" @click="navigateTo('/login')">Login</v-btn>
      <v-btn text v-if="!authToken" @click="navigateTo('/register')"
        >Register</v-btn
      >
      <v-btn text @click="navigateTo('/about')">About</v-btn>
      <v-btn text v-if="authToken" @click="navigateTo('/dashboard')"
        >Dashboard</v-btn
      >

      <template v-slot:append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn
                  prepend-icon="mdi-logout"
                  @click="doLogout"
                  variant="plain"
                >
                  Logout
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item @click="navigateTo('/home')">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('/about')">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('/services')">
          <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Services</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateTo('/contact')">
          <v-list-item-icon>
            <v-icon>mdi-email</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="openLoginDialog">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapGetters(["authToken"]),
  },
  methods: {
    ...mapActions({ logoutAction: "logoutAction" }),
    doLogout() {
      this.logoutAction();
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

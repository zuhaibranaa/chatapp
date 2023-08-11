import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from "socket.io-client";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const socket = io("http://localhost:3000");
const SocketPlugin = {
  install(Vue) {
    Vue.config.globalProperties.$socket = socket;
  },
};
const savedState = JSON.parse(localStorage.getItem("vuexState"));

if (savedState) {
  store.replaceState(savedState);
}
createApp(App)
  .use(SocketPlugin)
  .use(vuetify)
  .use(store)
  .use(router)
  .mount("#app");

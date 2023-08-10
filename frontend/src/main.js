import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from "socket.io-client";

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
createApp(App).use(SocketPlugin).use(store).use(router).mount("#app");

import { createStore } from "vuex";
import auth from "./auth";
import localStoragePlugin from "./localStoragePlugin";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
  plugins: [localStoragePlugin],
});

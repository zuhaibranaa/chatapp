import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DashboardPage from "@/views/Auth/DashboardPage.vue";
import AboutPage from "@/views/AboutView.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import store from "@/store";
import api from "@/store/api";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const callAuthValidation = (from, next, store) => {
  api
    .get("verifyAuth", {
      headers: {
        "x-authorization": store.state.auth.authToken,
      },
    })
    .then(() => {
      next();
    })
    .catch(() => {
      next("login");
    });
};

router.beforeEach((to, from, next) => {
  to.meta.requiresAuth ? callAuthValidation(from, next, store) : next();
});

export default router;

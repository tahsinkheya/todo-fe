import { createRouter, createWebHistory } from 'vue-router';
import Headers from "../components/Headers.vue";
import SignUp from "../components/SignUp.vue";
import Tasks from "../components/Tasks.vue";
import { isLoggedIn } from "../utils/auth";

const routes = [
  {
    name: "Login",
    path: "/",
    component: Headers,
  },
  {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
  },
  {
    name: "Tasks",
    path: "/tasks",
    component: Tasks,
    beforeEnter: (to, from, next) => {
      if (isLoggedIn()) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

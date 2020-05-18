import VueRouter from "vue-router";
import Vue from "vue";

import Login from "../views/login/index.vue";
import Home from "../views/home/index.vue";
import Welcome from "../views/welcome/index.vue";
import NotFound from "../views/notfound/index.vue";
import auth from "../utils/auth.js";
import appArticle from "../views/article/index.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/",
          component: Welcome
        },
        {
          path: "/article",
          component: appArticle
        }
      ]
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  if (auth.getUser().token) return next();
  next("/login");
});

export default router;

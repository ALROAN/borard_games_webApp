import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/search",
      name: "search",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Search.vue")
    },
    {
      path: "/chat",
      name: "chat",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Chat.vue")
    },
    {
      path: "/GameInfo/:id",
      name: "GameInfo",
      props: true,
      component: () => import("./views/GameInfo.vue")
    }
  ]
});

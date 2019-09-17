import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from './store'

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
      component: () => import( "./views/Search.vue") },
    {
      path: "/chat",
      name: "chat",
      component: () =>
        import( "./views/Chat.vue"),
      beforeEnter:( (to, from, next) => {
        console.log(to,from);
        if (store.state.user.name) { 
           next() 
        } else {
          window.alert("You need to be logged to enter in to this page.") ;
        }
         
        
        })
        
    },
    {
      path: "/GameInfo/:id",
      name: "GameInfo",
      props: true,
      component: () => import("./views/GameInfo.vue")
    }
  ]
});



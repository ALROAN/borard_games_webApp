import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import firebase from "firebase";
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");



var firebaseConfig = {
  apiKey: "AIzaSyD2vK_xOTjMVqeGjO_1GNbNe9EPCKnvrs0",
  authDomain: "new-board-games-app.firebaseapp.com",
  databaseURL: "https://new-board-games-app.firebaseio.com",
  projectId: "new-board-games-app",
  storageBucket: "",
  messagingSenderId: "766066229972",
  appId: "1:766066229972:web:bba522afda3f3c7e"
};

firebase.initializeApp(firebaseConfig);
// deploy to netlify                                      ok!
// target blanck guardar components en el store           
// chat autoscroll, mensaje,
//  login no entrar                                       ok!
// collapse search                                        ok!
// media query pantalla lateral                           ok!
// 100 vh                                                  ok!

import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { name: "", email: "" }
  },
  getters: {
    // getUserStore(state) {
    //   return state.user.name;
    // }
  },
  mutations: {
    // setUser(state, payload) {
    //   state.user = payload;
    // }
  },
  actions: {
    logIn(context) {
      // https://firebase.google.com/docs/auth/web/google-signin

      // Provider
      var provider = new firebase.auth.GoogleAuthProvider();
      console.log("login store");

      // How to Log In
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(userFb => {
          context.state.user.name = userFb.additionalUserInfo.profile.name;
          context.state.user.email = userFb.additionalUserInfo.profile.email;
        });

      console.log(context.state);
    },
    logOut(context) {
      firebase
        .auth()
        .signOut()
        .then(function() {
          context.state.user.name = "";
          context.state.user.email = "";

          console.log("logOut store");
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
});

// html - $store.state.userStore
// js - this.$store.state.usertore

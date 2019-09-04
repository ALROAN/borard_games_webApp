<template>
  <v-card height="200px">
    <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute dark shift>
      <v-btn dark to="./">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn dark to="./search">
        <span>Search</span>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn dark to="./chat">
        <span>Chat</span>
        <v-icon>forum</v-icon>
      </v-btn>

      <v-btn v-if="$store.state.user.name == ''" dark @click="$store.dispatch('logIn')">
        <span>Log In</span>
        <v-icon>face</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.user.name != ''" dark @click="$store.dispatch('logOut')">
        <span>Log Out</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
    
    <script>
import firebase from "firebase";
export default {
  props: ["navbar"],
  data() {
    return {
      bottomNav: 3
    };
  },

  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
      }
    }
  }
};
</script>
    
<style>
</style>

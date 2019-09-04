<template>
  <v-app>
    <headerApp></headerApp>
    <v-spacer></v-spacer>

    <router-view class="routerStyle" />

    <navbar></navbar>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar";
import headerApp from "./components/Header";
export default {
  components: { navbar, headerApp },
  computed: {
    getUser() {
      console.log(this.$store.state.user);

      return this.$store.state.user;
    }
  }
};
</script>


<style>
</style>

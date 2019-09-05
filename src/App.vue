<template>
  <v-app class="viewApp">
    <headerApp></headerApp>

    <router-view class="routerStyle" />

    <navbar class="navbar"></navbar>
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
.navbar {
  position: fixed;
  bottom: 0;
}
.viewApp {
  background-color: coral;
}
</style>

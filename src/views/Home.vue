<template>
  <v-container class="home">
    <v-layout wrap align-center justify-center row fill-height>
      <v-flex xs12 sm4>
        <router-link to="/chat" class="link">
          <v-layout column row nowrap>
            <v-img
              class="imagesLink mb-1"
              src="https://img.icons8.com/officel/480/000000/weixing.png"
              aspect-ratio="2.5"
              contain
            ></v-img>
            <div class="subheading">CHAT</div>
          </v-layout>
        </router-link>
      </v-flex>
      <v-flex xs12 sm4>
        <router-link to="/search" class="link">
          <v-layout column row nowrap>
            <v-img
              class="imagesLink mb-1"
              src="https://img.icons8.com/color/96/000000/search.png"
              aspect-ratio="2.5"
              contain
            ></v-img>
            <div class="subheading">SEARCH</div>
          </v-layout>
        </router-link>
      </v-flex>
      <v-flex xs12 sm4>
        <v-layout column row nowrap v-if="$store.state.user.name == ''">
          <v-img
            aspect-ratio="2.5 "
            contain
            class="imagesLink mb-1"
            @click="$store.dispatch('logIn')"
            src="https://www.freeiconspng.com/uploads/d20-icon-5.png"
          ></v-img>
          <div class="subheading">LOG IN</div>
        </v-layout>
        <v-layout column row nowrap v-if="$store.state.user.name != ''">
          <v-img
            aspect-ratio="2.5 "
            contain
            class="imagesLink mb-1"
            @click="$store.dispatch('logOut')"
            src="https://img.icons8.com/officel/480/000000/sleeping-in-bed.png"
          ></v-img>
          <div class="subheading">LOG OUT</div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script >
</script>

<style scoped>
.subheading {
  text-align: center;
}
.link {
  text-decoration: none;
  color: black;
}
.home {
  margin-top: 73px;
  margin-bottom: 57px;

  overflow-y: scroll;
  height: vh100;
}
</style>
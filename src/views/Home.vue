<template>
  <v-container class="home">
    <v-layout column>
      <v-flex xs5>
        <router-link to="/chat" class="link">
          <v-img
            class="imagesLink"
            src="https://img.icons8.com/officel/480/000000/weixing.png"
            aspect-ratio="2.1"
            contain
          >
            <v-layout pa-2 column fill-height class="lightbox white--black">
              <v-spacer></v-spacer>
              <v-flex shrink>
                <div class="subheading">CHAT</div>
              </v-flex>
            </v-layout>
          </v-img>
        </router-link>
      </v-flex>

      <router-link to="/search" class="link">
        <v-img
          class="imagesLink"
          src="https://img.icons8.com/color/96/000000/search.png"
          aspect-ratio="2.1"
          contain
        >
          <v-layout pa-2 column fill-height class="lightbox white--black">
            <v-spacer></v-spacer>
            <v-flex shrink>
              <div class="subheading">SEARCH</div>
            </v-flex>
          </v-layout>
        </v-img>
      </router-link>
      <v-img
        aspect-ratio="2.1"
        contain
        class="imagesLink"
        v-if="$store.state.user.name == ''"
        @click="$store.dispatch('logIn')"
        src="https://www.freeiconspng.com/uploads/d20-icon-5.png"
      >
        <v-layout pa-2 column fill-height class="lightbox white--black">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">LOG IN</div>
          </v-flex>
        </v-layout>
      </v-img>
      <v-img
        aspect-ratio="2.1"
        contain
        class="imagesLink"
        v-if="$store.state.user.name != ''"
        @click="$store.dispatch('logOut')"
        src="https://img.icons8.com/officel/480/000000/sleeping-in-bed.png"
      >
        <v-layout pa-2 column fill-height class="lightbox white--black">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">LOG OUT</div>
          </v-flex>
        </v-layout>
      </v-img>
    </v-layout>
  </v-container>
</template>

<script >
</script>

<style scoped>
.link {
  text-decoration: none;
}
.imagesLink {
  height: 10%;
}
.home {
  margin-top: 73px;
  margin-bottom: 57px;

  overflow-y: scroll;
  height: vh100;
}
</style>
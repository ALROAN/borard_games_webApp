<template>
  <div grid-list-xs v-if="gameInfo">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img :src="gameInfo.images.small" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{gameInfo.name}}</h3>
              <div></div>
            </div>
          </v-card-title>
          <v-card-text>
            <p>{{ gameInfo.description_preview }}</p>
            <p>Min age:{{gameInfo.min_age}}</p>
            <p>Players: min {{gameInfo. min_players}} / max {{gameInfo. max_players}}</p>
            <p>Playtime: min {{gameInfo. min_playtime}}min. / max {{gameInfo. max_playtime}}min.</p>
            <p>valoration: {{ gameInfo.average_user_rating.toFixed(2)}}</p>
          </v-card-text>

          <!-- <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>-->
        </v-card>
      </v-flex>
    </v-layout>
  </div>

  <!-- <div class="game p-3 m-3" v-if="gameInfo">
    <h4>{{gameInfo.name}}</h4>
    <img :src="gameInfo.image_url" />
    <p>Min age:{{gameInfo.min_age}}</p>
    <p>Players: min {{gameInfo. min_players}} / max {{gameInfo. max_players}}</p>
    <p>Playtime: min {{gameInfo. min_playtime}}min. / max {{gameInfo. max_playtime}}min.</p>
    <p>valoration: {{ gameInfo.average_user_rating.toFixed(2)}}</p>
  </div>-->
</template>

<script>
export default {
  props: ["gameInfo"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
</style>

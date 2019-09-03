<template>
  <div class="game p-3 m-3" v-if="gameInfo">
    <h4>{{gameInfo.name}}</h4>
    <img :src="gameInfo.image_url" />
    <p>Min age:{{gameInfo.min_age}}</p>
    <p>Players: min {{gameInfo. min_players}} / max {{gameInfo. max_players}}</p>
    <p>Playtime: min {{gameInfo. min_playtime}}min. / max {{gameInfo. max_playtime}}min.</p>
    <p>valoration: {{ gameInfo.average_user_rating.toFixed(2)}}</p>
  </div>
</template>

<script>
export default {
  props: ["gameInfo"],
  data() {
    return { valoration: 0, roundedValoration: 0 };
  },
  methods: {}
};
</script>

<style scoped>
.game {
  border-radius: 25px;
  box-shadow: 10px 10px 5px grey;
}
img {
  width: 25%;
}
</style>

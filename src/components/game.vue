<template>
  <div grid-list-xs v-if="gameInfo">
    <v-layout>
      <v-card>
        <v-img @load="getRating()" :src="gameInfo.images.small" aspect-ratio="1" conyain></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{gameInfo.name}}</h3>
            <div></div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <p class="description">{{ gameInfo.description_preview }}</p>
            <p class="mr-5">
              <v-icon class="mr-2">child_care</v-icon>
              {{gameInfo.min_age}} years
            </p>

            <p>
              <v-icon class="mr-2">group</v-icon>
              min {{gameInfo. min_players}} / max {{gameInfo. max_players}}
            </p>
          </v-layout>
          <v-layout align-center row fill-height nowrap>
            <p>
              <v-icon class="mr-2">timer</v-icon>
              {{gameInfo. min_playtime}}min. / {{gameInfo. max_playtime}}min.
            </p>
          </v-layout>
          <v-layout row wrap>
            <div class="text-xs-center">
              <v-rating readonly v-model="rating"></v-rating>
            </div>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["gameInfo"],
  data() {
    return {
      rating: null
    };
  },
  methods: {
    getRating() {
      return (this.rating = Math.round(this.gameInfo.average_user_rating));
    }
  },
  computed: {},
  created() {}
};
</script>

<style scoped>
.description {
  height: 109px;
  width: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

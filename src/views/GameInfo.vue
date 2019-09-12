<template>
  <v-layout pb-5 class="gameInfo">
    <v-flex xs12>
      <v-card>
        <v-img :src="infoGame.image_url" />
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-3">{{infoGame.name}}</h3>
            <div>
              <v-layout row nowrap>
                <p class="mr-5">
                  <v-icon class="mr-2">child_care</v-icon>
                  {{infoGame.min_age}} years
                </p>

                <p>
                  <v-icon class="mr-2">group</v-icon>
                  min {{infoGame. min_players}} / max {{infoGame. max_players}}
                </p>
              </v-layout>
              <v-layout align-center row fill-height nowrap>
                <p>
                  <v-icon class="mr-2">timer</v-icon>
                  {{infoGame. min_playtime}}min. / {{infoGame. max_playtime}}min.
                </p>
              </v-layout>

              <v-layout row wrap class="mb-2">
                <div class="text-xs-center">
                  <v-rating readonly v-model="rating"></v-rating>
                </div>
              </v-layout>
              <p v-html="infoGame.description"></p>
              <v-layout row nowrap>
                <a :href="infoGame.rules_url" target="_blank">Game rules</a>
                <v-spacer></v-spacer>
                <a :href="infoGame.official_url" target="_blank">Oficial Webpage</a>
              </v-layout>
              <v-layout pt-4 row wrap>
                <h4>Categories:</h4>
                <p class="pl-3" v-for="(categoria,i) in categoriesGame" :key="i">{{categoria}}</p>
              </v-layout>
              <v-layout pt-4 row wrap>
                <h4>Mechanics:</h4>
                <p class="pl-3" v-for="(mechanic,i) in mechanicsGame" :key="i">{{mechanic}}</p>
              </v-layout>
            </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn color="orange darken-2" dark @click="$router.go(-1)">
            <v-icon dark left>arrow_back</v-icon>Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      rating: 0,
      infoGame: {},
      id: this.$route.params.id,
      categoriesList: [],
      mechanicsList: []
    };
  },
  created() {
    this.cargarInfo();
  },
  methods: {
    cargarInfo() {
      axios
        .get("https://www.boardgameatlas.com/api/search?", {
          params: {
            client_id: "xa2WyQjlZJ",
            ids: this.id
          }
        })

        .then(resp => {
          this.infoGame = resp.data.games[0];
          this.getRating();
          this.cargarCategories();
          this.cargarMechanics();
          console.log(this.infoGame);
        })
        .catch(err => console.log(err));
    },
    getRating() {
      return (this.rating = Math.round(this.infoGame.average_user_rating));
    },
    cargarCategories() {
      fetch(
        "https://www.boardgameatlas.com/api/game/categories?client_id=SB1VGnDv7M"
      )
        .then(response => response.json())
        .then(resp => {
          this.categoriesList = resp.categories;
          this.categoriesGame();
          console.log(this.categoriesList);
        })
        .catch(err => console.log(err));
    },
    cargarMechanics() {
      fetch(
        "https://www.boardgameatlas.com/api/game/mechanics?client_id=SB1VGnDv7M"
      )
        .then(response => response.json())
        .then(resp => {
          this.mechanicsList = resp.mechanics;
          console.log(this.mechanicsList);
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    categoriesGame() {
      return this.categoriesList
        .filter(categoria =>
          this.infoGame.categories.some(element => {
            return element.id == categoria.id;
          })
        )
        .map(cat => cat.name);
    },
    mechanicsGame() {
      return this.mechanicsList
        .filter(mechanic =>
          this.infoGame.mechanics.some(element => {
            return element.id == mechanic.id;
          })
        )
        .map(cat => cat.name);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.gameInfo {
  margin-top: 73px;
  margin-bottom: 57px;

  overflow-y: scroll;
  height: vh100;
}
</style>


<template>
  <v-container grid-list-xs class="searchPage">
    <v-expansion-panel>
      <v-expansion-panel-content class="grey lighten-3">
        <template v-slot:header>
          <div>FILTERS</div>
        </template>
        <v-card>
          <!-- ----------------------buscadors--------------------------------- -->

          <v-container grid-list-xs>
            <!-- -------------------------------AGES-------------------------------- -->
            <v-layout row nowrap align-center justify-center fill-height>
              <v-flex class="pr-2 col">
                <p>Ages:</p>
              </v-flex>
              <v-flex>
                <v-select
                  clearable
                  v-model="SelectedAge"
                  @change="filterAges"
                  id="ageFilter"
                  item-text="text"
                  item-value="value"
                  :items="optionsAge"
                ></v-select>
              </v-flex>
            </v-layout>
            <!-- ------------------------CATEGORIES------------------------------ -->
            <v-layout row nowrap align-center justify-center fill-height>
              <v-flex class="pr-2 col">
                <p>Categories:</p>
              </v-flex>
              <v-flex>
                <v-select
                  clearable
                  v-if="categoriesList"
                  v-model="categoria"
                  id="categoriesFilter"
                  item-text="name"
                  item-value="id"
                  :items="categoriesList"
                ></v-select>
              </v-flex>
            </v-layout>
            <!-- -----------------------------------MECHANICS------------------ -->
            <v-layout row nowrap align-center justify-center fill-height>
              <v-flex class="pr-2 col">
                <p>Mechanics:</p>
              </v-flex>
              <v-flex>
                <v-select
                  clearable
                  v-if="mechanicsList"
                  v-model="mechanics"
                  id="mechanicsFilter"
                  item-text="name"
                  item-value="id"
                  :items="mechanicsList"
                ></v-select>
              </v-flex>
            </v-layout>
            <!-- ---------------------------------PLAYERS----------------------------- -->
            <v-layout row nowrap align-center justify-center fill-height>
              <v-flex>
                <p>Players:</p>
              </v-flex>
              <v-flex>
                <v-select
                  clearable
                  v-model="minPlayer"
                  id="minimumPlayers"
                  item-text="text"
                  item-value="value"
                  :items="optionsMinPlayer"
                ></v-select>
              </v-flex>

              <v-flex>
                <v-select
                  clearable
                  v-model="maxPlayer"
                  id="maximumPlayers"
                  item-text="text"
                  item-value="value"
                  :items="optionMaxPlayer"
                ></v-select>
              </v-flex>
            </v-layout>
            <!-- ---------------------------------PLAYTIME----------------------------- -->
            <v-layout row nowrap align-center justify-center fill-height>
              <v-flex>
                <v-icon>timer</v-icon>
              </v-flex>
              <v-flex>
                <p>-</p>
                <v-select
                  clearable
                  v-model="minPlaytime"
                  id="minimumPlaytime"
                  item-text="text"
                  item-value="value"
                  :items="optionPlayTime"
                ></v-select>
              </v-flex>
              <v-flex>
                <p>+</p>

                <v-select
                  clearable
                  v-model="maxPlaytime"
                  id="maximumPlaytime"
                  item-text="text"
                  item-value="value"
                  :items="optionPlayTime"
                ></v-select>
              </v-flex>
            </v-layout>

            <!-- -------------------------------------BUTTON SEARCH------------------------------- -->
            <v-btn class v-on:click="cargarGames()">Search</v-btn>
          </v-container>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-layout>
      <v-text-field
        clearable
        @keyup="cargarGames()"
        prepend-icon="search"
        single-line
        v-model="filterName"
      ></v-text-field>
    </v-layout>
    <v-divider></v-divider>
    <!-- --------------------------RESULTS GAMES SEARCH----------------------------------------- -->

    <v-btn v-model="order" @click="changeOrder('popularity')">Popularity</v-btn>

    <!-- ----------------------------------ORDER ITEMS---------------------------------------------- -->
    <div class>
      <v-container grid-list-xs>
        <v-layout row wrap v-for="(game,index) in allGames" :key="index" class="infoGame">
          <router-link :to="'/GameInfo/'+ game.id" class="router">
            <gameInfo :gameInfo="game"></gameInfo>
          </router-link>
        </v-layout>
        <v-layout row wrap>
          <p>No games</p>
        </v-layout>
      </v-container>
      <v-container grid-list-xs v-if="allGames.lenght = 0">
        <p>No games finded</p>
      </v-container>

      <!-- paginacio -->

      <v-layout
        align-center
        justify-center
        fill-height
        aria-label="Page navigation example container"
      >
        <v-btn class="page-item skipGames" @click="previousGames(10)">
          <v-icon dark left>keyboard_arrow_left</v-icon>less
        </v-btn>
        <v-btn class="page-item skipGames" @click="nextGames(10)">
          more
          <v-icon content-class="border" dark right>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-layout>
    </div>
  </v-container>
  <!-- ---------------------------------------->
</template>

<script>
import gameInfo from "../components/game.vue";
import axios from "axios";
export default {
  components: { gameInfo },
  created() {
    this.cargarGames();
    this.cargarCategories();
    this.cargarMechanics();
  },

  data() {
    return {
      filterName: "",
      SelectedAge: "",
      optionsAge: [
        { value: "3", text: "0-3" },
        { value: "8", text: "4-8" },
        { value: "13", text: "9-13" },
        { value: "17", text: "14-17" },
        { value: "99", text: "+18" }
      ],
      optionsMinPlayer: [
        { value: "0", text: "Min." },
        { value: "1", text: "2" },
        { value: "2", text: "3" },
        { value: "3", text: "4" },
        { value: "4", text: "5" },
        { value: "5", text: "6" },
        { value: "6", text: "7" },
        { value: "7", text: "8" },
        { value: "8", text: "9" },
        { value: "9", text: "10" },
        { value: "10", text: "11" },
        { value: "11", text: "12" }
      ],
      optionMaxPlayer: [
        { value: "2", text: "1 " },
        { value: "3", text: "2" },
        { value: "4", text: "3" },
        { value: "5", text: "4 " },
        { value: "6", text: "5" },
        { value: "7", text: "6 " },
        { value: "8", text: "7 " },
        { value: "9", text: "8 " },
        { value: "10", text: "9" },
        { value: "11", text: "10 " },
        { value: "21", text: "20 " },
        { value: "31", text: "30" },
        { value: "41", text: "40 " },
        { value: "51", text: "50 " },
        { value: "999", text: "Max." }
      ],
      optionPlayTime: [
        { value: "0", text: "Min." },
        { value: "10", text: "10m" },
        { value: "20", text: "20m" },
        { value: "30", text: "30m" },
        { value: "40", text: "40m" },
        { value: "50", text: "50m" },
        { value: "60", text: "1h" },
        { value: "120", text: "2h" },
        { value: "240", text: "4h" },
        { value: "999", text: "Max." }
      ],

      allGames: [],
      categoriesList: [],
      categoria: [],
      mechanicsList: [],
      mechanics: [],
      playersList: [],
      MinAge: null,
      MaxAge: null,
      maxPlaytime: null,
      minPlaytime: null,
      maxPlayer: null,
      minPlayer: null,
      skip: 0,
      order: null
    };
  },
  methods: {
    changeOrder(order) {
      this.order = order;
      this.cargarGames();
    },
    nextGames(x) {
      this.skip = this.skip + x;
      this.cargarGames();
    },
    previousGames(x) {
      this.skip = this.skip - x;
      this.cargarGames();
    },

    cargarGames() {
      axios
        .get("https://www.boardgameatlas.com/api/search", {
          params: {
            client_id: "xa2WyQjlZJ",
            pretty: true,
            limit: 10,
            skip: this.skip,
            mechanics: this.mechanics,
            categories: this.categoria,
            gt_min_players: this.minPlayer,
            lt_max_players: this.maxPlayer,
            gt_min_playtime: this.minPlaytime,
            lt_max_playtime: this.maxPlaytime,
            gt_min_age: this.MinAge,
            lt_min_age: this.MaxAge,
            name: this.filterName,
            order_by: this.order
          }
        })
        .then(resp => {
          this.allGames = resp.data.games;
        })
        .catch(err => console.log(err));
    },
    filterAges() {
      if (this.SelectedAge == 3) {
        this.MinAge = 0;
        this.MaxAge = 4;
      } else if (this.SelectedAge == 8) {
        this.MinAge = 3;
        this.MaxAge = 9;
      } else if (this.SelectedAge == 13) {
        this.MinAge = 8;
        this.MaxAge = 14;
      } else if (this.SelectedAge == 17) {
        this.MinAge = 13;
        this.MaxAge = 18;
      } else if (this.SelectedAge == 99) {
        this.MinAge = 17;
        this.MaxAge = 99;
      } else if (this.SelectedAge == null) {
        this.MinAge = 0;
        this.MaxAge = 909;
      }
    },

    cargarCategories() {
      fetch(
        "https://www.boardgameatlas.com/api/game/categories?client_id=SB1VGnDv7M"
      )
        .then(response => response.json())
        .then(resp => {
          this.categoriesList = resp.categories;
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
        })
        .catch(err => console.log(err));
    }
  },
  computed: {}
};
</script>

<style scoped>
a {
  text-decoration: none;
}
i {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.skipGames {
  border-radius: 1rem;
}
.searchPage {
  margin-top: 73px;
  margin-bottom: 57px;

  overflow-y: scroll;
  height: vh100;
}
</style>

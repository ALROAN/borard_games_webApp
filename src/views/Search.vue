<template>
  <div pb-5>
    <!-- ----------------------buscadors--------------------------------- -->
    <div>
      <div>
        <div slot="header">SEARCH</div>

        <div id="collapseSearchDiv">
          <!-- -------------------------------AGES-------------------------------- -->
          <div class="row">
            <div class="pr-2 col">
              <p>Ages:</p>
            </div>
            <div class="col">
              <v-select
                v-model="SelectedAge"
                @change="filterAges"
                id="ageFilter"
                item-text="text"
                item-value="value"
                :items="optionsAge"
              ></v-select>
            </div>
          </div>
          <!-- ------------------------CATEGORIES------------------------------ -->
          <div class="row">
            <div class="pr-2 col">
              <p>Categories:</p>
            </div>
            <div class="col">
              <v-select
                v-if="categoriesList"
                v-model="categoria"
                id="categoriesFilter"
                item-text="name"
                item-value="id"
                :items="categoriesList"
              ></v-select>
            </div>
          </div>
          <!-- -----------------------------------MECHANICS------------------ -->
          <div class="row">
            <div class="pr-2 col">
              <p>Mechanics:</p>
            </div>
            <div class="col">
              <v-select
                v-if="mechanicsList"
                v-model="mechanics"
                id="mechanicsFilter"
                item-text="name"
                item-value="id"
                :items="mechanicsList"
              ></v-select>
            </div>
          </div>
          <!-- ---------------------------------PLAYERS----------------------------- -->
          <div class="row">
            <div class="col">
              <p>Players:</p>
            </div>
            <div class="col">
              <v-select
                v-model="minPlayer"
                id="minimumPlayers"
                item-text="text"
                item-value="value"
                :items="optionsMinPlayer"
              ></v-select>
            </div>

            <div class="col">
              <v-select
                v-model="maxPlayer"
                id="maximumPlayers"
                item-text="text"
                item-value="value"
                :items="optionMaxPlayer"
              ></v-select>
            </div>
          </div>
          <!-- ---------------------------------PLAYTIME----------------------------- -->
          <div class="row">
            <div class="col">
              <p>Playtime:</p>
            </div>
            <div class="col">
              <div>
                <div class="col">
                  <p>Min.</p>
                  <v-select
                    v-model="minPlaytime"
                    id="minimumPlaytime"
                    item-text="text"
                    item-value="value"
                    :items="optionPlayTime"
                  ></v-select>
                </div>
              </div>
            </div>
            <div class="col">
              <div>
                <p>Max.</p>

                <v-select
                  v-model="maxPlaytime"
                  id="maximumPlaytime"
                  item-text="text"
                  item-value="value"
                  :items="optionPlayTime"
                ></v-select>
              </div>
            </div>
          </div>

          <!-- -------------------------------------BUTTON SEARCH------------------------------- -->
          <v-btn class v-on:click="cargarGames()">Search</v-btn>
        </div>
        <div class="row justify-content-center">
          <p class="col-2">
            <i class="arrow up"></i>
          </p>
          <v-btn
            class="col-6"
            data-toggle="collapse"
            data-target="#collapseSearchDiv"
            aria-expanded="true"
            aria-controls="collapseSearchDiv"
          >Search</v-btn>
          <p class="col-2">hola</p>
        </div>
      </div>
    </div>
    <!-- --------------------------RESULTS GAMES SEARCH----------------------------------------- -->
    <div class>
      <div class="container">
        <div v-for="(game,index) in allGames" :key="index" class="infoGame">
          <router-link :to="'/GameInfo/'+ game.id" class="router">
            <gameInfo :gameInfo="game"></gameInfo>
          </router-link>
        </div>
      </div>

      <!-- paginacio -->
      <div class="d-flex justify-content-center skipDiv">
        <nav aria-label="Page navigation example container">
          <ul class="pagination">
            <li class="page-item skipGames">
              <a class="page-link" href="#" @click="previousGames(10)">Previous</a>
            </li>
            <li class="page-item skipGames">
              <a class="page-link" href="#" @click="nextGames(10)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
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
      SelectedAge: "",
      optionsAge: [
        { value: "null", text: "-" },
        { value: "3", text: "0-3" },
        { value: "8", text: "4-8" },
        { value: "13", text: "9-13" },
        { value: "17", text: "14-17" },
        { value: "99", text: "+18" }
      ],
      optionsMinPlayer: [
        { value: "0", text: "1" },
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
        { value: "999", text: "Max." },
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
        { value: "51", text: "50 " }
      ],
      optionPlayTime: [
        { value: "0", text: "Min." },
        { value: "10", text: "10min" },
        { value: "20", text: "20min" },
        { value: "30", text: "30min" },
        { value: "40", text: "40min" },
        { value: "50", text: "50m" },
        { value: "60", text: "1h" },
        { value: "120", text: "2h" },
        { value: "240", text: "4h" },
        { value: "480", text: "8h" }
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
      skip: 0
    };
  },
  methods: {
    nextGames(x) {
      if (this.skip >= allGames.lenght) {
        this.skip = this.skip + x;
        this.cargarGames();
      }
    },
    previousGames(x) {
      if (this.skip !== 0) {
        this.skip = this.skip - x;
        this.cargarGames();
      }
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
            lt_min_age: this.MaxAge
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
      console.log("ages filter");
    },

    cargarCategories() {
      fetch(
        "https://www.boardgameatlas.com/api/game/categories?client_id=SB1VGnDv7M"
      )
        .then(response => response.json())
        .then(resp => {
          this.categoriesList = resp.categories;
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
        })
        .catch(err => console.log(err));
    }
  },
  computed: {}
};
</script>

<style scoped>
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
</style>

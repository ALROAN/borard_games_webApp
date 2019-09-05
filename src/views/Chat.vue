<template>
  <div>
    <div class="chat h-100">
      <v-layout
        id="posts"
        ref="posts"
        class="mt-2"
        v-for="(mensajeCompleto,i) in mensajes"
        :key="i"
      >
        <v-flex xs8>
          <v-card>
            <v-card-text>
              <p class="text-md-center grey--text">
                {{mensajeCompleto.nombre}}
                <v-spacer></v-spacer>
                {{objetoEnviable.date}}
              </p>
              <p class="text-md-center mensajeMostrado">{{mensajeCompleto.mensaje}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout class="mb-5 mt-2">
        <div class="inputs">
          <input
            id="textInput"
            class="input"
            v-model="objetoEnviable.mensaje"
            type="text"
            placeholder="Write you message..."
            v-on:keyup.13="writeNewPost()"
            full-width
          />

          <v-btn id="create-post" @click="writeNewPost()" class="is-primary">Send</v-btn>
        </div>
      </v-layout>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      mensajes: [],
      objetoEnviable: {
        date: null,
        mensaje: "",
        nombre: ""
      }
    };
  },
  methods: {
    autoScroll() {
      that.scrollToEnd();
    },

    writeNewPost() {
      // agafa el nom de database i el pasa a objetoenviable per a que el pugui pintar.
      this.objetoEnviable.nombre = firebase.auth().currentUser.displayName;
      console.log(this.mensajes);
      // push fa que quan es pugi la info a database sescrigui en un nou apartat amb una id unica
      firebase
        .database()
        .ref("board-games-app")
        .push(this.objetoEnviable);
      this.objetoEnviable.mensaje = "";
      this.objetoEnviable.date = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
    },
    getPosts() {
      let that = this;
      // .on = es un listener. quan hi ha un value executa aquesta funció
      // retorna un array amb el valor del database de firebase
      firebase
        .database()
        .ref("board-games-app")
        .on("value", data => {
          that.mensajes = Object.values(data.val());
          this.objetoEnviable.date = new Date()
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, "/");
        });
    }
  },
  created() {
    this.getPosts();
  },
  computed: {}
};
</script>

<style scoped>
.chat {
  height: auto;
  overflow-y: scroll;
}
.mensajeMostrado {
  word-break: break-all;
}
</style>

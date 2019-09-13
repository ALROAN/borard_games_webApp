<template>
  <div class="chat h-100">
    <v-btn color="success" @click="pageScroll()">text</v-btn>

    <v-layout id="posts" ref="posts" class="mt-2" v-for="(mensajeCompleto,i) in mensajes" :key="i">
      <v-flex xs8 class="pl-3">
        <v-layout row wrap>
          <!-- :class: son clases con condicionales -->
          <!-- aquí se cargan los mensajes del chat,  -->
          <v-card
            class="messages"
            :class=" {'myMessages': ($store.state.user.name == mensajeCompleto.nombre),
           'messageFromOthers': ($store.state.user.name != mensajeCompleto.nombre) } "
          >
            <v-card-text>
              <p class="text-md-center black--text">{{mensajeCompleto.nombre}}</p>
              <p class="text-md-center mensajeMostrado">{{mensajeCompleto.mensaje}}</p>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row nowrap class="mt-2">
      <v-textarea
        id="textInput"
        class="input messageBox"
        box
        height="15px"
        v-model="objetoEnviable.mensaje"
        type="text"
        placeholder="Write you message..."
        v-on:keyup.13="writeNewPost()"
      ></v-textarea>

      <v-btn id="create-post" @click="writeNewPost()" class="is-primary button">Send</v-btn>
    </v-layout>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      mensajes: [],
      objetoEnviable: {
        mensaje: "",
        nombre: ""
      }
    };
  },
  methods: {
    goTo() {
      window.scrollTo(0, document.body.scrollHeight);
      console.log("scroll");
    },
    writeNewPost() {
      // agafa el nom de database i el pasa a objetoenviable per a que el pugui pintar.
      this.objetoEnviable.nombre = firebase.auth().currentUser.displayName;
      // push fa que quan es pugi la info a database sescrigui en un nou apartat amb una id unica
      firebase
        .database()
        .ref("board-games-app")
        .push(this.objetoEnviable);
      this.objetoEnviable.mensaje = "";
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
        });
    }
  },
  created() {
    this.getPosts();
    this.goTo();
  },
  computed: {}
};
</script>

<style scoped>
.chat {
  margin-top: 73px;
  margin-bottom: 57px;

  overflow-y: scroll;
  height: vh100;
}
.mensajeMostrado {
  word-break: break-all;
}
.myMessages {
  background-color: aquamarine;
}
.messageFromOthers {
  background-color: plum;
  right: 0;
}
.messages {
  border-radius: 25px;
  width: auto;
  height: auto;
}
.messageBox {
  margin-top: 0;
}
</style>

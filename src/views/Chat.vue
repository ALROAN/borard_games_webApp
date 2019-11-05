<template>
  <div class="chat h-100">
    <div class="messages" ref="messages">
      <v-layout
        id="posts"
        ref="posts"
        class="mt-2 message"
        v-for="(mensajeCompleto,i) in mensajes"
        :key="i"
      >
        <v-flex xs8 class="pl-3">
          <v-layout row wrap class="cardLayout">
            <!-- :class: son clases con condicionales -->
            <!-- aquí se cargan los mensajes del chat,  -->
            <v-card
              class="mensajes"
              :class=" {'myMessages': ($store.state.user.name == mensajeCompleto.nombre),
           'messageFromOthers': ($store.state.user.name != mensajeCompleto.nombre)}"
            >
              <v-card-text>
                <p class="text-md-center black--text">{{mensajeCompleto.nombre}}</p>
                <p class="text-md-center mensajeMostrado">{{mensajeCompleto.mensaje}}</p>
              </v-card-text>
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>

    <v-layout row nowrap class="mt-2 boxToSend">
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
    chatScroll() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
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
          console.log("mes");

          that.mensajes = Object.values(data.val());
        });
    }
  },
  created() {
    this.getPosts();
  },
  mounted() {},
  updated() {
    this.chatScroll();
  },
  watch: {
    mensajes: function(val) {
      console.log("meses");
      this.chatScroll();
    }
  },
  computed: {}
};
</script>

<style scoped>
.chat {
  background: white;
  margin-top: 73px;
  margin-bottom: 57px;
  width: 100vw;
  height: 143vw;
}
.mensajeMostrado {
  word-break: break-all;
}
.myMessages {
  background-color: aquamarine;
}
.messageFromOthers {
  background-color: plum;
}
.mensajes {
  border-radius: 25px;
  width: auto;
  height: auto;
}
.messageBox {
  margin-top: 0;
  height: 58px;
}
.messages {
  overflow: scroll;
  height: 67vh;
  margin-bottom: 26px;
}
.cardLayout {
  padding-bottom: 2px;
}
.boxToSend {
  background-color: white;
  padding-bottom: 8px;
}

#create-post {
  margin-top: 11px;
}
</style>

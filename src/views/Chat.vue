<template>
  <div>
    <v-container class="chat h-100">
      <div id="posts" ref="posts" class="box mt-2" clear-icon>Loading posts...</div>

      <v-layout class="mb-3 mt-2">
        <div class="inputs">
          <input
            id="textInput"
            class="input"
            v-model="objetoEnviable.mensaje"
            type="text"
            placeholder="Write you message..."
            v-on:keyup.13="writeNewPost()"
          />

          <v-btn id="create-post" @click="writeNewPost()" class="is-primary">Send</v-btn>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      mensajesFirebase: [],
      objetoEnviable: {
        mensaje: "",
        nombre: ""
      }
    };
  },
  methods: {
    // change() {
    //   this.$store.commit("setUser", this.user);
    // },

    // autoScroll() {
    //   getElementById("create-post").scrollIntoView(false);
    // },

    writeNewPost() {
      this.objetoEnviable.nombre = firebase.auth().currentUser.displayName;

      firebase
        .database()
        .ref("board-games-app")
        .push(this.objetoEnviable);
    },

    getPosts() {
      let that = this;
      // .on = es un listener. quan hi ha un value executa aquesta funció
      firebase
        .database()
        .ref("board-games-app")
        .on("value", function(data) {
          let mensajes = Object.values(data.val());
          for (let i = 0; i < mensajes.length; i++) {
            let nombre = document.createElement("v-layout");
            let texto = document.createElement("v-layout");
            let mensajeCompleto = document.createElement("div");
            nombre.classList.add("nameUser");
            texto.classList.add("textSend");
            mensajeCompleto.classList.add("raw");
            // texto.classList.add("");
            mensajeCompleto.classList.add("mensajeCompleto");
            texto.innerHTML = mensajes[i].mensaje;
            nombre.innerHTML = mensajes[i].nombre;
            mensajeCompleto.append(nombre, texto);
            document.getElementById("posts").append(mensajeCompleto);
          }
        });
    }
  },
  created() {
    this.getPosts();
  }
};
</script>

<style scoped>
.mensajeCompleto {
  /* margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px; */
  border-radius: 25px;
  background-color: #82ccdd;
  color: red;
  /* padding: 10px;
  position: relative; */
}
.textSend {
}
.inputs {
}
</style>

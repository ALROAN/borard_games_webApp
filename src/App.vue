<template>
  <!-- en los archivos vuejs todo el html tiene que ir dentro de un template y solo puede
  contener un div que englobe todo el contenido-->
  <!-- v-app es imprescindible para poner dentro todo lo que queramos hacer servir con  vuetify -->
  <v-app class="viewApp">
    <!-- v-layout es un div que contiene la clase flex predefinida -->
    <v-layout row wrap>
      <!-- importamos el componente headerApp  -->

      <headerApp class="header"></headerApp>
    </v-layout>
    <!-- router-view es donde se van a mostrar todos los contenidos de las otras vistas -->
    <router-view class="routerStyle" />
    <v-layout row wrap>
      <!-- importamos el componente navbar -->
      <navbar class="navbar"></navbar>
    </v-layout>
  </v-app>
</template>

<script>
// script es la sección donde escribimos la parte de js
// es imprescindible importar todas los componentes y herramientas que queremos utilizar al archivo
import navbar from "./components/Navbar";
import headerApp from "./components/Header";
// export default sirve para exportar todo el contenido y se pueda usar en otros archivos u partes del mismo
// solo puede haber un export default, pero podría haber más export sin el default.
export default {
  // los components son partes de código que se pueden reutilizar las veces que queramos en todo nuestro proyecto.
  // es necesario exportar los components importados para poder usarlos en nuestro archivo.
  components: { navbar, headerApp },
  // las computed se usan para modificar variables sin tener que llamarlas.
  // Se llamaran automáticamente  cada vez que cambie la info de base.
  computed: {
    getUser() {
      // las computed necesitan un return
      return this.$store.state.user;
    }
  }
};
</script>


<style scoped>
/* style engloba toda la parte css del archivo */
.navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
.viewApp {
  overflow-y: scroll;
  height: vh100;
}
.header {
  z-index: 10;
  position: fixed;
  width: 100%;
  top: 0;
}
</style>

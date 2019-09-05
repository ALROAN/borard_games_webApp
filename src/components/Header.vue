<template>
  <div>
    <v-layout class="justify-center align-center fill-height headerApp">
      <p class="display-1 white--text text-md-center mt-3">Board Games</p>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["headerApp"]
};
</script>

<style>
.headerApp {
  background-color: #970747;
}
</style>
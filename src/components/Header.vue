<template>
  <div>
    <v-layout headerApp align-center justify-space-around row fill-height>
      <v-flex class="display-1 white--text text-md-center my-3 pl-4 xs8">Board Games</v-flex>
      <div align-center justify-center row fill-height xs4 pl-3>
        <v-icon large dark v-if="$store.state.user.picture == '' ">perm_identity</v-icon>
        <v-avatar v-else>
          <v-layout>
            <v-img :src="$store.state.user.picture"></v-img>
          </v-layout>
        </v-avatar>
      </div>
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
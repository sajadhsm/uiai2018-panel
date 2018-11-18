<template>
  <v-snackbar
    v-model="snackbarVisibility"
    bottom
    left
    :color="snackbarColor"
  >
    {{ snackbarText }}
    <v-btn
      class="snackbarBtn"
      right
      icon
      @click="$store.commit('SET_SNACKBAR_VISIBILITY', false)">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    snackbarVisibility: {
      get() {
        return this.$store.state.snackbarVisibility;
      },
      set(value) {
        this.$store.commit("SET_SNACKBAR_VISIBILITY", value);
      }
    },
    ...mapState(["snackbarText", "snackbarColor"])
  }
}
</script>

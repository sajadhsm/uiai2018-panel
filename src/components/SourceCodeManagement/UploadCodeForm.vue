<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>ارسال کد</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            disabled
            color="primary">ارسال</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      bottom
      left
      :color="snackbarColor"
    >
      {{ snackbarText }}
      <v-btn class="snackbarBtn" right icon @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data: () => ({
    snackbar: false,
    snackbarText: "",
    snackbarColor: ""
  }),
  computed: mapState(["accessToken"]),
};
</script>

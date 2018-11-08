<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>ساخت تیم</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form color="primary" ref="regTeamForm" v-model="valid">
            <v-text-field
              v-model="teamName"
              :rules="teamNameRules"
              label="نام تیم"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            @click="submit"
            color="primary">ساخت تیم</v-btn>
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
    valid: true,
    teamName: "",
    teamNameRules: [
      v => !!v || "نام تیم الزامی است",
      v => (v && v.length <= 10) || "نام تیم باید کمتر از ۱۶ حرف باشد"
    ],
    snackbar: false,
    snackbarText: "",
    snackbarColor: ""
  }),
  computed: mapState(["accessToken"]),
  methods: {
    submit() {
      if (this.$refs.regTeamForm.validate()) {
        axios
          .post(
            "/team/create/",
            {
              name: this.teamName
            },
            {
              headers: {
                Authorization: `Bearer ${this.accessToken}`
              }
            }
          )
          .then(res => {
            this.$store.commit("SET_HAS_TEAM", true);
            this.snackbar = true;
            this.snackbarColor = "success";
            this.snackbarText = res.data.message;
          })
          .catch(error => {
            if (error.response) {
              this.snackbar = true;
              this.snackbarColor = "error";
              this.snackbarText = error.response.data.message;
              this.$refs.regTeamForm.reset();
            }
          });
      }
    }
  }
};
</script>

<style scoped>
.snackbarBtn {
  /* Fix large left margin in RTL */
  margin-left: 0 !important;
}
</style>


<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>درخواست بازی دوستانه</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form color="primary" ref="requestGameForm" v-model="valid">
            <span>انتخاب تیم حریف:</span>
            <v-select
              v-model="teamID"
              :items="teams"
              :rules="rules"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-dialog v-model="requestGameDialog" max-width="500px">
            <v-btn
              :disabled="!valid"
              slot="activator"
              color="primary">درخواست بازی</v-btn>
            <v-card>
              <v-card-text>آیا از ارسال درخواست بازی به این تیم مطمئن هستید؟</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click.native="requestGameDialog = false">خیر</v-btn>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click.native="sendGameRequest">بله</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data: () => ({
    requestGameDialog: false,
    valid: true,
    teamID: 2,
    teams: [1, 2],
    teamName: "",
    rules: [v => !!v || "انتخاب تیم الزامی است"]
  }),
  computed: mapState(["accessToken"]),
  methods: {
    sendGameRequest() {
      if (this.$refs.requestGameForm.validate()) {
        axios
          .post(
            "games/send/",
            {
              team_id: this.teamID
            },
            {
              headers: {
                Authorization: `Bearer ${this.accessToken}`
              }
            }
          )
          .then(res => {
            this.$store.dispatch("showSnackbar", {
              text: res.data.message,
              color: "success"
            });

            console.log(res);

            this.requestGameDialog = false;
          })
          .catch(error => {
            if (error.response) {
              this.$store.dispatch("showSnackbar", {
                text: error.response.data.message,
                color: "error"
              });
            }
          });
      }
    }
  }
};
</script>

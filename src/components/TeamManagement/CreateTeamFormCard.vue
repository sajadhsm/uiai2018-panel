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
      v =>
        /[A-Za-z0-9 _-]/.test(v) ||
        "نام تیم فقط باید شامل حروف انگلیسی، اعداد، فاصله و یا کاراکترهای - و ـ باشد",
      v => (v && v.length <= 16) || "نام تیم باید کمتر از ۱۶ حرف باشد"
    ]
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
            // Fill TeamInfoTable data
            // hasTeam to true
            this.$store.dispatch("getTeamInfo");

            this.$store.dispatch("showSnackbar", {
              text: res.data.message,
              color: "success"
            });
          })
          .catch(error => {
            if (error.response) {
              this.$store.dispatch("showSnackbar", {
                text: error.response.data.message,
                color: "error"
              });
              this.$refs.regTeamForm.reset();
            }
          });
      }
    }
  }
};
</script>

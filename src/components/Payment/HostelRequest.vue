<template>
  <v-layout>
    <v-flex>
      <v-card color="info" dark>
        <v-card-title primary-title>
          <div>
            <h2>درخواست اقامت در خوابگاه</h2>
            <p
              class="mb-0"
            >در صورت نیاز، هر عضو تیم به صورت جداگانه و از طریق داشبورد خود باید درخواست بدهد.</p>
            <p class="mb-0">هزینه خوابگاه به صورت حضوری اخذ خواهد شد.</p>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" outline>درخواست خوابگاه</v-btn>
            <v-card>
              <v-card-title class="pb-0">
                <b>درخواست اقامت در خوابگاه</b>
              </v-card-title>

              <v-card-text>پس از ارسال درخواست، امکان لغو آن وجود ندارد!</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">لغو</v-btn>
                <v-btn color="blue darken-1" flat @click.native="handleRequestHostel">ارسال</v-btn>
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
    dialog: false
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: mapState(["accessToken"]),
  methods: {
    close() {
      this.dialog = false;
    },
    handleRequestHostel() {
      axios
        .post(
          "api/user/request_dorm/",
          {},
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
          this.$store.dispatch("getUserInfo");
          this.close();
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
};
</script>
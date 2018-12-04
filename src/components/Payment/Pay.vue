<template>
  <v-layout>
    <v-flex>
      <v-card color="success" dark>
        <v-card-title primary-title>
          <div>
            <h2>تبریک! شما به مرحله حضوری راه یافتید.</h2>
            <p class="mb-0">لطفا هزینه شرکت در مرحله حضوری را از طریق لینک زیر پرداخت کنید.</p>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark
            outline
            :loading="redirectBtnLoading"
            @click="handlePaymentRedirect"
          >پرداخت از طریق درگاه آنلاین</v-btn>
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
    redirectBtnLoading: false
  }),
  computed: mapState(["accessToken"]),
  methods: {
    handlePaymentRedirect() {
      this.redirectBtnLoading = true;

      axios
        .post(
          "api/payment/begin/",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        .then(res => {
          window.location.href = res.data.redirect_url;
          this.redirectBtnLoading = false;
        })
        .catch(error => {
          if (error.response) {
            this.$store.dispatch("showSnackbar", {
              text: error.response.data.message,
              color: "error"
            });

            this.redirectBtnLoading = false;
          }
        });
    }
  }
};
</script>
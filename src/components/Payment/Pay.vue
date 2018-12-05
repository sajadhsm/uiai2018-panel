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
          <v-container fluid text-xs-left class="pa-0">
            <v-layout align-end wrap justify-end class="pa-0">
              <v-flex class="pb-2 pr-2">
                <v-text-field
                  v-model="discountCode"
                  label="کد تخفیف"
                  color="white"
                  style="max-width: 325px;"
                  hide-details
                />
              </v-flex>

              <v-flex>
                <v-btn
                  dark
                  outline
                  :loading="redirectBtnLoading"
                  @click="handlePaymentRedirect"
                >پرداخت از طریق درگاه آنلاین</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
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
    discountCode: "",
    redirectBtnLoading: false
  }),
  computed: mapState(["accessToken"]),
  methods: {
    handlePaymentRedirect() {
      this.redirectBtnLoading = true;

      axios
        .post(
          "api/payment/begin/",
          {
            discount_code: this.discountCode
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        .then(res => {
          window.location.href = res.data.redirect_url;
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
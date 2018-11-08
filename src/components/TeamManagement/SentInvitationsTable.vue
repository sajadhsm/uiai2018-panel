<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>دعوت‌نامه‌های ارسالی</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" outline right>دعوت</v-btn>
          <v-card>
            <v-card-title>فرم ارسال دعوت‌نامه</v-card-title>

            <v-card-text>
              <v-form ref="inviteForm" v-model="valid">
                <v-text-field
                  v-model="emailToInvite"
                  :rules="emailRules"
                  label="ایمیل"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                flat
                @click.native="close">لغو</v-btn>
              <v-btn
                color="blue darken-1"
                flat
                :disabled="!valid"
                @click.native="send">ارسال</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="sentInvitations"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.receiver }}</td>
          <td class="text-xs-center">
            <v-chip color="orange" small>
              {{ props.item.status }}
            </v-chip>
          </td>
        </template>
      </v-data-table>
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
    dialog: false,
    valid: true,
    emailToInvite: "",
    emailRules: [
      v => !!v || "ایمیل الزامی است",
      v => /.+@.+/.test(v) || "ایمیل باید معتبر باشد"
    ],
    headers: [
      { text: "دریافت‌کننده", value: "receiver", align: "center" },
      { text: "وضعیت", value: "status", align: "center" }
    ],
    snackbar: false,
    snackbarText: "",
    snackbarColor: ""
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: mapState({
    accessToken: state => state.accessToken,
    sentInvitations: state => state.userInfo.sent_invitations
  }),
  methods: {
    close() {
      this.dialog = false;
      this.$refs.inviteForm.reset();
    },

    send() {
      axios
        .post(
          "team/invite/",
          { email: this.emailToInvite },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        .then(res => {
          this.snackbar = true;
          this.snackbarColor = "success";
          this.snackbarText = res.data.message;
          // Update sentInvites table
          this.$store.dispatch('getUserInfo');
          this.close();
        })
        .catch(error => {
          if (error.response) {
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = error.response.data.message;
            this.$refs.inviteForm.reset();
          }
        });
    }
  }
};
</script>


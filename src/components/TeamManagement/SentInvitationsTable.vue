<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>دعوت‌نامه‌های ارسالی</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-if="hasTeam" v-model="dialog" max-width="500px">
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
            <v-chip :color="statusColor(props.item.status)" text-color="white" small>
              {{ props.item.status }}
            </v-chip>
          </td>
        </template>
      </v-data-table>
    </v-flex>
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
    ]
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: mapState({
    hasTeam: state => state.hasTeam,
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
          "api/team/invite/",
          { email: this.emailToInvite },
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
          // Update sentInvites table
          this.$store.dispatch("getUserInfo");
          this.close();
        })
        .catch(error => {
          if (error.response) {
            this.$store.dispatch("showSnackbar", {
              text: error.response.data.message,
              color: "error"
            });
            this.$refs.inviteForm.reset();
          }
        });
    },
    statusColor(statusText) {
      if (statusText === "پذیرفته شده") {
        return "green";
      } else if (statusText === "رد شده") {
        return "red";
      } else {
        return "orange";
      }
    }
  }
};
</script>

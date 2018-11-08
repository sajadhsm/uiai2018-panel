<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>دعوت‌نامه‌های دریافتی</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="receivedInvitations"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.sender }}</td>
          <td class="text-xs-center">{{ props.item.team_name }}</td>
          <td class="text-xs-center">
            <v-chip color="orange" small>
              {{ props.item.status }}
            </v-chip>
          </td>
          <td class="justify-center layout px-0">
            <v-tooltip right>
              <v-btn
                slot="activator"
                flat
                icon
                color="green"
                @click="acceptInvitation(props.item)">
                <v-icon>check</v-icon>
              </v-btn>
              <span>پذیرش</span>
            </v-tooltip>

            <v-tooltip left>
              <v-btn
                slot="activator"
                flat
                icon
                color="red"
                @click="rejectInvitation(props.item)">
                <v-icon>close</v-icon>
              </v-btn>
              <span>رد</span>
            </v-tooltip>
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
    headers: [
      { text: "فرستنده", value: "receiver", align: "center" },
      { text: "نام تیم", value: "team_name", align: "center" },
      { text: "وضعیت", value: "status", align: "center" },
      { text: "عملیات", value: "receiver", sortable: false, align: "center" }
    ],
    snackbar: false,
    snackbarText: "",
    snackbarColor: ""
  }),
  computed: mapState({
    accessToken: state => state.accessToken,
    receivedInvitations: state => state.userInfo.received_invitations
  }),
  methods: {
    acceptInvitation(prop) {
      axios
        .post(
          "/team/accept/",
          { id: prop.id },
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
          }
        });
    },
    rejectInvitation(prop) {
      axios
        .post(
          "/team/reject/",
          { id: prop.id },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        .then(res => {
          this.snackbar = true;
          this.snackbarColor = "info";
          this.snackbarText = res.data.message;
        })
        .catch(error => {
          if (error.response) {
            this.snackbar = true;
            this.snackbarColor = "error";
            this.snackbarText = error.response.data.message;
          }
        });
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
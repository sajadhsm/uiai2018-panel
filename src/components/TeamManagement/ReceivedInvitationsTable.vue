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
            <v-chip :color="statusColor(props.item.status)" text-color="white" small>
              {{ props.item.status }}
            </v-chip>
          </td>
          <td class="justify-center layout px-0">
            <v-tooltip
              right
              :disabled="disableNotPendings(props.item.status)">
              <v-btn
                slot="activator"
                flat
                icon
                color="green"
                :disabled="disableNotPendings(props.item.status)"
                @click="acceptInvitation(props.item)">
                <v-icon>check</v-icon>
              </v-btn>
              <span>پذیرش</span>
            </v-tooltip>

            <v-tooltip
              left
              :disabled="disableNotPendings(props.item.status)">
              <v-btn
                slot="activator"
                flat
                icon
                color="red"
                :disabled="disableNotPendings(props.item.status)"
                @click="rejectInvitation(props.item)">
                <v-icon>close</v-icon>
              </v-btn>
              <span>رد</span>
            </v-tooltip>
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
    headers: [
      { text: "فرستنده", value: "receiver", align: "center" },
      { text: "نام تیم", value: "team_name", align: "center" },
      { text: "وضعیت", value: "status", align: "center" },
      { text: "عملیات", value: "receiver", sortable: false, align: "center" }
    ]
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
          // JIT update other components
          this.$store.dispatch("getUserInfo");
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
          // JIT update other components
          this.$store.dispatch("getUserInfo");

          this.$store.dispatch("showSnackbar", {
            text: res.data.message,
            color: "info"
          });
        })
        .catch(error => {
          if (error.response) {
            this.$store.dispatch("showSnackbar", {
              text: error.response.data.message,
              color: "error"
            });
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
    },
    disableNotPendings(statusText) {
      return /رد شده|پذیرفته شده/.test(statusText) ? true : false;
    }
  }
};
</script>

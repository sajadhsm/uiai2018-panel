<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>درخواست‌های دریافتی</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="receivedGameRequests"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.sender_name }}</td>
          <td class="text-xs-center">
            {{ props.item.date | faDate }}
          </td>
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
                @click="acceptRequest(props.item)">
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
                @click="rejectRequest(props.item)">
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
      { text: "تیم فرستنده", value: "sender_name", align: "center" },
      { text: "تاریخ دریافت", value: "date", align: "center" },
      { text: "وضعیت", value: "status", align: "center" },
      { text: "عملیات", value: "receiver", sortable: false, align: "center" }
    ]
  }),
  computed: mapState({
    accessToken: state => state.accessToken,
    receivedGameRequests: state => state.teamInfo.received_game_requests
  }),
  methods: {
    acceptRequest(prop) {
      axios
        .post(
          "games/accept/",
          { request_id: prop.id },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        .then(res => {
          // JIT update other components
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
    rejectRequest(prop) {
      axios
        .post(
          "games/reject/",
          { request_id: prop.id },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        .then(res => {
          // JIT update other components
          this.$store.dispatch("getTeamInfo");

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

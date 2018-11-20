<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>درخواست‌های ارسالی</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="sentGameRequests"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.receiver_id }}</td>
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
    headers: [
      { text: "دریافت‌کننده", value: "receiver_id", align: "center" },
      { text: "وضعیت", value: "status", align: "center" }
    ]
  }),
  computed: mapState({
    sentGameRequests: state => state.teamInfo.sent_game_requests
  }),
  methods: {
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

<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>لیست بازی‌ها</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="games"
        :pagination.sync="pagination"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.team1_name }}</td>
          <td class="text-xs-center">
            {{ props.item.team1_goals === null ? '-' : props.item.team1_goals }}
          </td>
          <td class="text-xs-center">
            {{ props.item.team2_goals === null ? '-' : props.item.team2_goals }}
          </td>
          <td class="text-xs-center">{{ props.item.team2_name }}</td>
          <td class="text-xs-center">
            <v-chip :color="statusColor(props.item.status)" text-color="white" small>
              {{ props.item.status }}
            </v-chip>
          </td>
          <td class="text-xs-center">
            {{ props.item.run_date | faDate }}
          </td>
          <td class="text-xs-center">
            <v-btn
              @click="handleDownload(props.item)"
              flat
              small
              color="primary">دانلود</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    headers: [
      { text: "تیم اول", value: "team1_name", align: "center" },
      { text: "گل‌های تیم اول", value: "team1_goals", align: "center" },
      { text: "گل‌های تیم دوم", value: "team2_goals", align: "center" },
      { text: "تیم دوم", value: "team2_name", align: "center" },
      { text: "وضعیت", value: "status", align: "center" },
      { text: "تاریخ اجرا", value: "run_date", align: "center" },
      { text: "فایل لاگ", value: "log_file", align: "center" }
    ],
    pagination: { sortBy: "run_date", descending: true, rowsPerPage: -1 }
  }),
  computed: mapState({
    games: state => state.teamInfo.games
  }),
  methods: {
    handleDownload(gameInfo) {
      // Recive log file as base64
      const text = window.atob(gameInfo.log_file);

      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", `uiai_log_${gameInfo.id}.txt`);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    statusColor(statusText) {
      if (statusText === "پایان یافته") {
        return "green";
      } else if (statusText === "خطا در اجرای بازی") {
        return "red";
      } else if (statusText === "در حال اجرا") {
        return "blue";
      } else {
        return "orange";
      }
    }
  }
};
</script>

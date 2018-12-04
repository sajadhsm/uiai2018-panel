<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>رده‌بندی مرحله غیر‌حضوری</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat icon right :loading="standingUpdateLoading" @click="handleStandingUpdate">
          <v-icon>cached</v-icon>
        </v-btn>
      </v-toolbar>

      <v-data-table
        :loading="tableLoading"
        :headers="headers"
        :items="qualificationStanding"
        :pagination.sync="pagination"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.index + 1 }}</td>
          <td class="text-xs-center"><b>{{ props.item.name }}</b></td>
          <td class="text-xs-center">{{ props.item.games_played }}</td>

          <td class="text-xs-center">{{ props.item.win }}</td>
          <td class="text-xs-center">{{ props.item.draw }}</td>
          <td class="text-xs-center">{{ props.item.lose }}</td>

          <td class="text-xs-center">{{ props.item.goals_scored }}</td>
          <td class="text-xs-center">{{ props.item.goals_conceded }}</td>
          <td class="text-xs-center">{{ props.item.goal_difference }}</td>

          <td class="text-xs-center">{{ props.item.points }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    tableLoading: true,
    standingUpdateLoading: false,
    headers: [
      { text: "رتبه", value: "index", align: "center", sortable: false },
      { text: "نام تیم", value: "name", align: "center" },
      { text: "تعداد بازی", value: "games_played", align: "center" },
      { text: "تعداد برد", value: "win", align: "center" },
      { text: "تعداد مساوی", value: "draw", align: "center" },
      { text: "تعداد باخت", value: "lose", align: "center" },
      { text: "گل زده", value: "goals_scored", align: "center" },
      { text: "گل خورده", value: "goals_conceded", align: "center" },
      { text: "تفاضل گل", value: "goal_difference", align: "center" },
      { text: "امتیاز", value: "points", align: "center" }
    ],
    pagination: { sortBy: "points", descending: true, rowsPerPage: -1 }
  }),
  computed: mapState(["qualificationStanding"]),
  created() {
    this.$store
      .dispatch("getQualificationStanding")
      .then(() => (this.tableLoading = false));
  },
  methods: {
    handleStandingUpdate() {
      this.standingUpdateLoading = true;
      this.tableLoading = true;
      this.$store.dispatch("getQualificationStanding").then(() => {
        setTimeout(() => {
          this.standingUpdateLoading = false;
          this.tableLoading = false;
        }, 500);
      });
    }
  }
};
</script>

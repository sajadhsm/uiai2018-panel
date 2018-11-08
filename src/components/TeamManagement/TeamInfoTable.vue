<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>اطلاعات تیم</v-toolbar-title>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="teamInfo"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <!-- <td class="text-xs-center">
            <v-avatar color="#ddd">
              <img :src="props.item.logo" :alt="props.item.name">
            </v-avatar>
          </td> -->
          <td class="text-xs-center py-4">{{ props.item.name }}</td>
          <td class="text-xs-center py-4">{{ props.item.members[0] }}</td>
          <td class="text-xs-center py-4">{{ props.item.members[1] || '-'}}</td>
          <td class="text-xs-center py-4">{{ props.item.members[2] || '-' }}</td>
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
      // { text: "لوگو", value: "logo", align: "center", sortable: false },
      { text: "نام تیم", value: "name", align: "center", sortable: false },
      { text: "عضو اول", value: "members", align: "center", sortable: false },
      { text: "عضو دوم", value: "members", align: "center", sortable: false },
      { text: "عضو سوم", value: "members", align: "center", sortable: false }
    ]
  }),
  computed: mapState({
    teamInfo: state => [state.teamInfo]
  })
};
</script>
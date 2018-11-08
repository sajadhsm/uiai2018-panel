<template>
  <v-layout>
    <v-flex class="elevation-1">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>دعوت‌نامه‌های ارسالی</v-toolbar-title>
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
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data: () => ({
    headers: [
      { text: "دریافت‌کننده", value: "receiver", align: "center" },
      { text: "وضعیت", value: "status", align: "center" }
    ]
  }),
  computed: mapState({
    sentInvitations: state => state.userInfo.sent_invitations
  }),
  methods: {}
};
</script>


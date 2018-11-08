<template>
  <v-container>
    <CreateTeamFormCard class="mb-4" />
    <SentInvitationsTable class="mb-4" />
    <ReceivedInvitationsTable />
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import CreateTeamFormCard from "./CreateTeamFormCard";
import SentInvitationsTable from "./SentInvitationsTable";
import ReceivedInvitationsTable from "./ReceivedInvitationsTable";

export default {
  components: {
    CreateTeamFormCard,
    SentInvitationsTable,
    ReceivedInvitationsTable
  },
};
</script>
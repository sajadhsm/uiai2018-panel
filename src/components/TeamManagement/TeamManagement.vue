<template>
  <v-container>
    <CreateTeamFormCard class="mb-4" />
    <SentInvitationsTable />
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import CreateTeamFormCard from "./CreateTeamFormCard";
import SentInvitationsTable from "./SentInvitationsTable";

export default {
  components: {
    CreateTeamFormCard,
    SentInvitationsTable
  },
};
</script>
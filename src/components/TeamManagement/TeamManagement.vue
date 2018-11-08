<template>
  <v-container>
    <TeamInfoTable v-if="hasTeam" class="mb-4" />
    <CreateTeamFormCard v-else class="mb-4" />
    <SentInvitationsTable class="mb-4" />
    <ReceivedInvitationsTable />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import TeamInfoTable from "./TeamInfoTable";
import CreateTeamFormCard from "./CreateTeamFormCard";
import SentInvitationsTable from "./SentInvitationsTable";
import ReceivedInvitationsTable from "./ReceivedInvitationsTable";

export default {
  components: {
    TeamInfoTable,
    CreateTeamFormCard,
    SentInvitationsTable,
    ReceivedInvitationsTable
  },
  computed: mapState(["hasTeam"]),
  mounted() {
    this.$store.dispatch("getUserInfo");
    this.$store.dispatch("getTeamInfo");
  }
};
</script>
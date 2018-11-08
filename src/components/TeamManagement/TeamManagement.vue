<template>
  <v-container>
    <TeamInfoTable class="mb-4" />
    <CreateTeamFormCard class="mb-4" />
    <SentInvitationsTable class="mb-4" />
    <ReceivedInvitationsTable />
  </v-container>
</template>

<script>
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
  mounted() {
    this.$store.dispatch("getUserInfo");
    this.$store.dispatch("getTeamInfo");
  }
};
</script>
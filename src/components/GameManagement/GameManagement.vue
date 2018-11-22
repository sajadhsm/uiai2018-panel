<template>
  <v-container>
    <GameRequestForm class="mb-4" />
    <SentGameRequests class="mb-4" />
    <ReceivedGameRequests class="mb-4" />
    <GamesTable />
  </v-container>
</template>

<script>
import GameRequestForm from "./GameRequestForm";
import SentGameRequests from "./SentGameRequests";
import ReceivedGameRequests from "./ReceivedGameRequests";
import GamesTable from "./GamesTable";

export default {
  components: {
    GameRequestForm,
    SentGameRequests,
    ReceivedGameRequests,
    GamesTable
  },
};
</script>
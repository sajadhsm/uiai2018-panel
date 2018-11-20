<template>
  <v-container>
    <GameRequestForm class="mb-4" />
    <SentGameRequests class="mb-4" />
    <ReceivedGameRequests />
  </v-container>
</template>

<script>
import GameRequestForm from "./GameRequestForm";
import SentGameRequests from "./SentGameRequests";
import ReceivedGameRequests from "./ReceivedGameRequests";

export default {
  components: {
    GameRequestForm,
    SentGameRequests,
    ReceivedGameRequests
  },
};
</script>
<template>
  <v-container>
    <CreateTeamFormCard />
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import CreateTeamFormCard from "./CreateTeamFormCard";

export default {
  components: {
    CreateTeamFormCard
  },
};
</script>
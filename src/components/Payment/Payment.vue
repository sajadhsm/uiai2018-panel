<template>
  <v-container>
    <Pay class="mb-4" />
    <HostelRequest />
  </v-container>
</template>

<script>
import Pay from "./Pay";
import HostelRequest from "./HostelRequest";

export default {
  components: {
    Pay,
    HostelRequest,
  }
};
</script>
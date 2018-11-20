<template>
  <v-container>
    <UploadCodeForm class="mb-4" />
    <UploadedCodesTable />
  </v-container>
</template>

<script>
import UploadCodeForm from "./UploadCodeForm";
import UploadedCodesTable from "./UploadedCodesTable";

export default {
  components: {
    UploadCodeForm,
    UploadedCodesTable
  }
};
</script>